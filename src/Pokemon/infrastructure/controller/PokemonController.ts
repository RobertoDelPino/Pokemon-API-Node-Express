import {PokemonService} from "../../application/PokemonService";
import {Request, Response} from "express";

export class PokemonController{
    constructor(private readonly pokemonService: PokemonService) {
    }

    async getPokemonListFromAPI(_req: Request, res: Response){
        const pokemonList =  await this.pokemonService.getPokemonList()
        res.status(200).json({"PokemonList": pokemonList})
    }
}