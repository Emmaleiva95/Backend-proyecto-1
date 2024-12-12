import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {  fakerDE as faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import userModel from './src/models/user.model.js';
import petModel from './src/models/pet.model.js';


const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename);

export const encriptarPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const generatePet = (quantity) => {
    let petArray = [];
    for (let i = 1; i <= quantity; i++) {
        petArray.push({
            id: i.toString(), // Alterado para gerar ids sequenciais
            owner: null,
            adopted: false,
            name: `Pet ${i}`  // Nome gerado de forma sequencial
        });
    }

    return petArray;
};


export const generateUsers = (quantity) => {
    let usersArray=[];
    /* 
        GENERAR ROL RANDOM.
    */
    const roleType = ['admin', 'user'];
    for (let i = 1; i <= quantity; i++) {
        usersArray.push({
            first_name: faker.person.firstName(),
            last_name:faker.person.lastName(),
            email:faker.internet.email(),
            age: faker.number.int({ min: 20, max: 80 }),
            password: encriptarPassword('coder123'),
            role: faker.helpers.arrayElement(roleType),
            pets: []

    
        })   
    }

    return usersArray;
}



export const generateUsersDB = async (quantity) => {
    const roleType = ['admin', 'user'];
    for (let i = 1; i <= quantity; i++) {
        let user = {
            first_name: faker.person.firstName(),
            last_name:faker.person.lastName(),
            email:faker.internet.email(),
            age: faker.number.int({ min: 20, max: 80 }),
            password: encriptarPassword('coder123'),
            role: faker.helpers.arrayElement(roleType),
            pets: []
        }

        const nuevoUsuario = new userModel(user);


        try {
            const usuarioGuardado = await nuevoUsuario.save();
        } catch (error) {
            console.log(error)
            return null;
        }

    }

    return true;
}



export const generatePetsDB = async (quantity) => {
    
    for (let i = 1; i <= quantity; i++) {
        let pet = {
            id : faker.database.mongodbObjectId(),
            owner: null,
            adopted:false,
            name: faker.person.lastName()
    
        };
        
        const nuevaPet = new petModel(pet);


        try {
            const petGuardada = await nuevaPet.save();
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    return true;
}