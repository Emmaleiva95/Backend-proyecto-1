import { Router } from "express";
import { generatePet, generatePetsDB, generateUsers, generateUsersDB } from "../../utils.js";
import userModel from "../models/user.model.js";
import petModel from "../models/pet.model.js";

const router = Router();

/**
 * @swagger
 * /api/mocks/mockingpets/{cantidad}:
 *   get:
 *     summary: Genera mascotas aleatorias
 *     tags: [Mocks]
 *     parameters:
 *       - in: path
 *         name: cantidad
 *         required: true
 *         description: Cantidad de mascotas a generar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de mascotas generadas
 */
router.get('/mockingpets/:cantidad', async (req, res) => {
    let quantity = parseInt(req.params.cantidad);
    let pets = generatePet(quantity);
    res.send(pets);
});

/**
 * @swagger
 * /api/mocks/mockingusers:
 *   get:
 *     summary: Genera 50 usuarios aleatorios
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de 50 usuarios generados
 */
router.get('/mockingusers', async (req, res) => {
    let users = generateUsers(50);
    res.send(users);
});

/**
 * @swagger
 * /api/mocks/generateData:
 *   post:
 *     summary: Genera e inserta datos en la base de datos
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: users
 *         required: true
 *         description: Cantidad de usuarios a generar
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pets
 *         required: true
 *         description: Cantidad de mascotas a generar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos generados exitosamente
 */
router.post('/generateData', async (req, res) => {
    let quantityUsers = req.query.users;
    let quantityPets = req.query.pets;

    generateUsersDB(quantityUsers);
    generatePetsDB(quantityPets);
    res.send({ payload: "success" });
});

/**
 * @swagger
 * /api/mocks/getUsersDB:
 *   get:
 *     summary: Obtiene todos los usuarios de la base de datos
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de usuarios de la base de datos
 *       500:
 *         description: Error al obtener los usuarios
 */
router.get('/getUsersDB', async (req, res) => {
  try {
      let users = await userModel.find();
      res.send(users);
  } catch (error) {
      res.status(500).send([]);  // Evitar registrar o erro, se não for necessário
  }
});

/**
 * @swagger
 * /api/mocks/getPetsDB:
 *   get:
 *     summary: Obtiene todas las mascotas de la base de datos
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de mascotas de la base de datos
 *       500:
 *         description: Error al obtener las mascotas
 */
router.get('/getPetsDB', async (req, res) => {
  try {
      let pets = await petModel.find();
      res.send(pets);
  } catch (error) {
      res.status(500).send([]);  // Evitar registrar o erro, se não for necessário
  }
});

export default router;
