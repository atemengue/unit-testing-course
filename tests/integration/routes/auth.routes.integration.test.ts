import express, { Express } from 'express';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';
import authRoutes from '../../../src/routes/auth.routes';
import bodyParser = require('body-parser');

const app : Express = express();

describe("Auth Routes",  () => {

  beforeAll(() => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(authRoutes);
  })

  describe("SignUp Tests Suites", () => {

    it.todo("doit retourner status 200 avec un token", () => {

    });

    it.todo("doit retourner Invalid Params");
    it.todo("doit retourner status 500 request error")

  });


  describe("SignIn Tests Suites", () => {

    
  })

})