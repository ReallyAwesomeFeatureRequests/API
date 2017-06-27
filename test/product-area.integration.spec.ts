import {expect} from 'chai';

import {iocContainer, initializeBindings} from '../config/inversify.config';
import {App} from "../app";
import {iocTypes} from "../ioc-types";

//todo remaining tests
describe(`ProductArea integration`, () => {
    let request = null;

    before(async () => {
        initializeBindings();

        const app = iocContainer.get<App>(iocTypes.App);
        await app.initializeApp();

        request = require('supertest')(app.server.server.listener);
    });

    it('gets all productAreas', async () => {
        let response: any = await new Promise((resolve, reject) => {
            request.get(`/product-areas`)
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

    // it('gets a single productArea', async () => {
    //     const productAreaId = 2;
    //     const productAreaName = "Billing";
    //
    //     let response: any = await new Promise((resolve, reject) => {
    //         request.get(`/product-areas/${productAreaId}`)
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
    //     expect(response.body.id, `Id is not ${productAreaId}`).to.equal(productAreaId);
    //     expect(response.body.name, `Name is not ok`).to.be.ok;
    //     expect(response.body.name, `Name is not ${productAreaName}`).to.equal(productAreaName);
    // });
    //
    // it('creates a productArea', async () => {
    //     const productAreaName = `ProductArea D - ${new Date().getMilliseconds()}`;
    //
    //     let response: any = await new Promise((resolve, reject) => {
    //         request.post(`/product-areas`)
    //             .send({
    //                 name: productAreaName
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
    //     expect(response.body.name, `Name is not ${productAreaName}`).to.equal(productAreaName);
    //
    //     const productAreaId = response.body.id;
    //
    //     response = await new Promise((resolve, reject) => {
    //         request.get(`/product-areas/${productAreaId}`)
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
    //     expect(response.body.id, `Id is not ${productAreaId}`).to.equal(productAreaId);
    //     expect(response.body.name, `Name is not ok`).to.be.ok;
    //     expect(response.body.name, `Name is not ${productAreaName}`).to.equal(productAreaName);
    // });
    //
    // it('updates a productArea', async () => {
    //     const productAreaId = 1;
    //     const newProductAreaName = `ProductArea E - ${new Date().getMilliseconds()}`;
    //
    //     let response: any = await new Promise((resolve, reject) => {
    //         request.put(`/product-areas/${productAreaId}`)
    //             .send({
    //                 name: newProductAreaName
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
    //     expect(response.body.id, `Id is not ${productAreaId}`).to.equal(productAreaId);
    //     expect(response.body.name, `Name is not ok`).to.be.ok;
    //     expect(response.body.name, `Name is not ${newProductAreaName}`).to.equal(newProductAreaName);
    //
    //     response = await new Promise((resolve, reject) => {
    //         request.get(`/product-areas/${productAreaId}`)
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
    //     expect(response.body.id, `Id is not ${productAreaId}`).to.equal(productAreaId);
    //     expect(response.body.name, `Name is not ok`).to.be.ok;
    //     expect(response.body.name, `Name is not ${newProductAreaName}`).to.equal(newProductAreaName);
    // });
    //
    // it('delete a productArea', async () => {
    //     let response: any = await new Promise((resolve, reject) => {
    //         request.post(`/product-areas`)
    //             .send({
    //                 name: `ProductArea F - ${new Date().getMilliseconds()}`
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
    //     const productAreaId = response.body.id;
    //
    //     response = await new Promise((resolve, reject) => {
    //         request.delete(`/product-areas/${productAreaId}`)
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
    //         request.get(`/product-areas/${productAreaId}`)
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
    // it('fails to update a productArea because there is no name', async () => {
    //     const productAreaId = 1;
    //
    //     let response: any = await new Promise((resolve, reject) => {
    //         request.put(`/product-areas/${productAreaId}`)
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
    // it('fails to create a productArea because there is no name', async () => {
    //     let response: any = await new Promise((resolve, reject) => {
    //         request.post(`/product-areas`)
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
    //         request.get(`/product-areas/undefined`)
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
    //         request.delete(`/product-areas/undefined`)
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
