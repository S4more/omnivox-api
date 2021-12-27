export default async function login(username:string, password:string):Promise<string> {
	return new Promise((res, rej) => {
		fetch('http://localhost:1337', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				query: `
				mutation Login($username:String!, $password:String!) {
					login (
						id: $username,
						password: $password
					) {
						token
					}
				}`,
				variables: {
					username,
					password
				},
			}),
		})
		.then((result) => result.json())
		.then((data) => res(data.data.login.token)).catch(err => rej(err));
	})
}