import express from 'express'
import { GenerationController } from '../controller/GenerationController'
const app = express.Router()



app.get("/", GenerationController.getGenerationList)