import GetUserById from "../db/users/GetUserById.js";
import { verifyToken } from "../utils/jwt.js";

// attach user to request if a valid token is provided

export default async function GetUserFromToken(req, res, next){
    const authorization = req.get("authorization");
    if (!authorization || !authorization.startsWith("Bearer ")){
        return next();
    }
    const token = authorization.split(" ")[1];
    try{
        const {id} = verifyToken(token);
        const user = await GetUserById(id);
        req.user = user;
        next();
    }catch(e){
        console.error(e);
        res.status(401).send("invalid token");
    }
}