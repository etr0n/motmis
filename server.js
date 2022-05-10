import express from "express";
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'
import { dirname } from 'path'
import { fileURLToPath } from "url";
import path from 'path'

import helmet from 'helmet'
import xss from 'xss-clean'

//routers
import authRouter from './routes/authRoutes.js'
import sensorsRouter from './routes/sensorsRoutes.js'
import mapRouter from './routes/mapRoutes.js'
import subscriptionRouter from './routes/subscriptionRoutes.js'

//middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.resolve(__dirname, './client/build')))
//for securing headers
app.use(express.json())
//prevent cross side scripting syntax
app.use(helmet())
app.use(xss())

app.get('/', (req, res) => {
    res.json({ msg: 'Welcome!' })
})

app.get('/api/v1', (req, res) => {
    res.json({ msg: 'API!' })
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/map', mapRouter)
app.use('/api/v1/devices', authenticateUser, sensorsRouter)
app.use('/api/v1/subscriptions', authenticateUser, subscriptionRouter)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is listening on ${port}...`)
        })

    } catch (error) {
        console.log(error)
    }
}

start()