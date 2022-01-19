import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { HttpService } from 'src/app/service/http.service';
import { AddProduit } from 'src/shared/actions/produit-action';
import { Produit } from '../../modele/produit';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  rechercher: string = "";
  constructor(private httpService: HttpService, private store: Store) { }

  public listeProduits!: Produit[];

  ngOnInit(): void {
    this.httpService.getProducts().subscribe(produits => {
      this.listeProduits = produits;
    });
  }

  addProduit(produit: Produit) {
    this.store.dispatch(new AddProduit(produit));
  }
  
  filtrerListe(event: any){

    this.httpService.getProducts().subscribe(produits => {
      this.listeProduits = produits.filter( p => p.nom.toLowerCase().includes(event.target.value.toLowerCase()));
    });

  }

}
