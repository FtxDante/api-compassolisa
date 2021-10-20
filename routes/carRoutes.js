module.exports = (server, routes, prefix = '/api/v1') =>{
    routes.get('/car', (req, res) =>{
        res.send('OK');
    })

    server.use(prefix, routes);
}