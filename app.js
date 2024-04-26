import express from "express";
import mainRoute from "./routes/main.route.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api", mainRoute);

app.listen(process.env.SERVER_PORT, () => {
  console.log("started");
});
