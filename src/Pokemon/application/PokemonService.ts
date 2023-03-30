import {PokemonRepository} from "../domain/repository/PokemonRepository";
import {Pokemon} from "../domain/entities/Pokemon";

export class PokemonService{
    constructor(private readonly pokemonRepository: PokemonRepository ) {
    }

    async getPokemonList(): Promise<Pokemon[]>{
        return await this.pokemonRepository.getPokemonList();
    }

    async getPokemonDetailsById(id: number): Promise<Pokemon>{
        if(id < 1){
            throw new Error("Id must be bigger than 0")
        }

        const pokemon: Pokemon = await this.pokemonRepository.getPokemonDetailsById(id);
        // La llamada al repo debería devolver null/throw error si no encuentra nada
        if(pokemon != null){
            return pokemon
        }

        throw new Error("No pokemon was found")
    }
}