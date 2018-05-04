import { Injectable } from '@angular/core';
import { Studente } from '../Types_DBStudenti/Studente';
import { Dipartimento } from '../Types_DBStudenti/Dipartimento';
import { Docente } from '../Types_DBStudenti/Docente';
import { Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { StudenteCompleto } from '../Types_DBStudenti/StudenteCompleto';
import { Scuola } from '../Types_DBStudenti/Scuola';
import { ConoscenzaLingue } from '../Types_DBStudenti/ConoscenzaLingue';
import { Corso } from '../Types_DBStudenti/Corso';

@Injectable()
export class ServiceDbStudentiService {
  constructor(private http: HttpClient) { }

  //#region TabellaStudenti

  // GET STUDENTI
  getStudenti(): Observable<Studente[]> {
    return this.http
      .get("http://localhost:3000/listStudenti")
      .map(res => res as Studente[]);
  }

  // GETDATA STUDENTI 
  getData(pageIndex, pageSize): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('pageIndex', pageIndex)
      .set('pageSize', pageSize);

    const options = {
      headers,
      params
    };
    return this.http
      .get("http://localhost:3000/GetStudenti", options)
      .map(res => res);
  }

  // DELETE STUDENTI
  delStudenti(matricola: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('matricola', matricola.toString());
    const options = {
      headers,
      params
    };
    return this.http.delete("http://localhost:3000/delStudente", options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }

  // MODIFICA - INSERIMENTO STUDENTE
  modInStudenti(Studente: Studente): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('Matricola', Studente.Matricola.toString())
      .set('Nome', Studente.Nome)
      .set('Cognome', Studente.Cognome)
      .set('Email', Studente.Email)
      .set('Data_nascita', Studente.Data_nascita.toString())
      .set('Comune_nascita', Studente.Comune_nascita)
      .set('Telefono', Studente.Telefono)
      .set('Id_laurea', Studente.Id_laurea.toString());
    const options = {
      headers,
      params
    };
    return this.http.put("http://localhost:3000/ModStudente", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }

  //#endregion


  //#region TabellaDocenti

  // GET STUDENTI
  getDocenti(): Observable<Docente[]> {
    return this.http
      .get("http://localhost:3000/listDocenti")
      .map(res => res as Docente[]);
  }

  getDocentiParz(): Observable<any[]> {
    return this.http
      .get("http://localhost:3000/listDocentiParz")
      .map(res => res as any[]);
  }

  delDocenti(Id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('Id', Id.toString());
    const options = {
      headers,
      params
    };
    return this.http.delete("http://localhost:3000/delDocente", options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }

  // MODIFICA - INSERIMENTO Docente
  modInDocenti(Docente: Docente): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('Id', Docente.Id.toString())
      .set('Nome', Docente.Nome)
      .set('Cognome', Docente.Cognome)
      .set('Email', Docente.Email)
    const options = {
      headers,
      params
    };
    return this.http.put("http://localhost:3000/ModDocente", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }

  // Tutte info Studente
  getInformazioniStudente(Matricola: number): Observable<StudenteCompleto[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('Matricola', Matricola.toString());
    const options = {
      headers,
      params
    };
    return this.http.get("http://localhost:3000/MostraTuttoStudente", options)
      .map(res => res as StudenteCompleto[]);
  }

  //#endregion


  //#region TabellaDipartimenti

  // GET DIPARTIMENTI
  getDipartimenti(): Observable<Dipartimento[]> {
    return this.http
      .get("http://localhost:3000/listDipartimenti")
      .map(res => res as Dipartimento[]);
  }

  delDipartimenti(Id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('Id', Id.toString());
    const options = {
      headers,
      params
    };
    return this.http.delete("http://localhost:3000/delDipartimento", options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }

  modInDipartimenti(Dipartimento: Dipartimento): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('Id', Dipartimento.Id.toString())
      .set('Nome', Dipartimento.Nome)
    const options = {
      headers,
      params
    };
    return this.http.put("http://localhost:3000/ModDipartimento", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }
  //#endregion

  //#region TabellaScuola

  // GET Scuola
  getScuola(): Observable<Scuola[]> {
    return this.http
      .get("http://localhost:3000/ListScuole")
      .map(res => res as Scuola[]);
  }

  delScuole(Id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('Id', Id.toString());
    const options = {
      headers,
      params
    };
    return this.http.delete("http://localhost:3000/delScuola", options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }

  modInScuola(scuola: Scuola): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('Id', scuola.Id.toString())
      .set('Nome', scuola.Nome)
      .set('Citta', scuola.Citta)
      .set('Titolo', scuola.Titolo)
    const options = {
      headers,
      params
    };
    return this.http.put("http://localhost:3000/ModScuola", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }
  //#endregion

  //#region Lingue

  // GET ConoscenzaLingue
  getConoscenzaLingue(Matricola : number): Observable<ConoscenzaLingue[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('Matricola', Matricola.toString());
    const options = {
      headers,
      params
    };
    return this.http
      .get("http://localhost:3000/listConoscenzaLingue", options)
      .map(res => res as ConoscenzaLingue[]);
  }

  getLingue(Stringa : string, Matricola : number) : Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('Stringa', Stringa.toString())
      .set('Matricola', Matricola.toString())
    const options = {
      headers,
      params
    };
    return this.http
      .get("http://localhost:3000/listLingue", options)
      .map(res => res as any[]) ;
  }

  InsLingua(Matricola : number, Id_lingua : number, Orale : number, Scritto : number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('Matricola', Matricola.toString())
      .set('Id_lingua', Id_lingua.toString())
      .set('Scritto', Scritto.toString())
      .set('Orale', Orale.toString())
    const options = {
      headers,
      params
    };
    return this.http.put("http://localhost:3000/InsLingua", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }

  DelLingua(Matricola : number, Id_lingua : number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('Matricola', Matricola.toString())
      .set('Id_lingua',Id_lingua.toString());
    const options = {
      headers,
      params
    };
    return this.http.delete("http://localhost:3000/delLingua", options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }
  //#endregion


  //#region Corsi
  getCorsi(): Observable<Corso[]> {
    return this.http
      .get("http://localhost:3000/listCorsi")
      .map(res => res as Corso[]);
  }

  delCorsi(Sigla: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('Sigla', Sigla);
    const options = {
      headers,
      params
    };
    return this.http.delete("http://localhost:3000/delCorso", options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }
  
  modInCorso(Corso : Corso): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams()
      .set('Sigla', Corso.Sigla)
      .set('Titolo', Corso.Titolo)
      .set('Id_docente', Corso.Id_docente.toString())
      .set('Ssd', Corso.Ssd)
      .set('Cfu', Corso.Cfu)
    const options = {
      headers,
      params
    };
    return this.http.put("http://localhost:3000/ModCorso", null, options)
      .map((response: Response) => response)
      .catch(this.handleError);
  }

  //#endregion


  //#region Esami
    getEsamiStudente(Matricola : number): Observable<any[]> {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('Matricola', Matricola.toString());
      const options = {
        headers,
        params
      };
        return this.http
          .get("http://localhost:3000/listEsamiStudente", options)
          .map(res => res as any[]);
      }

      DelEsame(Matricola : number, Sigla : string): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        const params = new HttpParams()
          .set('Matricola', Matricola.toString())
          .set('Sigla',Sigla);
        const options = {
          headers,
          params
        };
        return this.http.delete("http://localhost:3000/delEsame", options)
          .map((response: Response) => response)
          .catch(this.handleError);
      }

      getEsami(Stringa : string, Matricola : number) : Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        const params = new HttpParams()
          .set('Stringa', Stringa.toString())
          .set('Matricola', Matricola.toString())
        const options = {
          headers,
          params
        };
        return this.http
          .get("http://localhost:3000/listEsami", options)
          .map(res => res as any[]) ;
      }

      InsEsame(Matricola : number, Sigla : string, Voto : number): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        const params = new HttpParams()
          .set('Matricola', Matricola.toString())
          .set('Sigla', Sigla)
          .set('Voto', Voto.toString())
        const options = {
          headers,
          params
        };
        return this.http.put("http://localhost:3000/InsEsame", null, options)
          .map((response: Response) => response)
          .catch(this.handleError);
      }

  //#endregion

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
