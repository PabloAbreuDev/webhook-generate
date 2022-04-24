import axios from 'axios';
import Bull from 'bull'
import dotenv from 'dotenv'
import { IWebhook } from '../services/WebhookService';


// Configuracao do dotenv
dotenv.config({
    path: process.env.NODE_ENV === 'dev' ? '.env.test' : '.env',
});

const webHookQueue = new Bull(process.env.WEBHOOK_QUEUE_NAME, process.env.REDIS_HOST);

export const webhookProducer = async (webhook: IWebhook) => {
    // Cria um job que irá executar depois de 5 segundos, e retentar no minimo 5 vezes em caso de erro
    await webHookQueue.add({ content: webhook.content, url: webhook.url }, {
        removeOnComplete: true, // remove job if complete
        attempts: webhook.attempts || 5, // attempt if job is error retry 3 times
        backoff: {
            type: "fixed",
            delay: 30000,
        },
    });
}

const webHookProcess = async (job, done) => {
    try {
        console.log(job.data)
        await axios.post(job.data.url, job.data.content).then((response) => {
            console.log("executando..")
            // Se retornar 200 remove da fila
            if (response.status === 200) {
                done(null, "success");
            }
            done(new Error("error code"));
        }).catch((err) => {
            done(err);
        });
    } catch (err) {
        done(err);
    }

}


export const initWebHookJob = () => {
    console.log("Iniciando job do webhook")
    webHookQueue.process(webHookProcess);
    webHookQueue.on("failed", () => { console.log("Falhou") });
    webHookQueue.on("completed", () => { console.log("Completo") });
    webHookQueue.on("stalled", () => { console.log("Stalled") });
};
