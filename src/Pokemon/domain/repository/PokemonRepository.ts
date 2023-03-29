import {Pokemon} from "../entities/Pokemon";

export interface PokemonRepository{
    getPokemonList(): Promise<Pokemon[]>
    getPokemonDetailsById(id: number): Promise<Pokemon>;
}