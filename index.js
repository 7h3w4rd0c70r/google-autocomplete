
var app = require('express')()
var createProxyServer = require('http-proxy').createProxyServer

var httpProxy = createProxyServer({
    changeOrigin: true,
    target: 'http://suggestqueries.google.com',
})

app.get('/complete/search', function (req, res, next) {
    httpProxy.web(req, res)
})

app.listen(8092, function () {
    if (process.env['NODE_ENV'] !== 'PROD') {
        console.log('Listening on *:' + 8092)
    }
})
