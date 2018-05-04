export class ConoscenzaLingue{
    constructor(
        private nome : string,
        private matricola_studente : number,  
        private id_lingua : number,
        private scritto : number,
        private orale : number,
    ){
    }

    get Matricola_studente() {return this.matricola_studente;}
    get Nome() {return this.nome;}
    get Id_lingua() {return this.id_lingua;}
    get Scritto() {return this.scritto;}
    get Orale() {return this.orale;}
}