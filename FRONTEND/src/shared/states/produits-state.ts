import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddProduit, RemoveProduit, RemoveProduits } from '../actions/produit-action';
import { ProduitStateModel } from './produit-state-model';

@State<ProduitStateModel>({
  name: 'produits',
  defaults: {
    produits: [],
  },
})
@Injectable()
export class ProduitState {
  @Selector()
  static getNbProduits(state: ProduitStateModel) {
    return state.produits.length;
  }
  @Selector()
  static getListeProduits(state: ProduitStateModel) {
    return state.produits;
  }

  @Action(AddProduit)
  add(
    { getState, patchState }: StateContext<ProduitStateModel>,
    { payload }: AddProduit
  ) {
    const state = getState();
    patchState({
      produits: [...state.produits, payload],
    });
  }
  @Action(RemoveProduit)
  remove(
    { getState, patchState }: StateContext<ProduitStateModel>,
    { payload }: RemoveProduit
  ) {
    const state = getState();
    let etatProduit = state.produits;
    etatProduit.splice(etatProduit.indexOf(payload), 1);
    patchState({
        produits: etatProduit
    });
  }
  @Action(RemoveProduits)
  removeAll(
    { patchState }: StateContext<ProduitStateModel>
  ) {
    patchState({
        produits: []
    });
  }
}
