import { Generation } from "../entities/Generation";
import {GenerationDetail} from "../entities/GenerationDetails";

export interface GenerationRepository{
    getGenerationList(): Promise<Generation[]>
    getGenerationDetailById(id: number): Promise<GenerationDetail>
}
