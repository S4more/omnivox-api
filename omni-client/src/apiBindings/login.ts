import apiPath from "./basePath";
import baseRequestPerams from "./baseRequestPerams";
import { contentTypes } from "./baseRequestPerams";



export default async function login(username:string, password:string):Promise<string> {
	const payload = `username=${username}&password=${password}`;
	return new Promise((res, rej) => {
		fetch(`${apiPath}/login`, baseRequestPerams("POST", contentTypes.URLENCODED, payload)).then(response => {
			response.json().then(data => {
				if(typeof data == "object") {
					rej(data.name);
				} else {
					let vals = response.headers.keys()
					let val;
					while((val = vals.next()).done == false) {
						console.log(val);
					}
					console.log(data);
				}
			})
		})
	})
}