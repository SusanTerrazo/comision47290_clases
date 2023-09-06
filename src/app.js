import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import viewRouter from './routers/view.router.js'

const app = express() 
const PORT = 8080
const httpserver = app.listen(PORT, () => console.log (`Server up on http://localhost:${PORT}`) ) 
const io = new Server(httpserver)


//========================================setear Handlebars================================
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')
app.use(express.static('./src/public'))

app.use('/', viewRouter)

const messages = []

io.on('connection', socket => {
    socket.on('message', data => {
        messages.push(data)
        io.emit('logs', messages)
    })
})