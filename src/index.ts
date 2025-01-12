import express from "express";
import cors from "cors";
import * as dotenv from 'dotenv';
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config()

app.use(authRouter)
app.use(userRouter) //rotas

app.listen(process.env.PORT, () => {
    console.log("🚀 Server ready at: http://localhost:3000");
});