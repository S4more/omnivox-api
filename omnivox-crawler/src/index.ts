import Login from "./modules/Login";
import * as dotenv from 'dotenv';
import {MioManager} from "./managers/MioManager";
export {LeaManager} from "./managers/LeaManager";
import {loginUser} from "./utils/loginPromt";
import { LeaManager } from "./managers/LeaManager";

loginUser()
dotenv.config();

export async function login(username: string, password: string): Promise<boolean> {
  return await Login(username, password);
}

async function testLea() {
  // await login(process.env.user_name!, process.env.password!);
  const lm = await LeaManager.build();
  const classes = await lm.getClassDocumentSummary();
  classes.forEach(cl => {
    console.log(cl.name);
  })
}

export {MioManager};
