import express from 'express';

const PORT = 9000;
const app = express();

const one: number = 1;
const two: number = 2;

app.get('/', (req, res) => {
    return res.send(`1 + 2 = ${one + two}`)
})

app.listen(PORT);

console.log(`[app]: http://localhost:${PORT}`);
