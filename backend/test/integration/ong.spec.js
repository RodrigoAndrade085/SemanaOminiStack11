const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {

    it('should be able to create a new ong', async() =>{
        const response = await request(app)
        .post('/ongs')
        .send({
            name:"teste2",
            email:"contator@gmail.com",
            whatsapp:"4700000000",
            city:"Fortaleza",
            uf:"CE"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});