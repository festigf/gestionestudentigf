export class Corso{
    constructor(
        private sigla : string,
        private titolo : string,
        private id_docente : number,
        private ssd : string,
        private cfu : string,
        private nome : string,
    ){
    }

    get Sigla() {return this.sigla;}
    get Titolo() {return this.titolo;}
    get Id_docente() {return this.id_docente;}
    get Ssd() {return this.ssd;}
    get Cfu() {return this.cfu;}
    get Nome() {return this.nome;}
}