export class CookieManager {
    private cookie: Map<string, string> = new Map();

    constructor(cookie?: string[]) {
        this.setCache(cookie || []);
    }

    getCacheString(): string {
        return [...this.cookie.values()].join('; ');
    }

    getCache(): string[] {
        return [...this.cookie.values()];
    }

    public getCookieByName(s: string) {
        return this.cookie.get(s);
    }

    private setCache(cookie: string[]) {
        cookie.forEach(c => {
            const key = c.substring(0, c.search("="));
            this.cookie.set(key, c);
        })
    }

    addCookies(cookie: string[]) {
        this.setCache(cookie);
    }

}
