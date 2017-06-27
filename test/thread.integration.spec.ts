import {expect} from 'chai';

import {iocContainer, initializeBindings} from '../config/inversify.config';
import {App} from "../app";
import {iocTypes} from "../ioc-types";

//todo remaining tests
describe(`Thread integration`, () => {
    let request = null;

    before(async () => {
        initializeBindings();

        const app = iocContainer.get<App>(iocTypes.App);
        await app.initializeApp();

        request = require('supertest')(app.server.server.listener);
    });

    it('gets all threads', async () => {
        let response: any = await new Promise((resolve, reject) => {
            request.get(`/threads`)
                .end((err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(res);
                });
        });

        expect(response.status).to.equal(200);
        expect(response.body).to.be.ok;
        expect(response.body).to.be.instanceof(Array);
        expect(response.body).to.not.be.empty;
    });

    // it('gets a single thread', async () => {
    //     const threadId = 2;
    //     const threadName = "Thread B";
    //
    //     let response: any = await new Promise((resolve, reject) => {
    //         request.get(`/threads/${threadId}`)
    //             .end((err, res) => {
    //                 if (err) {
    //                     return reject(err);
    //                 }
    //
    //                 resolve(res);
    //             });
    //     });
    //
    //     expect(response.status, `Status is not 200`).to.equal(200);
    //     expect(response.body, `Body is not ok`).to.be.ok;
    //     expect(response.body.id, `Id is not ok`).to.be.ok;
    //     expect(response.body.id, `Id is not ${threadId}`).to.equal(threadId);
    //     expect(response.body.name, `Name is not ok`).to.be.ok;
    //     expect(response.body.name, `Name is not ${threadName}`).to.equal(threadName);
    // });
    //
    // it('creates a thread', async () => {
    //     const threadName = `Thread D - ${new Date().getMilliseconds()}`;
    //
    //     let response: any = await new Promise((resolve, reject) => {
    //         request.post(`/threads`)
    //             .send({
    //                 name: threadName
    //             })
    //             .set('Accept', 'application/json')
    //             .end((err, res) => {
    //                 if (err) {
    //                     return reject(err);
    //                 }
    //
    //                 resolve(res);
    //             });
    //     });
    //
    //     expect(response.status, `Status is not 201`).to.equal(201);
    //     expect(response.body, `Body is not ok`).to.be.ok;
    //     expect(response.body.id, `Id is not ok`).to.be.ok;
    //     expect(response.body.name, `Name is not ok`).to.be.ok;
    //     expect(response.body.name, `Name is not ${threadName}`).to.equal(threadName);
    //
    //     const threadId = response.body.id;
    //
    //     response = await new Promise((resolve, reject) => {
    //         request.get(`/threads/${threadId}`)
    //             .end((err, res) => {
    //                 if (err) {
    //                     return reject(err);
    //                 }
    //
    //                 resolve(res);
    //             });
    //     });
    //
    //     expect(response.status, `Status is not 200`).to.equal(200);
    //     expect(response.body, `Body is not ok`).to.be.ok;
    //     expect(response.body.id, `Id is not ok`).to.be.ok;
    //     expect(response.body.id, `Id is not ${threadId}`).to.equal(threadId);
    //     expect(response.body.name, `Name is not ok`).to.be.ok;
    //     expect(response.body.name, `Name is not ${threadName}`).to.equal(threadName);
    // });
    //
    // it('updates a thread', async () => {
    //     const threadId = 1;
    //     const newThreadName = `Thread E - ${new Date().getMilliseconds()}`;
    //
    //     let response: any = await new Promise((resolve, reject) => {
    //         request.put(`/threads/${threadId}`)
    //             .send({
    //                 name: newThreadName
    //             })
    //             .set('Accept', 'application/json')
    //             .end((err, res) => {
    //                 if (err) {
    //                     return reject(err);
    //                 }
    //
    //                 resolve(res);
    //             });
    //     });
    //
    //     expect(response.status, `Status is not 200`).to.equal(200);
    //     expect(response.body, `Body is not ok`).to.be.ok;
    //     expect(response.body.id, `Id is not ok`).to.be.ok;
    //     expect(response.body.id, `Id is not ${threadId}`).to.equal(threadId);
    //     expect(response.body.name, `Name is not ok`).to.be.ok;
    //     expect(response.body.name, `Name is not ${newThreadName}`).to.equal(newThreadName);
    //
    //     response = await new Promise((resolve, reject) => {
    //         request.get(`/threads/${threadId}`)
    //             .end((err, res) => {
    //                 if (err) {
    //                     return reject(err);
    //                 }
    //
    //                 resolve(res);
    //             });
    //     });
    //
    //     expect(response.status, `Status is not 200`).to.equal(200);
    //     expect(response.body, `Body is not ok`).to.be.ok;
    //     expect(response.body.id, `Id is not ok`).to.be.ok;
    //     expect(response.body.id, `Id is not ${threadId}`).to.equal(threadId);
    //     expect(response.body.name, `Name is not ok`).to.be.ok;
    //     expect(response.body.name, `Name is not ${newThreadName}`).to.equal(newThreadName);
    // });
    //
    // it('delete a thread', async () => {
    //     let response: any = await new Promise((resolve, reject) => {
    //         request.post(`/threads`)
    //             .send({
    //                 name: `Thread F - ${new Date().getMilliseconds()}`
    //             })
    //             .set('Accept', 'application/json')
    //             .end((err, res) => {
    //                 if (err) {
    //                     return reject(err);
    //                 }
    //
    //                 resolve(res);
    //             });
    //     });
    //
    //     const threadId = response.body.id;
    //
    //     response = await new Promise((resolve, reject) => {
    //         request.delete(`/threads/${threadId}`)
    //             .end((err, res) => {
    //                 if (err) {
    //                     return reject(err);
    //                 }
    //
    //                 resolve(res);
    //             });
    //     });
    //
    //     expect(response.status, `Status is not 200`).to.equal(200);
    //     expect(response.body, `Body is not ok`).to.be.ok;
    //
    //     response = await new Promise((resolve, reject) => {
    //         request.get(`/threads/${threadId}`)
    //             .end((err, res) => {
    //                 if (err) {
    //                     return reject(err);
    //                 }
    //
    //                 resolve(res);
    //             });
    //     });
    //
    //     expect(response.status, `Response is not 404`).to.equal(404);
    // });
    //
    // it('fails to update a thread because there is no name', async () => {
    //     const threadId = 1;
    //
    //     let response: any = await new Promise((resolve, reject) => {
    //         request.put(`/threads/${threadId}`)
    //             .end((err, res) => {
    //                 if (err) {
    //                     return reject(err);
    //                 }
    //
    //                 resolve(res);
    //             });
    //     });
    //
    //     expect(response.status, `Status is not 400`).to.equal(400);
    // });
    //
    // it('fails to create a thread because there is no name', async () => {
    //     let response: any = await new Promise((resolve, reject) => {
    //         request.post(`/threads`)
    //             .end((err, res) => {
    //                 if (err) {
    //                     return reject(err);
    //                 }
    //
    //                 resolve(res);
    //             });
    //     });
    //
    //     expect(response.status, `Status is not 400`).to.equal(400);
    // });
    //
    // it('fails to get one because id is bad', async () => {
    //     const response: any = await new Promise((resolve, reject) => {
    //         request.get(`/threads/undefined`)
    //             .end((err, res) => {
    //                 if (err) {
    //                     return reject(err);
    //                 }
    //
    //                 resolve(res);
    //             });
    //     });
    //
    //     expect(response.status, `Status is not 400`).to.equal(400);
    // });
    //
    // it('fails to delete because id is bad', async () => {
    //     const response: any = await new Promise((resolve, reject) => {
    //         request.delete(`/threads/undefined`)
    //             .end((err, res) => {
    //                 if (err) {
    //                     return reject(err);
    //                 }
    //
    //                 resolve(res);
    //             });
    //     });
    //
    //     expect(response.status, `Status is not 400`).to.equal(400);
    // });
});
