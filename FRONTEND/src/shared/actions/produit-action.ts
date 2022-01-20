import { Produit } from 'src/app/modele/produit';

export class AddProduit {
  static readonly type = '[Produit] Add';

  constructor(public payload: Produit) {}
}

export class RemoveProduit {
  static readonly type = '[Produit] Remove';

  constructor(public payload: Produit) {}
}

export class RemoveProduits {
  static readonly type = '[Produit] RemoveAll';

  constructor() {}
}
