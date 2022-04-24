import { webhookProducer } from "../queues/WebHookQueue";
import { validateWebhook } from "../validators/webhook";

export interface IWebhook {
    content: any;
    attempts: number;
    delayRetry: number; //milisegundos
    url: string;
}

class WebhookService {
    createWebhookService = async (webhook: IWebhook) => {
        validateWebhook(webhook);
        await webhookProducer(webhook);
        return webhook;
    }
}

export default new WebhookService()