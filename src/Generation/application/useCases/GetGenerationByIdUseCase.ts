import { Generation } from "../../domain/entities/Generation";
import { GenerationRepository } from "../../domain/repository/GenerationRepository";

export class GetGenerationByIdUseCase{
    constructor(private generationRepository: GenerationRepository){}

    async exec(id: number): Promise<Generation>{
        const data = await this.generationRepository.getGenerationList();
        const generation = this.findGeneration(data, id);
        if(typeof generation == "undefined"){
            throw new Error("Generation not found")
        }
        return generation;
    }

    private findGeneration(data: Generation[], id: number){
        return data.find(({url}) => {
            const urlSplit = url.split("/");
            const idFromUrl = urlSplit[urlSplit.length - 2]
            return id == Number.parseInt(idFromUrl);
        })
    }
}