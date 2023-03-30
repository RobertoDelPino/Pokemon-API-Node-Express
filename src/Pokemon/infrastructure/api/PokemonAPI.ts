import {PokemonRepository} from "../../domain/repository/PokemonRepository";
import {Pokemon} from "../../domain/entities/Pokemon";

interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
}

export class PokemonAPI implements PokemonRepository{

    async getPokemonList(): Promise<Pokemon[]> {
        return [new Pokemon(1,"2",3,3)]
    }

    async getPokemonDetailsById(idRequest: number): Promise<Pokemon> {

        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + idRequest)
        if(!response.ok){
            throw new Error("No pokemon was found")
        }
        const json: PokemonDetails = await response.json()
        const {id, name, height, weight} = json
        return new Pokemon(id, name, height, weight)
    }
}