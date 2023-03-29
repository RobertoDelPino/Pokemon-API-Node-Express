import {Pokemon} from "../entities/Pokemon";

export interface PokemonRepository{
    getPokemonList(): Promise<Pokemon[]>
    getPokemonById(): Promise<Pokemon>;
}