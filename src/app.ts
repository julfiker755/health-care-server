import express, { Application, NextFunction, Request, Response } from "express";
import globalErrorHander from "./app/errors/globalErrorHander";
import httpStatus from "http-status";
const app: Application = express();
import cookieParser from "cookie-parser";
import router from "./app/routes";
import cors from "cors";
import { fileUploader } from "./shared/fileUploader";

app.use(
  cors({
    origin: ["http://localhost:3000","https://doctors-next14.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(fileUploader.uploadsDir));

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Server is Running 😍",
  });
});

app.use("/api/v1", router);
app.use(globalErrorHander);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND",
    error: {
      path: req.originalUrl,
      message: "Your Requested path is not found",
    },
  });
});

export default app;
