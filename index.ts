import * as dotenv from "dotenv";
import cors from "cors";
import express from "express"
import router from "./router/router"
import mongoose from "mongoose";
import path from "path";
const app: express.Express = express();
dotenv.config();


mongoose.connect('mongodb://127.0.0.1:27017/Shopping-project')
.then((): void => console.log("Connected to DB!"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")))
app.use("/", router);

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.listen("3000", (): void => console.log("Server run on port 3000"));
