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
