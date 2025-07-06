const rateLimiter = require('./rateLimiter');
const app = require('express')();

app.use(rateLimiter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});