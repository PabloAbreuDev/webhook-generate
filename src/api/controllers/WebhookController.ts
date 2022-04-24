import { Request, Response, NextFunction } from "express";
import WebhookService from "../services/WebhookService";


class WebhookController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await WebhookService.createWebhookService(req.body)
            return res.status(201).json(response)
        } catch (err) {
            return next(err);
        }
    }
}


export default new WebhookController();