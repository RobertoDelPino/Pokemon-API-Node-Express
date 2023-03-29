import {PokemonRepository} from "../domain/repository/PokemonRepository";
import {Pokemon} from "../domain/entities/Pokemon";

export class PokemonService{
    constructor(private readonly pokemonRepository: PokemonRepository ) {
    }

    async getPokemonList(): Promise<Pokemon[]>{
        return await this.pokemonRepository.getPokemonList();
    }
}