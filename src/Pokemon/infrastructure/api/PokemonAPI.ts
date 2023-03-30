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

        const maxPokemon: number = 20;
        const pokemonArray: Pokemon[] = [];

        for (let id = 1; id <= maxPokemon; id++) {
            const pokemon: Pokemon = await this.getPokemonDetailsById(id);
            pokemonArray.push(pokemon)
        }

        return pokemonArray
    }

    async getPokemonDetailsById(idRequest: number): Promise<Pokemon> {
        if(idRequest < 1){
            throw new Error("Id must be bigger than 0")
        }

        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + idRequest)
        if(!response.ok){
            throw new Error("No pokemon was found")
        }
        const json: PokemonDetails = await response.json()
        const {id, name, height, weight} = json
        return new Pokemon(id, name, height, weight)
    }
}