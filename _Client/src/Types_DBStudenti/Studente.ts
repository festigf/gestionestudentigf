export class Studente{
    constructor(
        private matricola : number,
        private nome : string,
        private cognome : string,
        private email : string,
        private data_nascita : string,
        private comune_nascita : string,
        private telefono : string,
        private id_laurea : number
    ){
    }

    get Matricola() {return this.matricola;}
    get Nome() {return this.nome;}
    get Cognome() {return this.cognome;}
    get Email() {return this.email;}
    get Data_nascita() {return this.data_nascita;}
    get Comune_nascita() {return this.comune_nascita;}
    get Telefono() {return this.telefono;}
    get Id_laurea() {return this.id_laurea;}
}