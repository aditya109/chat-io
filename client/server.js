const express = require('express');

const app = express();
const port = 3000;

app.get('/login', (request, response) => {
    response.send("Hello world")
})

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/views/login.html');
})

app.listen(port, () => {
    console.log(`Frontend server listening at http://localhost:${port}`)
})

