const baseUrl = "http://localhost:1337/api/"

const URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8';
const JSONDATA = 'TO FILL'


function getBasePerams(method:string, contentType:string, body:string):RequestInit {
	return {
		method: method,
		credentials: 'same-origin',
		cache: 'no-cache',
		mode:"cors",
		headers: {
			'Content-Type': contentType
		},
		body:body
	}
}


export function makeLoginRequest(username:string, password:string){
	const path = "login";
	const payload = `username=${username}&password=${password}`;
	return fetch(baseUrl + path, getBasePerams("POST", URLENCODED, payload));
}