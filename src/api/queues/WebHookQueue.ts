import axios from 'axios';
import Bull from 'bull'
import { IWebhook } from '../services/WebhookService';

const webHookQueue = new Bull(process.env.WEBHOOK_QUEUE_NAME, process.env.REDIS_HOST);

export const webhookProducer = async (webhook: IWebhook) => {
    // Cria um job que irá executar depois de 5 segundos, e retentar no minimo 5 vezes em caso de erro
    await webHookQueue.add({ content: webhook.content, url: webhook.url }, {
        delay: 5000,
        repeat: {
            every: webhook.delayRetry || 50000,
            limit: webhook.retry || 5
        }
    });
}

const webHookProcess = async (job, done) => {
    axios.post(job.data.url, job.data.content).then((response) => {
        // Se retornar 200 remove da fila
        if (response.status === 200) {
            done(null, "success");
        }
        done(new Error("error code"));
    }).catch((err) => {
        done(err);
    });
}


export const initWebHookJob = () => {
    console.log("Iniciando job do webhook")
    webHookQueue.process(webHookProcess);
};
