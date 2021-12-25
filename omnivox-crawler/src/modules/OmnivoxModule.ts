import request, {CoreOptions, UrlOptions} from "request";
import {IStringifyOptions} from "qs";
import {CookieManager} from "../CookieManager";
export interface Params {
    method: 'POST' | 'GET';
    url: string;
    cookie?: string;
    form?: any;
    followRedirect?: boolean,
    json?: boolean,
    qsStringifyOptions?: IStringifyOptions; 
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
        return new Promise<T>((resolve, reject) => {
            this.makeRequest(this.cookieManager.getCacheString())
                .once('complete', r => {
                    this.cookieManager.addCookies(r.headers["set-cookie"] || []);
                    try {
                        resolve(this.parse(r));
                    } catch (e) {
                        reject(e);
                    }
                });
        });
    }

    protected generateOptions(options: Params) {
        let headers = {
            cookie: options.cookie,
          };
          let config: CoreOptions & UrlOptions = {
              method: options.method,
              url: options.url,
              headers,
              followRedirect: options.followRedirect,
              json: options.json,
              qsStringifyOptions: options.qsStringifyOptions,
              qsParseOptions: options.qsStringifyOptions
              }

          if (options.json) {
              config['json'] = options.form;
          } else {
              config['form'] = options.form;
          }

          return config;
      }
}
