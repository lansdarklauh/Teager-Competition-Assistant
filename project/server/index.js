/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const Koa = require('koa')
// const cors = require('koa2-cors')
// const json = require('koa-json')
// const bodyparser = require('koa-bodyparser')
const router = require('koa-router')()
const websocketr = require('koa-websocket')

function createServer() {
    const app = websocketr(new Koa())
    // app.ws.use(cors({
    //     origin: function () {
    //         return '*'
    //     },
    //     maxAge: 86400,
    //     credentials: true,
    //     allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    //     exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    //     allowedMethods: ['GET', 'POST']
    // }))
    // app.ws.use(bodyparser({
    //     enableTypes: ['json', 'form', 'text']
    // }))
    // app.ws.use(json())

    router.all('/getRank', (ctx) => {
        ctx.websocket.send('连接成功')

        ctx.websocket.on('message', (message) => {
            console.log('message', message)
            const body = JSON.parse(message)
            if (app.responseCallback) app.responseCallback(body)
        })
    })

    app.ws.use(router.routes()).use(router.allowedMethods())

    return app
}

module.exports = createServer;


