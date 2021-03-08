import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, take } from 'rxjs/operators';
import { Arrival } from '../models/arrival';

/**
 * Arrival service using {@link HttpClient} and {@link HttpHeaders}
 */
@Injectable({
  providedIn: 'root'
})
export class SourceService {

  /** General URL for API requests */
  private arrivalUrl = 'https://api.stage.cargoking.co.uk/api/en/public/';

  /**
   * Constructor
   * @param {HttpClient} http Performs HTTP requests
   */
  constructor(private http: HttpClient) { }

  /**
   * Getting array of Arrival
   * @returns {Observable<Arrival[]>} request with array of Arrivals
   */
  getArrivals(sort?: string, page?: number, perPage?: number): Observable<[any]> {
    return this.http.get<[any]>(`${this.arrivalUrl}loads?sort[created_at]=${sort}&page=${page}&perPage=${perPage}`)
      .pipe(map(data => {
          let s = data['data'];
          console.log(s);
          return s;
      }),
      tap(x => x.length ?
            console.log(`found arrays "${x.lenght}"`) :
            console.log(`no arrays matching "${x}"`)),
      catchError(this.handleError<[Arrival[],any[]]>('getArrivals', [[],[]]))
    
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
