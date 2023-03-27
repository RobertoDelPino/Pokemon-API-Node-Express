import express from 'express'
import { GetGenerationListUseCase } from '../../application/useCases/GetGenerationListUseCase'
import { GenerationAPI } from '../Api/GenerationAPI'
import { GenerationController } from '../controller/GenerationController'
const app = express.Router()

const generationAPI = new GenerationAPI()

const getGenerationListUseCase = new GetGenerationListUseCase(generationAPI)

const generationController = new GenerationController(getGenerationListUseCase)

app.get("/", generationController.getGenerationList)