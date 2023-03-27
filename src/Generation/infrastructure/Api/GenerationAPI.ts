import { Generation } from "../../domain/entities/Generation";
import { GenerationRepository } from "../../domain/repository/GenerationRepository";

interface ResultApi{
    name:string;
}

export class GenerationAPI implements GenerationRepository{
    async getGenerationList(): Promise<Generation[]> {
        const response = await fetch("https://pokeapi.co/api/v2/generation");
        const json = await response.json();
        const generationList: Generation[] = json.results.map(({name}: ResultApi) => new Generation(name))
        return generationList
    }
}