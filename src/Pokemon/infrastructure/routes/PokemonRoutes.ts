import express from "express";
import {PokemonController} from "../controller/PokemonController";
import {PokemonService} from "../../application/PokemonService";
import {PokemonAPI} from "../api/PokemonAPI";

export const pokemonRouter = express.Router();

const pokemonRepository = new PokemonAPI()
const pokemonService = new PokemonService(pokemonRepository)

const pokemonController = new PokemonController(pokemonService)

pokemonRouter.get("/type", pokemonController.getPokemonListByTypeFromAPI.bind(pokemonController))
pokemonRouter.get("/type/:type", pokemonController.getPokemonListByTypeFromAPI.bind(pokemonController))
pokemonRouter.get("/", pokemonController.getPokemonListFromAPI.bind(pokemonController))
pokemonRouter.get("/:id", pokemonController.getPokemonWithId.bind(pokemonController))
