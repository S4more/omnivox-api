import console from "console";

async function getCred() {
    const { prompt } = require('enquirer');
    const question = [
        {
            type: 'input',
            name: 'username',
            message: 'What is your student ID?'
        },
        {
            type: 'password',
            name: 'password',
            message: 'What is your password?'
        }
    ];
    let answers = await prompt(question);
    //concatinate the two strings into one
    let str = "user_name=" + answers["username"] + "\npassword=" + answers["password"]
    return str;

}

export async function loginUser() {
    const fs = require("fs")
    //check if there is already a .env
    let exists = fs.existsSync("./.env")

    //ask user for their login info and write to .env file
    if (!exists) {
        console.log(".env file not found")
        let cred = await getCred()
        const fs = require('fs')

        fs.writeFile('./.env', cred, (err: any) => {
            if (err) {
                console.error(err)
                return
            }
            //file written successfully
            console.log(".env file written successfully")
        })
    }else{
        console.log(".env file found")
    }
}
