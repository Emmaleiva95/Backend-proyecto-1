import { expect } from "chai";
import supertest from "supertest";
import sinon from "sinon";
import express from "express";
import { generatePet } from "../../../utils.js";
import userModel from "../../models/user.model.js";
import petModel from "../../models/pet.model.js";

import router from "../mock.router.js";

describe("mock router tests", () => {
  const app = express();
  app.use("/", router);
  const requester = supertest(app);

  afterEach(() => {
    sinon.restore();
  });

  describe("/getUsersDB", () => {
    it("devolver la lista de usuarios", async () => {
      const mockUsers = [
        {
          _id: "1234",
          first_name: "userName1",
          last_name: "userLastName1",
          email: "email1@example.com",
          age: 30,
        },
      ];
      sinon.stub(userModel, "find").resolves(mockUsers);
      const res = await requester.get("/getUsersDB");

      expect(res.body).to.deep.equal(mockUsers);
    });

    it("devolver vacio si falla la peticion con la bd", async () => {
      const error = new Error("fallo la conexion");
      sinon.stub(userModel, "find").rejects(error);
      const res = await requester.get("/getUsersDB");

      expect(res.status).to.equal(500);
      expect(res.body).to.deep.equal([]);
    });
  });

  describe("/getPetsDB", () => {
    it("devolver la lista de mascotas", async () => {
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
      ];
      sinon.stub(petModel, "find").resolves(mockPets);
      const res = await requester.get("/getPetsDB");

      expect(res.body).to.deep.equal(mockPets);
    });

    it("devolver vacio si falla la peticion con la bd", async () => {
      const error = new Error("fallo la conexion");
      sinon.stub(petModel, "find").rejects(error);
      const res = await requester.get("/getPetsDB");

      expect(res.status).to.equal(500);
      expect(res.body).to.deep.equal([]);
    });
  });

  describe("/mockingpets/:cantidad", () => {
    it("devolver la lista de mascotas generadas", async () => {
      const quantity = 3;
      const mockPets = [
        { name: "Pet 1", adopted: false, id: "1", owner: null },
        { name: "Pet 2", adopted: false, id: "2", owner: null },
        { name: "Pet 3", adopted: false, id: "3", owner: null },
      ];

      sinon.stub(generatePet, "call").returns(mockPets);
      const res = await requester.get(`/mockingpets/${quantity}`);

      expect(res.body).to.deep.equal(mockPets);
    });
  });

  describe("/mockingusers", () => {
    it("deve devolver usuários com os campos necessários", async () => {
      const res = await requester.get("/mockingusers");

      expect(res.body).to.be.an("array").that.is.not.empty;

      res.body.forEach((user) => {
        expect(user).to.have.all.keys(
          "first_name",
          "last_name",
          "email",
          "age",
          "password",
          "pets",
          "role"
        );
      });
    }).timeout(0);
  });

  describe("/generateData", () => {
    it("debería generar y guardar los datos correctamente", async () => {
      const quantityUsers = 5;
      const quantityPets = 3;
  
      const mockUsers = Array(quantityUsers).fill({});
      const mockPets = Array(quantityPets).fill({});
  
      sinon.stub(userModel, "find").resolves(mockUsers);
      sinon.stub(petModel, "find").resolves(mockPets);
      
      sinon.stub(userModel.prototype, "save").resolves();
      sinon.stub(petModel.prototype, "save").resolves();
  
      const res = await requester
        .post("/generateData")
        .query({ users: quantityUsers, pets: quantityPets });
  
      expect(res.status).to.equal(200);
      expect(res.body.payload).to.equal("success");
  
      const users = await userModel.find();
      const pets = await petModel.find();
  
      expect(users).to.have.lengthOf(quantityUsers);
      expect(pets).to.have.lengthOf(quantityPets);
  
      userModel.find.restore();
      petModel.find.restore();
      userModel.prototype.save.restore();
      petModel.prototype.save.restore();
    }).timeout(0);
  });
  
});