module.exports = (server, routes, prefix = '/test') =>{
    routes.get('/', (req, res) =>{
        res.send('OK');
    })

    server.use(prefix, routes);
}