import { Generation } from "../../domain/entities/Generation";
import { GenerationRepository } from "../../domain/repository/GenerationRepository";

export class GetGenerationByIdUseCase{
    constructor(private generationRepository: GenerationRepository){}

    exec(id: number): Promise<Generation>{
        return this.generationRepository.getGenerationById(id);
    }
}