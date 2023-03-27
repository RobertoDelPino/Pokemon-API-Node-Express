import express from 'express'
import { GetGenerationListUseCase } from '../../application/useCases/GetGenerationListUseCase'
import { GenerationAPI } from '../Api/GenerationAPI'
import { GenerationController } from '../controller/GenerationController'


export const generationRouter = express.Router()

const generationAPI = new GenerationAPI()

const getGenerationListUseCase = new GetGenerationListUseCase(generationAPI)

const generationController = new GenerationController(getGenerationListUseCase)

generationRouter.get("/", generationController.getGenerationList.bind(generationController));