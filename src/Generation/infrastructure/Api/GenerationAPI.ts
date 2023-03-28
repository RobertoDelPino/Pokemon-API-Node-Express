import { Generation } from "../../domain/entities/Generation";
import { GenerationRepository } from "../../domain/repository/GenerationRepository";

interface ResultApi{
    name:string;
    url: string;
}

export class GenerationAPI implements GenerationRepository{
    async getGenerationList(): Promise<Generation[]> {
        const response = await fetch("https://pokeapi.co/api/v2/generation");
        const json = await response.json();
        const generationList: Generation[] = json.results.map(({name}: ResultApi) => new Generation(name))
        return generationList
    }

    async getGenerationById(id: number): Promise<Generation> {
        const response = await fetch("https://pokeapi.co/api/v2/generation");
        const json = await response.json();
        const filter = json.results.find(({url}: ResultApi) => {
            const urlWithoutLastBar = url.slice(0, url.length - 1)
            const indexOfPenultimateBarInUrl = urlWithoutLastBar.lastIndexOf("/")
            const idFromUrl = urlWithoutLastBar.substring(indexOfPenultimateBarInUrl + 1)
            return id == Number.parseInt(idFromUrl)
        });
        
        const generation: Generation = new Generation(filter.name)
        
        return generation
    }
}