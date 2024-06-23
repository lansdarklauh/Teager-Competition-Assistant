/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const Koa = require('koa')
const cors = require('koa2-cors')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const router = require('koa-router')()

function createServer() {
    const app = new Koa()
    app.use(cors({
        origin: function () {
            return '*'
        },
        maxAge: 86400,
        credentials: true,
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        allowedMethods: ['GET', 'POST']
    }))
    app.use(bodyparser({
        enableTypes: ['json', 'form', 'text']
    }))
    app.use(json())

    router.post('/getRank', async (ctx) => {
        const body = ctx.request.body
        ctx.body = { code: 200, msg: '已收到请求' }

        if (app.responseCallback) app.responseCallback(body)
    })

    app.use(router.routes()).use(router.allowedMethods())

    return app
}

module.exports = createServer;


