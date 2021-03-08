import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, take } from 'rxjs/operators';
import { Arrival } from '../models/arrival';

/**
 * Order service using {@link HttpClient} and {@link HttpHeaders}
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
   * Getting array of Orders
   * @returns {Observable<Arrival[]>} request with array of Arrivals
   */
  getArrivals(): Observable<[any]> {
    return this.http.get<[any]>(this.arrivalUrl + 'loads?sort%5Bcreated_at%5D=desc&page=1&perPage=15')
      .pipe(map(data => {
          let s = data['data'].slice(0,5);
          console.log(s);
          return s;
      }),
      tap(x => x.length ?
            console.log(`found heroes matching "${x.lenght}"`) :
            console.log(`no heroes matching "${x}"`)),
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
