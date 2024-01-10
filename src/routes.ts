import { Router } from "express";
import { UserController } from "./controllers/UserController";

const usercontrollers = new UserController()

const routes = Router()

routes.get("/",(req,res)=>{
  res.send("api desenvolvida para criação e autenticalção de usuários.")
})

routes.post("/create",usercontrollers.createUser)

routes.get("/users",usercontrollers.listerUsers)

export default routes