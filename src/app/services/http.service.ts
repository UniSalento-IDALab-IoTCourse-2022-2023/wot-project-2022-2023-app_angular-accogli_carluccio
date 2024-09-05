// http.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { firstValueFrom, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}


  private _httpOptions: any = null

  private get httpOptions(): { headers: HttpHeaders, observe: 'response' } {
    if (!this._httpOptions) {
      this._httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.getTokenJWT()
        }),
        observe: 'response' as 'body' // Aggiungi questa linea per ottenere HttpResponse
      };
    }
    return this._httpOptions;
  }

  private mergeHeaders(additionalHeaders?: HttpHeaders): HttpHeaders {
    let headers = this.httpOptions.headers;
    if (additionalHeaders) {
      additionalHeaders.keys().forEach(key => {
        headers = headers.set(key, additionalHeaders.get(key) as string);
      });
    }
    return headers;
  }


  // Metodo generico per le richieste GET
  get<T>(url: string, headers?: HttpHeaders): Promise<T> {
    const options = { ...this.httpOptions, headers: this.mergeHeaders(headers) };
    return firstValueFrom(
      this.http.get<HttpResponse<T>>(url, options).pipe(
        map(response => response.body as T), // Estrarre il corpo della risposta
        catchError(error => this.handleError(error))
      )
    );
  }

  post<T>(url: string, body: any, headers?: HttpHeaders): Promise<T> {
    const options = { ...this.httpOptions, headers: this.mergeHeaders(headers) };
    return firstValueFrom(
      this.http.post<HttpResponse<T>>(url, body, options).pipe(
        map(response => response.body as T), // Estrarre il corpo della risposta
        catchError(error => this.handleError(error))
      )
    );
  }

  patch<T>(url: string, body: any, headers?: HttpHeaders): Promise<T> {
    const options = { ...this.httpOptions, headers: this.mergeHeaders(headers) };
    return firstValueFrom(
      this.http.patch<HttpResponse<T>>(url, body, options).pipe(
        map(response => response.body as T), // Estrarre il corpo della risposta
        catchError(error => this.handleError(error))
      )
    );
  }

  delete<T>(url: string, headers?: HttpHeaders): Promise<T> {
    const options = { ...this.httpOptions, headers: this.mergeHeaders(headers) };
    return firstValueFrom(
      this.http.delete<HttpResponse<T>>(url, options).pipe(
        map(response => response.body as T),
        catchError(error => this.handleError(error))
      )
    );
  }


  postWithoutAuthentication<T>(url: string, body: any, headers?: HttpHeaders): Promise<T> {
    // Creiamo un nuovo set di opzioni senza l'header Authorization
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(headers ? headers.keys().reduce((acc, key) => ({ ...acc, [key]: headers.get(key) as string }), {}) : {})
      }),
      observe: 'response' as 'body'
    };
    return firstValueFrom(
      this.http.post<HttpResponse<T>>(url, body, options).pipe(
        map(response => response.body as T), // Estrarre il corpo della risposta
        catchError(error => this.handleError(error))
      )
    );
  }

  private handleError(error: any) {
    console.error('Errore durante la richiesta HTTP:', error);
    return throwError(() => new Error(error.error.description));
  }

  private getTokenJWT(): string {
    return localStorage.getItem("jwt")!
  }
}
