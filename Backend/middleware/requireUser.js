// MW to check that is user is signed in 
export default function requireUser(req, res, next){
    if (!req.user){return res.status(401).send("Unauthorized");

    } 
    next();
}