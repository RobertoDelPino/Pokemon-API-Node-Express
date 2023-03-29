import {PokemonService} from "./PokemonService";
import {PokemonAPI} from "../infrastructure/api/PokemonAPI";
import {Pokemon} from "../domain/entities/Pokemon";

describe("GetPokemonList should", () => {
    it("give a list of pokemons", async () => {
        const pokemonList: Pokemon[] = [new Pokemon(1,"2",3,3), new Pokemon(2,"2",3,3)]
        const repo : PokemonAPI = new PokemonAPI()
        const service : PokemonService = new PokemonService(repo)
        repo.getPokemonList = jest.fn().mockReturnValue(pokemonList)
        const data: Pokemon[] = await service.getPokemonList()

        expect(data).toBe(pokemonList)
    })
})



describe("GetPokemonById should", () => {
    it("throw error if id is less than 1", async () => {
        const id: number = 0;

        const repo : PokemonAPI = new PokemonAPI()
        const service : PokemonService = new PokemonService(repo)

        await expect(() => service.getPokemonById(id)).toThrow("Id must be bigger than 0")
    })

    it('throw error if no pokemon was found', async () =>  {
        const id: number = 1;

        const repo : PokemonAPI = new PokemonAPI()
        repo.getPokemonById = jest.fn().mockReturnValue(null);
        const service : PokemonService = new PokemonService(repo)

        await expect(() => service.getPokemonById(id)).toThrow("No pokemon was found")
    });

})