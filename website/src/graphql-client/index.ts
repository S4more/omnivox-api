const URL = "http://localhost:1337/"

const headers = {'Content-Type': 'application/json'}

export default class APIRequest<VarsType, ReturnType> {
	constructor(private query:string, private method:"POST" | "GET") {};

	async execute(vars:VarsType):Promise<ReturnType> {
    const response = await fetch(URL, {
      method: this.method,
      headers,
      body: JSON.stringify({query: this.query, variables: vars})
    });

    const data = (await response.json())["data"];

    // Returns the first key withotu creating an entire object.
    for (let entry in data) {
      return data[entry];
    }

	}
}

