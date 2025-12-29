// check if rew body has required fields
export default function requireBody(fields){
return (req,res,next)=>{
    if (!req.body) return res.status(400).send("req body is required");

    const missing = fields.filter((fields) => !(fields in req.body));
    if (missing.length > 0 ) 
        return res.status(400),send(`missing fields: ${missing.join(", ")}`);
    next();  
};
}