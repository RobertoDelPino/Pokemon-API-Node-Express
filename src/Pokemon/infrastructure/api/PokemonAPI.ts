import {PokemonRepository} from "../../domain/repository/PokemonRepository";
import {Pokemon} from "../../domain/entities/Pokemon";

interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
}

interface PokemonResult {
    url: string;
    name: string;
}

interface PokemonListByTypeDetailResult {
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
        const {id, name, height, weight, sprites} = json
        return new Pokemon(id, name, height, weight, sprites.other["official-artwork"].front_default)
    }

    async getPokemonListByType(type: string): Promise<Pokemon[]> {

        const maxLimit = 20;

        const response = await fetch("https://pokeapi.co/api/v2/type/" + type)
        if(!response.ok){
            throw new Error(type + " is not a correct pokemon type")
        }
        const data: PokemonListByTypeDetailResult = await response.json()
        const pokemonArray: Pokemon[] = [];

        for (let i = 0; i < maxLimit; i++){
            const urlSplit = data.pokemon[i].pokemon.url.split("/");
            const idPokemon = Number.parseInt(urlSplit[urlSplit.length - 2])
            const {id, name, height, weight, urlImage }: Pokemon = await this.getPokemonDetailsById(idPokemon)
            pokemonArray.push(new Pokemon(id, name, height, weight, urlImage))
        }

        return pokemonArray
    }
}