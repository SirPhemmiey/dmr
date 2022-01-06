import app from '../../../app';
import supertest from 'supertest';
import { getMysqlPool } from '../../../clients/mysql/mysql';

const datbasePool = getMysqlPool();
const service = supertest(app);

describe('Task Lists', () => {
    afterAll(async () => {
        await datbasePool.end();
    })

    it("should create a new tasklist", (done) => {
        service.post('/v1/tasklists/create')
            .send({
                "title": "test 1 tasklist"
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .then((response) => {
                const body = response.body;
                expect(body).toMatchObject({
                    message: "Tasklist created successfully"
                });
            }).catch((err) => {
                // console.log({errOccured: err});
            });
        done();
    }, 1000);

});