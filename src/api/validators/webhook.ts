import { IWebhook } from "../services/WebhookService"

const validateWebhook = (webhook: IWebhook) => {

    if (!webhook.content) {
        throw Error("É necessário adicionar um conteúdo para o webhook")
    }

    if (!webhook.url) {
        throw Error("É necessário adicionar uma url para o webhook")
    }
}

export { validateWebhook }