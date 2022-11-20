import URL from "../url";

const headers = {'Content-Type': 'application/json'}

export default class APIRequest<VarsType, ReturnType> {
	constructor(private querry:string, private method:"POST" | "GET") {};
	execute(vars:VarsType):Promise<ReturnType> {
		return new Promise((res, rej) => {
			fetch(URL, {
				method:this.method,
				headers: headers,
				body: JSON.stringify({
					query: this.querry,
					variables: vars,
				})
			})
			.then(result => result.json())
			.then(data => {
				for(let i in data.data){
					res(data.data[i]);
				}
			})
			.catch(err => rej(err));
		})
	}
}
