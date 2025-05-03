import jwt from "jsonwebtoken";

const generateToken = (payload: string) => {
  const token = jwt.sign({ userId: payload }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return token;
};

export default generateToken;
