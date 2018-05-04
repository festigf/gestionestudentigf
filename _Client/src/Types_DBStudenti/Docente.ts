export class Docente{
    constructor(
        private id : number,
        private nome : string,
        private cognome : string,
        private email : string
    ){
    }

    get Id() {return this.id;}
    get Nome() {return this.nome;}
    get Cognome() {return this.cognome;}
    get Email() {return this.email;}
}