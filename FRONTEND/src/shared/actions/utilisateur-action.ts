import { Utilisateur } from "../modeles/Utilisateur";


export class AddUtilisateur {
  static readonly type = '[Utilisateur] Add';

  constructor(public payload: Utilisateur) {}
}

export class RemoveUtilisateur {
  static readonly type = '[Utilisateur] Remove';

  constructor() {}
}
