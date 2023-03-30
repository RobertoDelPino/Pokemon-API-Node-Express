import {PokemonRepository} from "../../domain/repository/PokemonRepository";
import {Pokemon} from "../../domain/entities/Pokemon";

interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
}

interface PokemonResult {
    url: string;
    name: string;
}

interface PokemonListByDetailsResult {
    name: string;
    pokemon: Array<{
        pokemon: PokemonResult
    }>
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

    async getPokemonListByType(type: string): Promise<Pokemon[]> {

        const maxLimit = 20;

        const response = await fetch("https://pokeapi.co/api/v2/type/" + type)
        const data: PokemonListByDetailsResult = await response.json()
        const pokemonArray: Pokemon[] = [];

        for (let i = 0; i < maxLimit; i++){
            const urlSplit = data.pokemon[i].pokemon.url.split("/");
            const idPokemon = Number.parseInt(urlSplit[urlSplit.length - 2])
            const {id, name, height, weight}: Pokemon = await this.getPokemonDetailsById(idPokemon)
            pokemonArray.push(new Pokemon(id, name, height, weight))
        }

        return pokemonArray
    }
}