import store from "@/store";

export default async function getLeaClass():Promise<any> {
	return new Promise((res, rej) => {
		console.log("Auth", store.getters.getAuthToken)
		fetch('http://localhost:1337', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json', 
				'Authorization' :`Bearer ${store.getters.getAuthToken}`
			},
			body: JSON.stringify({
				query: `query {
					leaClass (
						lookUpType:CODE,
						search: ""
					) {
						code,
						number,
						schedule,
						section,
						teacher,
						title
					}
				}`
			})
		})
		.then((result) => result.json())
		.then((data) => res(data.data)).catch(err => rej(err));
	})
}