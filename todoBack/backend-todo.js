const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');

app.use(express.json())

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
})

const todoSchema = new mongoose.Schema({
    name: String,
    status: Boolean,
});

const todosItem = mongoose.model('todosItem', todoSchema);


mongoose.connect('mongodb+srv://Jirru:eQNToZhbNvEtI1cB@cluster0.hibixil.mongodb.net/ToDo?retryWrites=true&w=majority&appName=Cluster0')


app.get('/todo', async (req, res) => {
    res.send(await todosItem.find({}))
});

app.post('/todo', async (req, res) => {
    const newTodoItem = await todosItem.create({ name: req.body.name, status: req.body.status });
    res.send(newTodoItem)
});

app.put('/todo', async (req, res) => {
    await todosItem.findByIdAndUpdate({_id: req.body._id},{name: req.body.name, status: req.body.status})
    res.send(await todosItem.find({}))
})

app.delete('/todo', async (req, res) => {
    await todosItem.findByIdAndDelete({_id: req.body._id})
    res.send(await todosItem.find({}))
})

app.listen(port, ()=>{
    console.log(`Listening on port http://localhost:${port}`)
})