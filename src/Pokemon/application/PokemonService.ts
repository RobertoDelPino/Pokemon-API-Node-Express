import {PokemonRepository} from "../domain/repository/PokemonRepository";
import {Pokemon} from "../domain/entities/Pokemon";

export class PokemonService{
    constructor(private readonly pokemonRepository: PokemonRepository ) {
    }

    async getPokemonList(): Promise<Pokemon[]>{
        return await this.pokemonRepository.getPokemonList();
    }

    async getPokemonById(id: number): Promise<Pokemon[]>{
        throw new Error("Not implemented yet")
    }
}