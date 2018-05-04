export class Scuola{
    constructor(
        private id : number,
        private nome : string,
        private citta : string,
        private titolo : string
    ){
    }

    get Id() {return this.id;}
    get Nome() {return this.nome;}
    get Citta() {return this.citta;}
    get Titolo() {return this.titolo;}
}