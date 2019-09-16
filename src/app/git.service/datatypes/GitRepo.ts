export class GitRepo {
    name: string = ""
    path: string = ""
    type: number = 0

    constructor(name: string, path: string, type?: number)
    {
        this.name = name;
        this.path = path;
        this.type = type || 0;
    }
}