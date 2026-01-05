import express from 'express';
const usersRouter = express.Router();

import { createUser, getUserByUsernameAndPassword, getUserById, deleteUser, getUserByEmail  } from '../db/queries/users.js';
import requireBody from '../middleware/requireBody.js';
import requireUser from '../middleware/requireUser.js';
import { createToken } from '../utils/jwt.js';
export default usersRouter;
// create user
usersRouter.post('/', requireBody(['username', 'password', 'email']),
  async (req, res, next) => {
try {const { username, password, email } = req.body;
const user = await createUser({ username, password, email});
const token = createToken({ id: user.id});
res.status(201).send({token});
  } catch (error) {
    next (error);
  }
});

// login user route
usersRouter.post('/login', requireBody(['username', 'password']),
  async (req, res, next) => {
    try{
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword(username, password);
    if (!user)
      return res.status(401).send('Invalid username or password');
    const token = createToken({ id: user.id});
    res.send({token});} catch (error) {
      next (error);
    }  
  });
// get current user route 
usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) return res.status(404).send("User not found");

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
});


// delete user route
usersRouter.delete('/me',requireUser, async(req,res,next) =>{
  try{
    await deleteUser(req.user.id);
    res.sendStatus (204);

  }catch (error){
    next(error);
  }
});