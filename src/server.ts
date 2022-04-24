import { app } from "./app";
import dotenv from 'dotenv'
// Configuracao do dotenv
dotenv.config({
    path: process.env.NODE_ENV === 'dev' ? '.env.test' : '.env',
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})