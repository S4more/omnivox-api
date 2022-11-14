import {LeaCookie} from "../modules/lea/LeaCookie";
import {Lea} from "../modules/lea/Lea";
import {LeaClass} from "../types/LeaClass";
import {ClassDocumentSumary, LeaDocumentSummary} from "../modules/lea/LeaDocumentSummary";
import {LeaClassDocument} from "../modules/lea/LeaClassDocuments";

export class LeaManager {
    private classesCache: LeaClass[] = [];
    private classesDocumentSummary: ClassDocumentSumary[] = [];

    async getClass(param: {teacher?: string, name?: string, code?: string}): Promise<LeaClass | undefined> {
        if (!this.isCacheLoaded()) await this.getAllClasses();
        if (param.teacher) return this.classesCache.find(c => c.teacher.toUpperCase().includes(param.teacher!.toUpperCase()));
        if (param.name) return this.classesCache.find(c => c.title.includes(param.name!.toUpperCase()));
        if (param.code) return this.classesCache.find(c => c.code === param.code!.toUpperCase());

    }

    async getAllClasses() {
        if (!this.isCacheLoaded()) {
            const classes = await new Lea().getClasses();
            this.classesCache = classes;
        }
        return this.classesCache;
    }
    
    async getClassDocumentSummary() {
        if (this.classesDocumentSummary.length == 0) {
            this.classesDocumentSummary = await new LeaDocumentSummary().getSummaries();
        }
        return this.classesDocumentSummary;
    }

    async getClassDocumentListByHref(href: string) {
        return await new LeaClassDocument(href).getDocument();
    }

    private isCacheLoaded() {
        return (this.classesCache.length > 0);
    }

    static async build(): Promise<LeaManager> {
        await new LeaCookie().run();
        // await new LeaSkyCookie().run();
        const manager = new LeaManager();
        await manager.getAllClasses();
        return manager;
    }
}
