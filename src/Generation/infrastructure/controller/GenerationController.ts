import { Request, Response } from "express";
import { Generation } from "../../domain/entities/Generation";
import { GetGenerationListUseCase } from "../../application/useCases/GetGenerationListUseCase";

export class GenerationController{
    constructor(private getGenerationListUseCase: GetGenerationListUseCase){
    }
    public async getGenerationList(_req: Request, res: Response){
        const generationList: Generation[] = await this.getGenerationListUseCase.exec();
        res.status(200).json(generationList)
    }
}