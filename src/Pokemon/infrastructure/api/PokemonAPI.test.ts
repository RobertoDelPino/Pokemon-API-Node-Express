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
        const data: Pokemon[] = await  api.getPokemonList();
        expect(data[0].name)
    })
})

describe("getPokemonDetailsById should", () => {
    it("give details of pokemon", async () => {
        const pokemonExpected: Pokemon = new Pokemon(1,"bulbasaur", 7, 69 )

        const api: PokemonAPI = new PokemonAPI();
        const pokemon: Pokemon = await api.getPokemonDetailsById(1);
        expect(pokemon).toStrictEqual(pokemonExpected)
    })
})
