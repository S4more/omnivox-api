import { NexusGenObjects as gql } from "../../nexus-typegen";
import { LeaManager, login } from "omnivox-crawler";
import { LeaClass } from "omnivox-crawler/build/types/LeaClass";

export class LeaCacheManager {
  userClasses: Map<String, LeaClass[]> = new Map();

  constructor() {
  }

  async build() {
  }

  public async addClassesFromUser(id: string, password: string) {
    await login(id, password);
    const leaManager = await LeaManager.build();
    const classes = await leaManager.getAllClasses()
    this.userClasses.set(id, classes);
  }

  public getClasses(id: string): LeaClass[] {
    return this.userClasses.get(id)!;
  }
}
