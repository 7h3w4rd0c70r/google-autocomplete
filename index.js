
const app = require('express')()
const createProxyServer = require('http-proxy').createProxyServer

let port = 8092
if (!isNaN(process.env['PORT'])) {
    port = Number(process.env['PORT'])
}

const httpProxy = createProxyServer({
    changeOrigin: true,
    target: 'http://suggestqueries.google.com',
})

httpProxy.on('proxyRes', (proxyRes, req, res) => {
    res.setHeader('Access-Control-Allow-Headers', 'OPTIONS, GET')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

app.options('*', function (req, res, next) {
    res.status(200)
    res.json({ status: 'ok' })
})

app.get('/complete/search', function (req, res, next) {
    httpProxy.web(req, res)
})

app.listen(port, function () {
    if (process.env['NODE_ENV'] !== 'PROD') {
        console.log(`Listening on *:${port}`)
    }
})
