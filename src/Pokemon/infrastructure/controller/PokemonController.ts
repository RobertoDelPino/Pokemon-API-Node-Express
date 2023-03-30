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

        if (isNaN(id)){
            res.status(400).json({"error": "Id must be a number"})
        }

        try {
            const pokemon: Pokemon = await this.pokemonService.getPokemonDetailsById(id)
            res.status(200).json({"pokemon": pokemon})
        }catch (error: any){
            res.status(400).json({"error": error.message})
        }
    }

    async getPokemonListByTypeFromAPI(req: Request, res: Response){
        const type = req.params.type
        try{
            const pokemonList: Pokemon[] = await this.pokemonService.getPokemonListByType(type)
            res.status(200).json({"PokemonList": pokemonList})
        }catch (error: any){
            res.status(400).json({"error": error.message})
        }
    }
}