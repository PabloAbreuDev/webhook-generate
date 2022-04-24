## Gerador de webhooks

Esta aplicação é uma prova de conceito da criação de um sistema para criação de webhooks.

## Como funciona?

Quando o usuário faz uma requisição de criação de webhook, é criado um job que será executado em background. O usuário poderá enviar alguns dados para configuração do webhook, como conteúdo, número de tentativas, intervalo entre cada tentativa e link para envio.

## Configuração

Crie um arquivo .env na raiz do projeto com os dados de conexão com o banco de dados. Utilize o arquivo .env.test como exemplo.

## Instalação

Para instalar a aplicação, é necessário que o usuário possua uma instância do Redis rodando em background, e usar os comandos abaixo

`yarn install`

`yarn prod`
