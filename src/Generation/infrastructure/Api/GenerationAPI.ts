import {Generation} from "../../domain/entities/Generation";
import {GenerationRepository} from "../../domain/repository/GenerationRepository";
import {GenerationDetail} from "../../domain/entities/GenerationDetails";

interface GenerationApiResponse {
    results: Array<{
        name:string;
        url: string;
    }>
}

interface GenerationDetailApiResponse {
    id: number;
    name: string;
    types: Array<{
        name: string;
        url: string;
    }>
}

export class GenerationAPI implements GenerationRepository{
    private readonly generationEndpoint = 'https://pokeapi.co/api/v2/generation'

    async getGenerationList(): Promise<Generation[]> {
        const response = await fetch(this.generationEndpoint);
        const data: GenerationApiResponse = await response.json();
        return data.results.map(({name, url}) => new Generation(name, url))
    }

    async getGenerationDetailById(id: number): Promise<GenerationDetail> {
        const response = await fetch(this.generationEndpoint + "/" + id);
        const data: GenerationDetailApiResponse = await response.json();

        return new GenerationDetail(data.id, data.name)

    }
}