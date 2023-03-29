import express from 'express'
import {generationRouter} from './Generation/infrastructure/router/generationRouter'

const app = express()
app.use(express.json())

const PORT = 2000

app.use("/api/generation", generationRouter)

export const server = app.listen(PORT, () => {
    console.log(`Sever running on Port ${PORT}`)
})