export class LeaLoginError extends Error {
    constructor(args: string) {
        super(args);
        this.name = "LeaLoginError";
    }
}
