import { webhookProducer } from "../queues/WebHookQueue";
import { validateWebhook } from "../validators/webhook";

export interface IWebhook {
    content: any;
    retry: number;
    delayRetry: number; //milisegundos
    url: string;
}

class WebhookService {
    createWebhookService = async (webhook: IWebhook) => {
        validateWebhook(webhook);
        webhookProducer(webhook);
        return webhook;
    }

}

export default new WebhookService()