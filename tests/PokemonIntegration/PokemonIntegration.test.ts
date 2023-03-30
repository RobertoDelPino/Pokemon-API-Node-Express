import {server} from "../../src";
import {Pokemon} from "../../src/Pokemon/domain/entities/Pokemon";

const request = require("supertest")

afterEach(() => {
    server.close()
})

describe("/pokemon should", () => {
    it("give a list of pokemon", async () => {
        const response = await request(server)
            .get("/api/pokemon")
            .set('Accept', 'application/json');

        expect(response.body.PokemonList.length).toBe(20)
    })
})

describe("/pokemon/:id should", () => {
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

describe("/pokemon/type should", () => {
    it("give pokemon list from default type('grass')", async () => {
        const response = await request(server)
            .get("/api/pokemon/type")
            .set('Accept', 'application/json');

        expect(response.body.PokemonList.length).toEqual(20)
    })

    it("give error message and status 400 if type is not a correct type", async () => {
        const response = await request(server)
            .get("/api/pokemon/type/asasdasd")
            .set('Accept', 'application/json');

        expect(response.body.error).toEqual("asasdasd is not a correct pokemon type")
    })
})


