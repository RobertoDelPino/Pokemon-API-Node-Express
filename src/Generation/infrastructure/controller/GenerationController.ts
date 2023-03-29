import { Request, Response } from "express";
import { Generation } from "../../domain/entities/Generation";
import { GetGenerationListUseCase } from "../../application/useCases/GetGenerationListUseCase";
import { GetGenerationByIdUseCase } from "../../application/useCases/GetGenerationByIdUseCase";

export class GenerationController{
    constructor(private getGenerationListUseCase: GetGenerationListUseCase, private getGenerationByidUserCase: GetGenerationByIdUseCase){
    }
    public async getGenerationList(_req: Request, res: Response){
        const generationList: Generation[] = await this.getGenerationListUseCase.exec();
        res.status(200).json(generationList)
    }

    public async getGenerationById(req: Request, res: Response){
        let id:number = -1;
        id = Number.parseInt(req.params.id);
        
        if(isNaN(id)){
            return res.status(400).json({"error": "Id must be a number"});
        }

        try{
            const generation: Generation = await this.getGenerationByidUserCase.exec(id)
    
            return res.status(200).json(generation)
        }
        catch(error){
            return res.status(400).json({"error": error})
        }
    }
}