import jwt from "jsonwebtoken";

function generateJWT(id: string): string {
    return jwt.sign({id}, process.env.JWT_SECRETKEY, {expiresIn: "30d"})
};

export default generateJWT