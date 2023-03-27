import express from 'express'
export const app = express()
app.use(express.json())

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Sever running on Port ${PORT}`)
    
})