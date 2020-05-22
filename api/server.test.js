const supertest = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');


afterEach(async ()=>{
    await db('hobbits').truncate();
});

describe('server', () => {
    it('can run tests', () => {
        expect(true).toBeTruthy();
    });

    describe("get /", () => {
        it('should return http status code 200 ok', () => {
            return (
                supertest(server)
                    .get('/')
                    .then(response => {
                        expect(response.status).toBe(200);
                    })
            )
        });

        it(`should return {api:'up'}`, ()=>{
            return supertest(server)
                .get('/')
                .then(response=>{
                    expect(response.body).toEqual({api: 'up'});
                    expect(response.body.api).toBeDefined();
                    expect(response.body.api).toBe('up');
                })
        });
    });

    describe('get /hobbits',()=>{
        it('should return an array', ()=>{
            return supertest(server).get('/hobbits').then(response=>{
                expect(Array.isArray(response.body)).toBe(true);
            })
        })
    })

    describe('get /hobbits',()=>{
        it('should return an array of 4 elements',()=>{
            return supertest(server).get('/hobbits').then(response=>{
                expect(response.body).toHaveLength(0);
            })
        })
    })
});