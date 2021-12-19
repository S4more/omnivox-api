import request, {Headers, Response} from "request";

// This works. alright.
var options: any = {
  'method': 'POST',
  'url': 'https://dawsoncollege.omnivox.ca/intr/Module/Identification/Login/Login.aspx',
  'headers': {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'content-type': 'application/x-www-form-urlencoded',
    'authority': 'dawsoncollege.omnivox.ca',
    'cache-control': 'max-age=0',
    'sec-ch-ua': '"Chromium";v="95", ";Not A Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Linux"',
    'upgrade-insecure-requests': '1',
    'origin': 'https://dawsoncollege.omnivox.ca',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-user': '?1',
    'sec-fetch-dest': 'document',
    'referer': 'https://dawsoncollege.omnivox.ca/Login/Account/Login?ReturnUrl=%2fintr',
    'accept-language': 'en-GB,en;q=0.9',
    'host': 'dawsoncollege.omnivox.ca',
    'connection': 'close'
  },
  form: {
    'StatsEnvUsersNbCouleurs': '24',
    'StatsEnvUsersResolution': '647',
    'TypeLogin': 'PostSolutionLogin',
    'TypeIdentification': 'Etudiant',
    'ReturnUrl': '/intr',
    'NoDA': 'id',
    'PasswordEtu': 'password'
  }
};

/**
 * This is returning a string array for the cache but I'm not sure about how I want it to work.
 * The next step is loading a MIO, I guess.
 * I'm almost giving up tho. I HATE how every single request contains a bunch of HTML stuff.
 * Maybe we should use python or another language where it's easier to parse HTML.
 * I shouldn't say it out loud but maybe PHP......
 */
export async function login(k: string, cookie: string, id: string, password: string): Promise<string[]> {
    options['headers']['cookie'] = cookie; 
    options['form']['k'] = k;
    options['form']['NoDA'] = id;
    options['form']['PasswordEtu'] = password;


    const promise: Promise<string[]> = new Promise((resolve, reject) => {
        request(options, (_: any, response: Response) => { 
            if (response.headers["set-cookie"]) {
                resolve(response.headers["set-cookie"]);
            } else {
                resolve([]);
            }
        });
    });
    return promise;
}

function loadMio() {
}

