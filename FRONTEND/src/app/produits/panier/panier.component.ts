import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Produit } from 'src/app/modele/produit';
import {RemoveProduit, RemoveProduits } from 'src/shared/actions/produit-action';
import { ProduitState } from 'src/shared/states/produits-state';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  constructor(private store: Store) { }

  @Select(ProduitState.getListeProduits) liste$!: Observable<Produit[]>;
  ngOnInit(): void {
  }

  removeProduit(produit: Produit) {
    this.store.dispatch(new RemoveProduit(produit));
  }

  removeProduits() {
    this.store.dispatch(new RemoveProduits());
  }

}
