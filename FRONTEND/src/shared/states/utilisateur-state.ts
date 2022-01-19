import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddUtilisateur, RemoveUtilisateur } from '../actions/utilisateur-action';
import { Utilisateur } from '../modeles/Utilisateur';
import { UtilisateurStateModel } from './utilisateur-state-model';

@State<UtilisateurStateModel>({
  name: 'utilisateur',
  defaults: {
    utilisateur: null!,
  },
})
@Injectable()
export class UtilisateurState {
  @Selector()
  static getLoginUtilisateur(state: UtilisateurStateModel) {
    return state.utilisateur.login;
  }

  @Action(AddUtilisateur)
  add(
    { patchState }: StateContext<UtilisateurStateModel>,
    { payload }: AddUtilisateur
  ) {
    patchState({
        utilisateur: payload,
    });
  }

  @Action(RemoveUtilisateur)
  remove(
    { patchState }: StateContext<UtilisateurStateModel>,
  ) {
    patchState({
        utilisateur: null!,
    });
  }
}
