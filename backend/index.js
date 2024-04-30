import express from 'express'
import router from './src/router.js'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

app.use('/api', router)

app.get('/', (req, res) => {
  res.send('Hello World from Nomad E-Commerce Server!')
})

app.listen(port, () => {
  console.log(`Nomad E-Commerce server listening on port ${port}`)
})