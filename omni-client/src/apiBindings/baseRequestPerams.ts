export const contentTypes = {
	URLENCODED: 'application/x-www-form-urlencoded;charset=UTF-8',
	JSONDATA: 'TO FILL'
}


export default function baseRequestPerams(method:"POST" | "GET", contentType?:string, body?:string):RequestInit {
	let headers = {
		'Cookie': document.cookie,
	}
	
	const dat:RequestInit = { 
		method: method,
		credentials: 'same-origin',
		cache: 'no-cache',
		mode:"cors",
		headers: {
			'Cookie': document.cookie,
		}
	}
	if(contentType) 
		// SORRY
		(dat.headers as unknown as any)["Content-Type"] = contentType;
	if(body){
		dat.body = body;
	}
	return dat;
}

