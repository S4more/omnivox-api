export class Cache<K> {
    private readonly info: Map<string, K> = new Map();

    get(identifier: string): K | undefined {
        return this.info.get(identifier);
    }
}
