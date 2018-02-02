const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults({
  static: './build'
})

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.delete('/api/todos/all', (req, res) => {
  router.db.setState({todos: []})
    .then(() => res.sendStatus(200))
})

server.post('/api/todos/bulkload', ({body: { todos }}, res) => {
  router.db.setState({ todos })
    .then(() => res.sendStatus(200))
})


server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}))

// Use default router
server.use(router)
const listener = server.listen(3030, () => {
  console.log(`JSON Server is running at port ${listener.address().port}`)
})
