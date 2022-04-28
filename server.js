import express from "express";
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'

//db and authenticateUser

//routers
import authRouter from './routes/authRoutes.js'
import sensorsRouter from './routes/sensorsRoutes.js'
import mapRouter from './routes/mapRoutes.js'

//middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
    // sequelize.sync({ force: true }).then(() => {
    //     console.log("Drop and re-sync db.");
    // });
}
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ msg: 'Welcome!' })
})

app.get('/api/v1', (req, res) => {
    res.json({ msg: 'API!' })
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/map', mapRouter)
app.use('/api/v1/devices', authenticateUser, sensorsRouter)
//subscriptions: app.use('/api/v1/subscriptions', authenticateUser, subscriptionsRouter)

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