import { Generation } from "../../domain/entities/Generation";
import { GenerationRepository } from "../../domain/repository/GenerationRepository";

export class GetGenerationListUseCase{
    constructor(private generationRepository: GenerationRepository){}

    exec(): Promise<Generation[]>{
        return this.generationRepository.getGenerationList();
    }
}