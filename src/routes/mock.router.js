import { Router } from "express";
import { generatePet, generatePetsDB, generateUsers, generateUsersDB } from "../../utils.js";
import userModel from "../models/user.model.js";
import petModel from "../models/pet.model.js";

const router = Router();

// GENERAR PETS RANDOM
router.get('/mockingpets/:cantidad', async (req, res) => {
    let quantity = parseInt(req.params.cantidad);
    let pets =  generatePet(quantity)

  res.send(pets)
});

// GENERAR 50 USUARIOS
router.get('/mockingusers', async (req, res) => {
  let users =  generateUsers(50)
  res.send(users)
});



// GENERAR DATA E INSERTARLA EN LA BD.
router.post('/generateData', async (req, res) => {
  let quantityUsers = req.query.users;
  let quantityPets = req.query.pets;
  
  let users = generateUsersDB(quantityUsers);
  let pets =  generatePetsDB(quantityPets)
  res.send({payload: "success"})
});


// OBTENER DATA DE LA BD.
router.get('/getUsersDB', async (req, res) => {
  
  try {
    let users = await userModel.find();
    res.send(users)
} catch (error) {
    console.log(error)
    return null;
}

});

router.get('/getPetsDB', async (req, res) => {
  
  try {
    let pets = await petModel.find();
    res.send(pets)
} catch (error) {
    console.log(error)
    return null;
}
});

export default router;

///http://localhost:8080/api/mocks/generateData?users=10&pets=5