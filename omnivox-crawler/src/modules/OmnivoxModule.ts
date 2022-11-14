import request, {CoreOptions, UrlOptions} from "request";

import axios  from "axios";
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

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

export type GetRequestParams = {
  url: string;
  query?: string;
}

export type PostRequestParams = {
  url: string;
  body: unknown;
}

const jar = new CookieJar();
const client = wrapper(axios.create({ jar, withCredentials: true }));

export abstract class OmnivoxModule<T> {
  async makeGetRequest(params: GetRequestParams) {
    const response = await client.get(params.url);
    return response;
  }

  async makePostRequest(params: PostRequestParams, isJson = false) {
    const response = await client.post(params.url, params.body, {
      headers: {
        'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
        'Content-Type': isJson ? "application/json" : "application/x-www-form-urlencoded"
      }
    });
    return response;
  }
}
