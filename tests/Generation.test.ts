import {server} from "../src";
import { GetGenerationByIdUseCase } from "../src/Generation/application/useCases/GetGenerationByIdUseCase";
import { Generation } from "../src/Generation/domain/entities/Generation";
import { GenerationAPI } from "../src/Generation/infrastructure/Api/GenerationAPI";

const request = require('supertest')

/// Generation API

describe("Generation List route should", () => {

    afterEach(() => {
        server.close()
    })

    it("give generation list", async () => {
        const response = await request(server)
            .get('/api/generation')
            .set('Accept', 'application/json');

        expect(response.body[0].name).toEqual("generation-i")
    })
})

describe("Generation by Id route should", () => {

    afterEach(() => {
        server.close()
    })

    it("give status code 200", async () => {
        const response = await request(server)
            .get('/api/generation/1')
            .set('Accept', 'application/json');

        expect(response.status).toEqual(200)
    })

    it("give one generation", async () => {
        const response = await request(server)
            .get('/api/generation/8')
            .set('Accept', 'application/json');
        
        expect(response.body).toEqual(new Generation("generation-viii", "https://pokeapi.co/api/v2/generation/8/"))
    })

    it("give status 400 when string as id", async () => {
        const response = await request(server)
            .get('/api/generation/algo')
            .set('Accept', 'application/json');
        
        expect(response.status).toEqual(400)
    })

    it("give status 400 error when id number is bigger than list length", async () => {
        const response = await request(server)
            .get('/api/generation/10')
            .set('Accept', 'application/json');
        
        expect(response.status).toEqual(400)
    })
})

/// Generation use case

describe("GenerationByIdUseCase should", () => {

    afterEach(() => {
        server.close()
    })

    const api = new GenerationAPI()
    const generation = new Generation('irrelevant', 'prueba/1/')

    it("only give a single generation", async () => {
        // api.getGenerationById = jest.fn().mockImplementation(() => generation)
        api.getGenerationList = jest.fn().mockReturnValue([generation])
        const useCase = new GetGenerationByIdUseCase(api)

        const actual = await useCase.exec(1)

        expect(actual.name).toBe(generation.name)
    })

    it("give one generation by id", async () => {
        const api = new GenerationAPI()
        const useCase = new GetGenerationByIdUseCase(api)
        useCase.exec = jest.fn().mockReturnValue(new Generation("generation-v", "a"))
        const response: Generation = await useCase.exec(5);
        expect(response.name).toBe("generation-v")
    })

    it("give error when id not found", async () => {
        try {
            const api = new GenerationAPI()
            const useCase = new GetGenerationByIdUseCase(api)
            await useCase.exec(20)
        }catch (e: any){
            expect(e.message).toBe("Generation not found")
        }
    })
})