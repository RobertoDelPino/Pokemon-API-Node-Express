const request = require('supertest')
import { app } from "../src/index"

describe("Generation Api should", () => {
    it("give generation list", async () => {
        const response = await request(app)
            .get('/api/generation')
            .set('Accept', 'application/json');

        expect(response.body[0].name).toEqual("generation-i")
    })
})