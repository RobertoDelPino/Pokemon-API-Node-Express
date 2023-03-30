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

    it("throw error message and status 400 when id less than 0", async () => {
        const response = await request(server)
            .get("/api/pokemon/0")
            .set('Accept', 'application/json');

        expect(response.body.error).toBe("Id must be bigger than 0")
    })

    it("throw error message and status 400 when no pokemon was found", async () => {
        const response = await request(server)
            .get("/api/pokemon/12222222")
            .set('Accept', 'application/json');

        expect(response.body.error).toBe("No pokemon was found")
    })

    it("throw error message and status 400 when id is not a number", async () => {
        const response = await request(server)
            .get("/api/pokemon/numero")
            .set('Accept', 'application/json');

        expect(response.body.error).toBe("Id must be a number")
    })
})


