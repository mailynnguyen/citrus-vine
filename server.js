const port = 3000;
const express = require('express');
const app = express();
const { getUsers, getUser } = require('./src/app/database.js');

app.get("/users", async (req, res) => {
    const users = await getUsers();
    res.send(users);
})

app.get("/user/:id", async (req, res) => {
    const id = req.params.id;
    const user = await getUser(id);
    res.send(user);
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port, () => {
    console.log('Server is running on port', port)
})