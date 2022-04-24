import { initWebHookJob } from "./api/queues/WebHookQueue";
import { app } from "./app";

app.listen(process.env.PORT, async () => {
    console.log(`Server running on port ${process.env.PORT}`)
    initWebHookJob()
})