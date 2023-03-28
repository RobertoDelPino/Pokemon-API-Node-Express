import { Generation } from "../entities/Generation";

export interface GenerationRepository{
    getGenerationList(): Promise<Generation[]>
    getGenerationById(id: number): Promise<Generation>
}
