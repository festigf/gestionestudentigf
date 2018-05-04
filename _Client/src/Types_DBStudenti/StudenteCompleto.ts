export class StudenteCompleto{
    constructor(
        private matricola : number,
        private nome : string,
        private cognome : string,
        private email : string,
        private data_nascita : string,
        private comune_nascita : string,
        private telefono : string,
        private nomeCorsoLaurea : string,
        private votoScuolaSuperiore : string,
        private nomeScuola : string,
        private cittaScuola : string,
        private indirizzo : string,
    ){
    }

    get Matricola() {return this.matricola;}
    get Nome() {return this.nome;}
    get Cognome() {return this.cognome;}
    get Email() {return this.email;}
    get Data_nascita() {return this.data_nascita;}
    get Comune_nascita() {return this.comune_nascita;}
    get Telefono() {return this.telefono;}
    get NomeCorsoLaure() {return this.nomeCorsoLaurea;}
    get VotoScuolaSuperiore() {return this.votoScuolaSuperiore;}
    get NomeScuola(){return this.nomeScuola;}
    get CittàScuola(){return this.cittaScuola;}
    get Indirizzo(){return this.indirizzo;}

}