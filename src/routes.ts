import { Router } from "express";

const router = Router()

// Hello world route
router.get("/", (req, res) => {
    return res.status(200).send("Hello world!")
})


export { router }