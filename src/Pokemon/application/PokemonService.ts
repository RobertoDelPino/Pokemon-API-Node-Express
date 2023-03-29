import {PokemonRepository} from "../domain/repository/PokemonRepository";
import {Pokemon} from "../domain/entities/Pokemon";

export class PokemonService{
    constructor(private readonly pokemonRepository: PokemonRepository ) {
    }

    async getPokemonList(): Promise<Pokemon[]>{
        return await this.pokemonRepository.getPokemonList();
    }

    getPokemonById(id: number): Promise<Pokemon[]>{
        if(id < 1){
            throw new Error("Id must be bigger than 0")
        }
        throw new Error("No pokemon was found")
    }
}