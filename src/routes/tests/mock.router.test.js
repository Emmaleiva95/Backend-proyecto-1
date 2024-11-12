import { expect } from 'chai';
import supertest from 'supertest'
import sinon from 'sinon'
import express from 'express'

import userModel from "../../models/user.model.js";
import petModel from "../../models/pet.model.js";
import router from '../mock.router.js';
describe('mock router tests', () => {
  const app = express()
  app.use('/', router);
  const requester = supertest(app)
  afterEach(() => {
    sinon.restore();
  });

  describe('/getUseresDb', () => {
      it('devolver la lista de usuarios', async () => {
          const mockUsers = [
            {
              _id: '1234',
              first_name: 'userName1',
              last_name: 'userLastName1',
              email: 'email1@example.com',
              age: 30
            }
          ]
          sinon.stub(userModel, "find").resolves(mockUsers);
          const res = await requester.get('/getUsersDB')
      
          expect(res.body).to.deep.equal(mockUsers);
      });

      it('devolver vacio si falla la peticion con la bd', async () => {
        const error = new Error('fallo la conexion')
        sinon.stub(userModel, "find").rejects(error);
        const res = await requester.get('/getUsersDB')
        expect(res.body).to.deep.equal({});
    });
  })

  describe('/getUseresDb', () => {
    it('devolver la lista de usuarios', async () => {
        const mockPets = [
          {
            _id: "123",
            name: "Northoff",
            owner: null,
            adopted: false,
          },
          {
            _id: "456",
            name: "Gruber",
            owner: null,
            adopted: false,
          },
        ]
        sinon.stub(petModel, "find").resolves(mockPets);
        const res = await requester.get('/getPetsDB')
    
        expect(res.body).to.deep.equal(mockPets);
    });

    it('devolver vacio si falla la peticion con la bd', async () => {
      const error = new Error('fallo la conexion')
      sinon.stub(petModel, "find").rejects(error);
      const res = await requester.get('/getPetsDB')
      expect(res.body).to.deep.equal({});
  });
})
});


