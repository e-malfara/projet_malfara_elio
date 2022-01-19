import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { Utilisateur } from 'src/shared/modeles/Utilisateur';
import { Produit } from '../modele/produit';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  URL_API_LOGIN: string = "/api/login" as const;
  URL_API_AUTH: string = "/api/auth/" as const;
  URL_API_REGISTER: string = "/api/register" as const;
  URL_API_PRODUCTS: string = "/api/getProducts" as const;

  constructor(private http: HttpClient) { }

  // On obtient un JWT
  public postLogin(login: string, mdp: string) : Observable<Utilisateur>{
    let data: string = "login=" + login + "&mdp=" + mdp;
    let httpOptions = {
      headers: new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"})
    };
    return this.http.post<Utilisateur>(this.URL_API_LOGIN, data, httpOptions);
  }

  public getLogin(login: string) : Observable<Utilisateur> {
    let data: string = "login=" + login;
    return this.http.get<Utilisateur>(this.URL_API_AUTH + login);
  }

  public postRegister(nom: string, prenom: string, login: string, mdp: string) : Observable<any>{
    let data: string = "nom=" + nom + "&prenom=" + prenom + "&login=" + login + "&mdp=" + mdp;
    let httpOptions = {
      headers: new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"})
    };
    return this.http.post<any>(this.URL_API_REGISTER, data, httpOptions);
  }

  public getProducts() : Observable<Array<Produit>>{
    return this.http.get<Array<Produit>>(this.URL_API_PRODUCTS);
  }
}
