'use strict';

const { server } = require('../../lib/server/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('web server', () => {

    it('should respond with a 500 on an error', () => {

        return mockRequest
            .get('/server error ')
            .then(results => {
                expect(results.status).toBe(500);
            }).catch(console.error);

    });

    it('should respond with a 404 on an invalid method', () => {

        return mockRequest
            .post('/notfound')
            .then(results => {
                expect(results.status).toBe(404);
            }).catch(console.error);

    });

    it('should respond properly on request to /api/v1/categories', () => {

        return mockRequest
            .get('/api/v1/categories')
            .then(results => {
                expect(results.status).toBe(200);
            }).catch(console.error);

    });


    it('should respond properly on request to /categories', () => {

        return mockRequest
            .get('/categories')
            .then(results => {
                expect(results.status).toBe(200);
                expect(results.body.count).toBe(0);
            }).catch(console.error);
    });

    it('should respond properly on post to /categories', () => {

        return mockRequest
            .post('/categories')
            .send({ name: 'tools', description: 'make your life easy' })
            .then(results => {
                expect(results.status).toBe(200);
                expect(results.body.name).toBe('tools');
            }).catch(console.error);

    });





    it('should respond properly on request to /api/v1/products', () => {

        return mockRequest
            .get('/api/v1/products')
            .then(results => {
                expect(results.status).toBe(200);
            }).catch(console.error);

    });


    it('should respond properly on request to /products', () => {

        return mockRequest
            .get('/products')
            .then(results => {
                expect(results.status).toBe(200);
                expect(results.body.count).toBe(0);
            }).catch(console.error);
    });

    it('should respond properly on post to /products', () => {

        return mockRequest
            .post('/products')
            .send({ name: 'tools', description: 'make your life easy' })
            .then(results => {
                expect(results.status).toBe(200);
                expect(results.body.name).toBe('tools');
            }).catch(console.error);

    });


    it('this should post the object', () => {

        return mockRequest
            .post('/products')
            .send({ name: 'cars', description: 'the fastest car is BMW ' })
            .then(results => {
                expect(results.body.name).toBe('bmw');
            }).catch(console.error);

    });
    // What strategies should we use to test POST, PUT, DELETE?

    //     API test actions 
    // Each test is comprised of test actions. These are the individual actions a test needs to take per API test flow. For each API request, the test would need to take the following actions: 

    // 1. Verify correct HTTP status code. For example, creating a resource should return 201 CREATED and unpermitted requests should return 403 FORBIDDEN, etc.

    // 2. Verify response payload. Check valid JSON body and correct field names, types, and values — including in error responses.

    // 3. Verify response headers. HTTP server headers have implications on both security and performance.

    // 4. Verify correct application state. This is optional and applies mainly to manual testing, or when a UI or another interface can be easily inspected.  

    // 5. Verify basic performance sanity. If an operation was completed successfully but took an unreasonable amount of time, the test fails.

    // Test scenario categories
    // Our test cases fall into the following general test scenario groups:

    // Basic positive tests (happy paths)
    // Extended positive testing with optional parameters
    // Negative testing with valid input
    // Negative testing with invalid input
    // Destructive testing
    // Security, authorization, and permission tests (which are out of the scope of this post)
    // Happy path tests check basic functionality and the acceptance criteria of the API. We later extend positive tests to include optional parameters and extra functionality. The next group of tests is negative testing where we expect the application to gracefully handle problem scenarios with both valid user input (for example, trying to add an existing username) and invalid user input (trying to add a username which is null). Destructive testing is a deeper form of negative testing where we intentionally attempt to break the API to check its robustness (for example, sending a huge payload body in an attempt to overflow the system).
});