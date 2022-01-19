import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../modele/produit';
import { environment } from '../environments/environment';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  constructor(private httpClient: HttpClient) { }

  public getProduits(): Observable<Array<Produit>> {
    return this.httpClient.get<Array<Produit>>(environment.baseUrl);
  }

  public getProduit(id: number): Observable<Produit>{
    return this.getProduits().pipe(map(produits => produits.filter((produit?: Produit) => produit!.id_produit == id)[0])
    );
}
}
