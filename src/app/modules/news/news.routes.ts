import express, { NextFunction, Request, Response } from "express";
import { newsController } from "./news.controller";
import { fileUploader } from "../../../shared/fileUploader";
const router = express.Router();



router.post("/store", 
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return newsController.newsStore(req, res, next);
  }
);
router.get("/all", newsController.getAllNews);
router.get("/:id",newsController.singleNews)
router.delete("/:id",newsController.newsDelete)
router.patch("/:id",newsController.updateNews)


export const newsRoutes = router;
