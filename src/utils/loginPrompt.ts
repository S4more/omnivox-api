
import console from "console";
import { loadMio } from "../index";

async function getId() {
    const { AuthPrompt } = require('enquirer');

    function authenticate(_value: any, _state: any) {
        return true;
    }

    const CustomAuthPrompt = AuthPrompt.create(authenticate);

    const prompt = new CustomAuthPrompt({
        name: 'password',
        message: 'Please enter your password',
        username: 'rajat-sr',
        password: '1234567',
        choices: [
            { name: 'username', message: 'username' },
            { name: 'password', message: 'password' }
        ]
    });

    prompt
        .run()
        .then((answer: any) => console.log('Authenticated?', this.username))
        .catch(console.error);
}

export async function getStdntCred() {
    let studentID = getId()
    console.log(studentID)
}

export function credExist() {
    //check if there is already a .env
    const fs = require("fs")
    let exists = fs.existsSync("./.env")
    //ask user for their login info and write to .env file
    if (!exists) {

    }
    //run the rest of the script
    loadMio()
}

// export async function loginUser() {
//     while (await checkCreds() == false) {
//         console.log('User credentials were invalid please check and try again')
//     }
//     console.log('User credentials validated\n')
//     loadMio();

// }

// async function checkCreds() {
//     const { BasicAuth } = require('enquirer');
//     const prompt = new BasicAuth({
//         name: 'password',
//         message: 'Please enter your student ID',
//         username: '1912607',
//         password: 'Mateodawson0831',
//         showPassword: false
//     });
//     return (prompt
//         .run()
//         .then((answer: boolean) => answer)
//         .catch(console.error))

// }