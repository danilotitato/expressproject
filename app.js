const express = require('express');
const app = express();
const port = process.env.HTTP_PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hey guys');
})

app.listen(port, () => {
    console.log('Server listening on port ' + port);
})