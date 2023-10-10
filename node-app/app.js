const express = require("express")
const apiRoute = require("./routes/apiRoute.js")
const authRoute = require('./routes/authRoute.js')
const dotenv = require('dotenv')
const app = express();
const cors = require('cors')

app.use(cors())
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.use('/auth', authRoute);
app.use('/api', apiRoute);

app.listen(port, () => {
    console.log(`server listen at http://localhost:${port}`)
})