// tests/api.test.js
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

import app from "../Backend/app.js";
import db from "../Backend/db/client.js";

// --- minimal DB connect/disconnect ---
beforeAll(async () => {
  await db.connect();
});

afterAll(async () => {
  await db.end();
});

// --- helper: token could be plain text OR json { token } ---
function extractToken(res) {
  if (res.body && typeof res.body.token === "string") return res.body.token;
  if (typeof res.text === "string" && res.text.trim()) return res.text.trim();
  return null;
}

// --- helper: make unique users so tests don't collide ---
function uniq(prefix) {
  const n = Date.now();
  return `${prefix}_${n}`;
}

describe("Core API smoke tests", () => {
  it("POST /users registers a user (200/201)", async () => {
    const username = uniq("u");
    const email = `${username}@example.com`;

    const res = await request(app).post("/users").send({
      username,
      email,
      password: "pw123",
    });

    expect([200, 201]).toContain(res.status);
  });

  it("POST /users/login returns a token (200)", async () => {
    const username = uniq("login");
    const email = `${username}@example.com`;
    const password = "pw123";

    // register first
    const reg = await request(app).post("/users").send({ username, email, password });
    expect([200, 201]).toContain(reg.status);

    // login
    const res = await request(app).post("/users/login").send({ username, password });
    expect(res.status).toBe(200);

    const token = extractToken(res);
    expect(token).toBeTruthy();
  });

  it("GET /users/me rejects without token (401)", async () => {
    const res = await request(app).get("/users/me");
    expect(res.status).toBe(401);
  });

  it("GET /users/me works with token (200)", async () => {
    const username = uniq("me");
    const email = `${username}@example.com`;
    const password = "pw123";

    // register
    const reg = await request(app).post("/users").send({ username, email, password });
    expect([200, 201]).toContain(reg.status);

    // login
    const login = await request(app).post("/users/login").send({ username, password });
    expect(login.status).toBe(200);

    const token = extractToken(login);
    expect(token).toBeTruthy();

    // call /me
    const me = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(me.status).toBe(200);
    expect(me.body).toHaveProperty("id");
    expect(me.body).toHaveProperty("username", username);
    // email optional — only assert if you return it:
    // expect(me.body).toHaveProperty("email", email);
  });

  it("DELETE /users/me deletes the logged-in user (204)", async () => {
    const username = uniq("del");
    const email = `${username}@example.com`;
    const password = "pw123";

    await request(app).post("/users").send({ username, email, password });

    const login = await request(app).post("/users/login").send({ username, password });
    const token = extractToken(login);
    expect(token).toBeTruthy();

    const del = await request(app)
      .delete("/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect([200, 204]).toContain(del.status);
  });
});
