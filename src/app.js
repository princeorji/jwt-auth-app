const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/v1/users', userRouter)

app.listen(port, () => {
    console.log(`🚀 Server listening on port: ${port}`)
})