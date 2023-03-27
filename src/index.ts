import express from 'express'
import {generationRouter} from './Generation/infrastructure/router/generationRouter'

export const app = express()
app.use(express.json())

const PORT = 3000

app.use("/api/generation", generationRouter)

app.listen(PORT, () => {
    console.log(`Sever running on Port ${PORT}`)
    
})