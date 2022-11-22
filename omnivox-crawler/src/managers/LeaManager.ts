import getLeaCookie from "../modules/lea/LeaCookie";
import getLeaClasses from "../modules/lea/Lea";
import {LeaClass} from "../types/LeaClass";
import getLeaDocumentSummary, {ClassDocumentSumary} from "../modules/lea/LeaDocumentSummary";
import getLeaClassDocument, { Category as DocumentCategory} from "../modules/lea/LeaClassDocuments";

export class LeaManager {
  private classesCache: LeaClass[] = [];
  private classesDocumentSummary: ClassDocumentSumary[] = [];
  private classDocumentMap: Map<string, DocumentCategory[]> = new Map();

  async getClass(param: {teacher?: string, name?: string, code?: string}): Promise<LeaClass | undefined> {
    if (!this.isCacheLoaded()) await this.getAllClasses();
    if (param.teacher) return this.classesCache.find(c => c.teacher.toUpperCase().includes(param.teacher!.toUpperCase()));
    if (param.name) return this.classesCache.find(c => c.title.includes(param.name!.toUpperCase()));
    if (param.code) return this.classesCache.find(c => c.code === param.code!.toUpperCase());

  }

  async getAllClasses() {
    if (!this.isCacheLoaded()) {
      const classes = await getLeaClasses();
      this.classesCache = classes;
    }
    return this.classesCache;
  }

  async getClassDocuments(name: string) {
    if (!this.classDocumentMap.has(name))
      throw new Error(`Couldn't find ${name} in classes. The classes you are enroled in are ${this.classDocumentMap.keys()}`);
    return this.classDocumentMap.get(name);
  }

  private async getClassDocumentSummary() {
    if (this.classesDocumentSummary.length == 0) {
      this.classesDocumentSummary = await getLeaDocumentSummary();
      this.classesDocumentSummary.forEach(async summary => {
        this.classDocumentMap.set(summary.name, await getLeaClassDocument(summary.href));
      });
    }
    return this.classesDocumentSummary;
  }

  async getClassDocumentListByHref(href: string) {
    return await getLeaClassDocument(href);
  }

  private isCacheLoaded() {
    return (this.classesCache.length > 0);
  }

  static async build(): Promise<LeaManager> {
    await getLeaCookie();
    // await new LeaSkyCookie().run();
    const manager = new LeaManager();
    await manager.getAllClasses();
    await manager.getClassDocumentSummary();
    

    return manager;
  }
}
