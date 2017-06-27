import {expect} from 'chai';

import {iocContainer, initializeBindings} from '../config/inversify.config';
import {App} from "../app";
import {iocTypes} from "../ioc-types";

//todo remaining tests
describe(`Post integration`, () => {
    let request = null;

    before(async () => {
        initializeBindings();

        const app = iocContainer.get<App>(iocTypes.App);
        await app.initializeApp();

        request = require('supertest')(app.server.server.listener);
    });

    it('gets all posts', async () => {
        let response: any = await new Promise((resolve, reject) => {
            request.get(`/posts`)
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

    // it('gets a single post', async () => {
    //     const postId = 2;
    //     const postName = "Post B";
    //
    //     let response: any = await new Promise((resolve, reject) => {
    //         request.get(`/posts/${postId}`)
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
    //     expect(response.body.id, `Id is not ${postId}`).to.equal(postId);
    //     expect(response.body.name, `Name is not ok`).to.be.ok;
    //     expect(response.body.name, `Name is not ${postName}`).to.equal(postName);
    // });
    //
    // it('creates a post', async () => {
    //     const postName = `Post D - ${new Date().getMilliseconds()}`;
    //
    //     let response: any = await new Promise((resolve, reject) => {
    //         request.post(`/posts`)
    //             .send({
    //                 name: postName
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
    //     expect(response.body.name, `Name is not ${postName}`).to.equal(postName);
    //
    //     const postId = response.body.id;
    //
    //     response = await new Promise((resolve, reject) => {
    //         request.get(`/posts/${postId}`)
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
    //     expect(response.body.id, `Id is not ${postId}`).to.equal(postId);
    //     expect(response.body.name, `Name is not ok`).to.be.ok;
    //     expect(response.body.name, `Name is not ${postName}`).to.equal(postName);
    // });
    //
    // it('updates a post', async () => {
    //     const postId = 1;
    //     const newPostName = `Post E - ${new Date().getMilliseconds()}`;
    //
    //     let response: any = await new Promise((resolve, reject) => {
    //         request.put(`/posts/${postId}`)
    //             .send({
    //                 name: newPostName
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
    //     expect(response.body.id, `Id is not ${postId}`).to.equal(postId);
    //     expect(response.body.name, `Name is not ok`).to.be.ok;
    //     expect(response.body.name, `Name is not ${newPostName}`).to.equal(newPostName);
    //
    //     response = await new Promise((resolve, reject) => {
    //         request.get(`/posts/${postId}`)
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
    //     expect(response.body.id, `Id is not ${postId}`).to.equal(postId);
    //     expect(response.body.name, `Name is not ok`).to.be.ok;
    //     expect(response.body.name, `Name is not ${newPostName}`).to.equal(newPostName);
    // });
    //
    // it('delete a post', async () => {
    //     let response: any = await new Promise((resolve, reject) => {
    //         request.post(`/posts`)
    //             .send({
    //                 name: `Post F - ${new Date().getMilliseconds()}`
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
    //     const postId = response.body.id;
    //
    //     response = await new Promise((resolve, reject) => {
    //         request.delete(`/posts/${postId}`)
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
    //         request.get(`/posts/${postId}`)
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
    // it('fails to update a post because there is no name', async () => {
    //     const postId = 1;
    //
    //     let response: any = await new Promise((resolve, reject) => {
    //         request.put(`/posts/${postId}`)
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
    // it('fails to create a post because there is no name', async () => {
    //     let response: any = await new Promise((resolve, reject) => {
    //         request.post(`/posts`)
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
    //         request.get(`/posts/undefined`)
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
    //         request.delete(`/posts/undefined`)
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
