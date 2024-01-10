import express from 'express'
import cors from 'cors'
import routes from './routes'
// import dotenv from 'dotenv'
// dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)


const PORT = process.env.PORT || 9001

app.listen(PORT,()=>{
  console.log(`Rodando na porta: http://localhost:${PORT}`);
  
})


