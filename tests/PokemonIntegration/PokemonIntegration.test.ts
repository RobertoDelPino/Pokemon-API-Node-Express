import {server} from "../../src";
import {Pokemon} from "../../src/Pokemon/domain/entities/Pokemon";

const request = require("supertest")

afterEach(() => {
    server.close()
})

describe("/Pokemon should", () => {
    it("give a list of pokemon", async () => {
        const response = await request(server)
            .get("/api/pokemon")
            .set('Accept', 'application/json');

        expect(response.body.PokemonList.length).toBe(20)
    })
})

describe("/Pokemon/:id should", () => {
    it("give one pokemon", async () => {
        const response = await request(server)
            .get("/api/pokemon/1")
            .set('Accept', 'application/json');

        expect(response.body.pokemon).toEqual(new Pokemon(1,"bulbasaur",7,69))
    })
})


