export class Cache<K> {
    readonly info: Map<string, K> = new Map();

    getInfo(identifier: string): K | undefined {
        return this.info.get(identifier);
    }
}
