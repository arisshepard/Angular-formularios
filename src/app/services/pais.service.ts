import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pais } from '../models/pais.model';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  constructor(private http: HttpClient) {}

  // getPaises(): Observable<any> {
  //   return this.http.get('https://restcountries.eu/rest/v2/lang/es').pipe(
  //     map((paises: any[]) =>
  //       paises.map((pais) => ({
  //         nombre: pais.name,
  //         codigo: pais.alpha3Code,
  //       }))
  //     )
  //   );
  // }

  getPaises(): Observable<Pais[]> {
    return this.http
      .get('https://restcountries.eu/rest/v2/lang/es')
      .pipe(
        map((paises: any[]) =>
          paises.map((paisData) => new Pais(paisData.name, paisData.alpha3Code))
        )
      );
  }
}
