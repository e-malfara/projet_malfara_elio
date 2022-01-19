import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProduitState } from 'src/shared/states/produits-state';
import { UtilisateurState } from 'src/shared/states/utilisateur-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  @Select(ProduitState.getNbProduits) nb$!: Observable<number>;
  @Select(UtilisateurState.getLoginUtilisateur) login$!: Observable<string>;
}
