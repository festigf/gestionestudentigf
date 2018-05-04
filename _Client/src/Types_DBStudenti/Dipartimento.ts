export class Dipartimento{
    constructor(
        private id : number,
        private nome : string
    ){
    }

    get Id() {return this.id;}
    get Nome() {return this.nome;}
}