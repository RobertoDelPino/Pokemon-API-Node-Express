import { Generation } from "../entities/Generation";

export interface GenerationRepository{
    getGenerationList(): Promise<Generation[]> 
}
