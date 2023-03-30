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

        await expect(() => service.getPokemonDetailsById(id)).rejects.toThrow("Id must be bigger than 0")
    })

    it('throw error if no pokemon was found', async () =>  {
        const id: number = 12222222;

        const repo : PokemonAPI = new PokemonAPI()
        repo.getPokemonDetailsById = jest.fn().mockReturnValue(null);
        const service : PokemonService = new PokemonService(repo)

        await expect(() => service.getPokemonDetailsById(id)).rejects.toThrow("No pokemon was found")
    });

    it('give a pokemon with same id', async () => {
        const id: number = 1;

        const repo : PokemonAPI = new PokemonAPI()
        repo.getPokemonDetailsById = jest.fn().mockReturnValue(new Pokemon(1,"", 1,1))
        const service : PokemonService = new PokemonService(repo)

        const data: Pokemon = await service.getPokemonDetailsById(id)

        expect(data).toStrictEqual(new Pokemon(1, "", 1, 1))
    });

})

describe("GetPokemonListByType should", () => {
    it("give a list of pokemon by type", async () => {
        const type = "grass";

        const repo : PokemonAPI = new PokemonAPI()
        repo.getPokemonListByType = jest.fn().mockReturnValue([new Pokemon(1,"", 1,1)])
        const service : PokemonService = new PokemonService(repo)

        const data = await service.getPokemonListByType(type);
        expect(data).toStrictEqual([new Pokemon(1,"", 1,1)])

    })

    it("use 'grass' as default if no type is given", async () => {
        const type = "";

        const repo : PokemonAPI = new PokemonAPI()
        repo.getPokemonListByType = jest.fn().mockReturnValue([new Pokemon(1,"bulbasaur", 7,69)])
        const service : PokemonService = new PokemonService(repo)

        const data = await service.getPokemonListByType(type);
        expect(data).toStrictEqual([new Pokemon(1,"bulbasaur", 7,69)])
    })
})