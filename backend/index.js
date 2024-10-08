const express = require('express')
const cors  = require('cors')
const app = express()
const port = 5000
const mongoDB = require('./db')

mongoDB();

// app.use((req,res,next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     )
//     next();
// })
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

app.use(express.json())
app.use('/api', require("./Routes/CreatUser"))
app.use('/api', require("./Routes/DisplayData"))
app.use('/api', require("./Routes/OrderData"))

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})