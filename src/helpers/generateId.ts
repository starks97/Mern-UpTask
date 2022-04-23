import bcrypt from "bcrypt";
import { IUser } from "../models/User";


function generateId(): string {
  const random: IDGenerator = Math.random().toString(32).substring(2);
  const date: IDGenerator = Date.now().toString(32);
  return random + date;
}

export default generateId;
type IDGenerator = string | number;

export async function isValidPassword(
  FormPassword: string,
  getPassword: IUser
): Promise<boolean> {
  return await bcrypt.compare(FormPassword, getPassword.password);
}

export async function setPassword(password: string): Promise<string>{
  const salt: string = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
