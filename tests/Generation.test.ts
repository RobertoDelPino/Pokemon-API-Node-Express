const request = require('supertest')
import { GetGenerationByIdUseCase } from "../src/Generation/application/useCases/GetGenerationByIdUseCase";
import { Generation } from "../src/Generation/domain/entities/Generation";
// import { GetGenerationListUseCase } from "../src/Generation/application/useCases/GetGenerationListUseCase";
// import { Generation } from "../src/Generation/domain/entities/Generation";
import { GenerationAPI } from "../src/Generation/infrastructure/Api/GenerationAPI";
import { app } from "../src/index"

describe("Generation List route should", () => {
    it("give generation list", async () => {
        const response = await request(app)
            .get('/api/generation')
            .set('Accept', 'application/json');

        expect(response.body[0].name).toEqual("generation-i")
    })
})

describe("Generation by Id route should", () => {
    it("give status code 200", async () => {
        const response = await request(app)
            .get('/api/generation/1')
            .set('Accept', 'application/json');

        expect(response.status).toEqual(200)
    })

    it("give one generation", async () => {
        const response = await request(app)
            .get('/api/generation/1')
            .set('Accept', 'application/json');
        
        expect(response.body).toEqual(new Generation("generation-i"))
    })

    it("give status 400 when string as id", async () => {
        const response = await request(app)
            .get('/api/generation/algo')
            .set('Accept', 'application/json');
        
        expect(response.status).toEqual(400)
    })
})

// No es necesario
describe("GenerationByIdUseCase should", () => {
    it("only give a single generation", async () => {
        const api = new GenerationAPI()
        const useCase = new GetGenerationByIdUseCase(api)
        const response = await useCase.exec(1);
        expect(Array.isArray(response)).toBe(false)
    })

    it("give one generation by id", async () => {
        const api = new GenerationAPI()
        const useCase = new GetGenerationByIdUseCase(api)
        const response: Generation = await useCase.exec(5);
        expect(response.name).toBe("generation-v")
    })
})