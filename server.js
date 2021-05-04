const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname+'/dist/lonkedinUI'));

app.get('/*',(req,res) => {
    res.sendFile(__dirname+'/dist/lonkedinUI/index.html');
});

app.listen(PORT,() => {
    console.log('servidor ON');
})