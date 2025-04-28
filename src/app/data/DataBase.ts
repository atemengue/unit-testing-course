import { generateRandomId } from "./IdGenerator";

export type User = {
    id: string;
    name: string;
    email: string;
    [key: string]: any; // Add an index signature to allow string indexing
};

export class DataBase {
    private elements : Array<User>;

    constructor() {
        this.elements = new Array<User>();
    }

    public async insert(arg: User) {
        arg.id = generateRandomId();
        this.elements.push(arg);
        return arg.id;
    }

    public async getBy(argName: string, argValue: string) {
        return this.elements.find(x => x[argName] === argValue);
    }

    public async findAllBy(argName: string, argValue: string) {
        return this.elements.filter(x => x[argName] === argValue);
    }

    public async update(id: string, argName: string, argValue: any) {
        const index = this.elements.findIndex(x => x.id === id);
        if (index !== -1) {
            this.elements[index][argName] = argValue;
        }
    }

    public async delete(id: string) {
        const index = this.elements.findIndex(x => x.id === id);
        if (index !== -1) {
            this.elements.splice(index, 1);
        }
    }

    public async getAllElements() {
        return this.elements;
    }
}