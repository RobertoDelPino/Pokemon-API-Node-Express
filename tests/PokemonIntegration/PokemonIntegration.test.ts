import {server} from "../../src";

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
