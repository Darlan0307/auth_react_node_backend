import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController";

const usercontrollers = new UserController()
const authcontroller = new AuthController()

const routes = Router()

routes.get("/",(req,res)=>{
  res.send("api desenvolvida para criação e autenticalção de usuários.")
})

routes.post("/create",usercontrollers.createUser)

routes.get("/users",usercontrollers.listerUsers)

routes.post("/auth",authcontroller.authUser)

export default routes