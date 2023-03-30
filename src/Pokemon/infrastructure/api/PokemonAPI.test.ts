import {PokemonAPI} from "./PokemonAPI";
import {Pokemon} from "../../domain/entities/Pokemon";

/*
*
* Como estamos haciendo pruebas de la API, son
* test de integración
*
*/

describe("getPokemonList should", () => {
    it("give a list of pokemon", async () => {
        const api: PokemonAPI = new PokemonAPI();
        const data: Pokemon[] = await api.getPokemonList();

        expect(data.length).toBe(20)
    })
})

describe("getPokemonDetailsById should", () => {
    it("give details of pokemon", async () => {
        const pokemonExpected: Pokemon = new Pokemon(1,"bulbasaur", 7, 69 )

        const api: PokemonAPI = new PokemonAPI();
        const pokemon: Pokemon = await api.getPokemonDetailsById(1);
        expect(pokemon).toStrictEqual(pokemonExpected)
    })

    it("throw error message if no pokemon have same id", async () => {
        const api: PokemonAPI = new PokemonAPI();

        await expect(() =>  api.getPokemonDetailsById(122222)).rejects.toThrow("No pokemon was found")
    })

    it("throw error message if id is less than 1", async () => {
        const api: PokemonAPI = new PokemonAPI();

        await expect(() =>  api.getPokemonDetailsById(0)).rejects.toThrow("Id must be bigger than 0")
    })
})

describe("getPokemonListByType should", () => {
    it("give a list of pokemon by type", async () => {
        const type = "grass"
        const api: PokemonAPI = new PokemonAPI();
        const data: Pokemon[] = await api.getPokemonListByType(type);

        expect(data).toBeTruthy()
    })

    it("throw error message if type is not a correct type", async () => {
        const type = "adasdasd"
        const api: PokemonAPI = new PokemonAPI();

        await expect(() =>  api.getPokemonListByType(type)).rejects.toThrow(type + " is not a correct pokemon type")
    })
})
