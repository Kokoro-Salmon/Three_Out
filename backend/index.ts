import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";
// import { restrictToLoggedInUserOnly } from "./middleware/auth";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

// routes are here likh raha hu ki dikh jaye
import userRouter from "./routes/UserRoutes";
import statRouter from "./routes/StatsRouter";

import connectiontodb from "./config/connection";
connectiontodb();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

// Router ehter Daalna Warna kudh confuse hoga tu
app.use("/User", userRouter);
app.use("/Stats", statRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server Chalu Ho Gaya");
});

server.listen(3000, () => {
  console.log("Server is listening on PORT: 3000");
  console.log("http://localhost:3000/");
});
