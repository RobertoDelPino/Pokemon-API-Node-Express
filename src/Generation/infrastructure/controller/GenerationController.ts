import { Request, Response } from "express";

export class GenerationController{
    constructor(private getGenerationListUseCase: GetGenerationListUseCase){
    }
    public getGenerationList(_req: Request, res: Response){
        const generationList: Generation[] = this.getGenerationListUseCase.exec();
        res.status(200).json(generationList)
    }
}