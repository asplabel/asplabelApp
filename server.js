const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/asplabelApp'));

app.get('/*', function(req,res) {
  try {
    res.sendFile(path.join(__dirname+'/dist/asplabelApp/index.html'));
  } catch (error) {
    console.log("Error: "+ error)
  }
});

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{
  console.log("Puerto: "+ PORT)
});
