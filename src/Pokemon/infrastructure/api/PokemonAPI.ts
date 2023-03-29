import {PokemonRepository} from "../../domain/repository/PokemonRepository";
import {Pokemon} from "../../domain/entities/Pokemon";

export class PokemonAPI implements PokemonRepository{
    async getPokemonList(): Promise<Pokemon[]> {
        return [new Pokemon(1,"2",3,3)]
    }

    async getPokemonDetailsById(id: number): Promise<Pokemon> {
        return new Pokemon(id,"2",3,3);
    }
}