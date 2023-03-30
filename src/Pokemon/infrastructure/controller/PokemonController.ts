import {PokemonService} from "../../application/PokemonService";
import {Request, Response} from "express";
import {Pokemon} from "../../domain/entities/Pokemon";

export class PokemonController{
    constructor(private readonly pokemonService: PokemonService) {
    }

    async getPokemonListFromAPI(_req: Request, res: Response){
        const pokemonList =  await this.pokemonService.getPokemonList()
        res.status(200).json({"PokemonList": pokemonList})
    }

    async getPokemonWithId(req: Request, res: Response){
        const id = Number.parseInt(req.params.id)
        const pokemon: Pokemon = await this.pokemonService.getPokemonDetailsById(id)
        res.status(200).json({"pokemon": pokemon})
    }
}