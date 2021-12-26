import {CookieManager} from "../CookieManager";
import {LeaCookie} from "../modules/lea/LeaCookie";
import {LeaSkyCookie} from "../modules/lea/LeaSkyCookie";
import {Lea} from "../modules/lea/Lea";
import {LeaClass} from "../types/LeaClass";
import {ClassDocumentSumary, LeaDocumentSummary} from "../modules/lea/LeaDocumentSummary";
import {Category, LeaClassDocument} from "../modules/lea/LeaClassDocuments";

export class LeaManager {
    private classesCache: LeaClass[] = [];
    private classesDocumentSummary: ClassDocumentSumary[] = [];

    private constructor(private cookieManager: CookieManager) {}

    async getClass(param: {teacher?: string, name?: string, code?: string}): Promise<LeaClass | undefined> {
        if (!this.isCacheLoaded()) await this.getAllClasses();
        if (param.teacher) return this.classesCache.find(c => c.teacher.toUpperCase().includes(param.teacher!.toUpperCase()));
        if (param.name) return this.classesCache.find(c => c.title.includes(param.name!.toUpperCase()));
        if (param.code) return this.classesCache.find(c => c.code === param.code!.toUpperCase());

    }

    async getAllClasses() {
        if (!this.isCacheLoaded()) {
            const classes = await new Lea(this.cookieManager).get();
            this.classesCache = classes;
        }
        return this.classesCache;
    }
    
    async getClassDocumentSummary() {
        if (this.classesDocumentSummary.length == 0) {
            this.classesDocumentSummary = await new LeaDocumentSummary(this.cookieManager).get();
        }
        return this.classesDocumentSummary;
    }

    async getClassDocumentList(href: string) {
        return await new LeaClassDocument(this.cookieManager, href).get();
    }

    private isCacheLoaded() {
        return (this.classesCache.length > 0);
    }

    static async build(loggedCookies: string[]): Promise<LeaManager> {
        const cookieManager = new CookieManager(loggedCookies);
        await new LeaCookie(cookieManager).get();
        await new LeaSkyCookie(cookieManager).get();
        const manager = new LeaManager(cookieManager);
        // The first page needs to be loaded...
        await manager.getAllClasses();
        return manager;
    }
}
