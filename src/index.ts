import * as dotevnv from "dotenv";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import client from 'prom-client';

dotevnv.config()

if (!process.env.PORT) {
    console.log(`No port value specified...`)
}

const PORT = parseInt(process.env.PORT as string, 10)
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use('/patient', router)

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Histogram of HTTP request durations',
  buckets: [0.1, 0.3, 0.5, 1, 2], // Define duration buckets
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

