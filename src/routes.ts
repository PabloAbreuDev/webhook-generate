import { Router } from "express";
import WebhookController from "./api/controllers/WebhookController";
const router = Router()

// Hello world route
router.get("/", (req, res) => {
    return res.status(200).send("Hello world!")
})

// Rotas para o webhook
router.post("/webhook", WebhookController.create)


export { router }