import express from 'express'
import cors from 'cors'
import * as Console from "console";
import * as events from "events";


const PORT = 5001;

const emitter = new events.EventEmitter();

const app = express()
app.use(cors())
app.use(express.json())



app.get('/getMessages', (req, res) => {
    emitter.once('newMessage', (message) => {
        res.json(message)
    })
})

app.post('/newMessage', (req,res) => {
    const message = req.body;
    emitter.emit('newMessage', message)
    res.status(200)
})


app.listen(PORT, () => Console.log(`SERVER LISTENING PORT ${PORT}`))
