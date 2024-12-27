import * as dotevnv from "dotenv";
import express from "express";
import cors from "cors";
import { router } from "./routes";


dotevnv.config()

if (!process.env.PORT) {
    console.log(`No port value specified...`)
}

const PORT = parseInt(process.env.PORT as string, 10)
const app = express()
const client = require('prom-client')

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use('/patient', router)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});