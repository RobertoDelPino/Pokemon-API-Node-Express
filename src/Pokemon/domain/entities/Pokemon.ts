export class Pokemon{
    constructor(id: number, name: string, height: number, weight: number) {
        this.id = id;
        this.name = name;
        this.height = height;
        this.weight = weight;
    }
    id: number;
    name: string;
    height: number;
    weight: number;
}