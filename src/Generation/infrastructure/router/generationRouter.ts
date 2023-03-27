import express from 'express'
import { GenerationController } from '../controller/GenerationController'
const app = express.Router()


const generationController = new GenerationController()

app.get("/", generationController.getGenerationList)