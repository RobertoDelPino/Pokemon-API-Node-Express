import express from 'express'
import { GetGenerationByIdUseCase } from '../../application/useCases/GetGenerationByIdUseCase'
import { GetGenerationListUseCase } from '../../application/useCases/GetGenerationListUseCase'
import { GenerationAPI } from '../Api/GenerationAPI'
import { GenerationController } from '../controller/GenerationController'


export const generationRouter = express.Router()

const generationAPI = new GenerationAPI()

const getGenerationListUseCase = new GetGenerationListUseCase(generationAPI)
const getGenerationById = new GetGenerationByIdUseCase(generationAPI)

const generationController = new GenerationController(getGenerationListUseCase, getGenerationById)

generationRouter.get("/", generationController.getGenerationList.bind(generationController));

generationRouter.get("/:id", generationController.getGenerationById.bind(generationController));