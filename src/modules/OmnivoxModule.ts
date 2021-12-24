import request from "request";
import {CookieManager} from "../CookieManager";
export interface Params {
    method: 'POST' | 'GET';
    url: string;
    cookie?: string;
    form?: any;
    followRedirect?: boolean
}

export abstract class OmnivoxModule<T> {
    protected abstract parse(request: request.Response): T;
    protected abstract getParams(cookie: string): Params;

    protected makeRequest(cookie: string): request.Request {
        const options = this.generateOptions(this.getParams(cookie));
        // The request needs to be bind to a callback to work. For some reason...
        const c = request(options, (_, __) => {}); 
        return c;
    }

    constructor(protected cookieManager: CookieManager) {
    }

    async get(): Promise<T> {
        return new Promise<T>(resolve => {
            this.makeRequest(this.cookieManager.getCacheString())
                .once('complete', r => {
                    this.cookieManager.addCookies(r.headers["set-cookie"] || []);
                    resolve(this.parse(r));
                });
        });
    }

    protected generateOptions(options: Params) {
        let headers = {
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
            'referer': options.url,
            'accept-language': 'en-GB,en;q=0.9',
            'host': 'dawsoncollege.omnivox.ca',
            connection: 'close',
            cookie: options.cookie,
          };
          let config = {
              method: options.method,
              url: options.url,
              headers,
              form: options.form,
              followRedirect: options.followRedirect
          }
          return config;

      }
}
