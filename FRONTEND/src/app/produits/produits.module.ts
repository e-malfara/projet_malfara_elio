import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ProduitState } from 'src/shared/states/produits-state';
import { PanierComponent } from './panier/panier.component';
import { DetailComponent } from './detail/detail.component';

const appChild: Routes = [
  {
    path: 'catalogueProduits',
    component: CatalogueComponent,
  },
  {
    path: 'listePanier',
    component: PanierComponent,
  },
  {
    path: 'detailProduit/:id',
    component: DetailComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appChild),
    ReactiveFormsModule,
    NgxsModule.forFeature([ProduitState]),
    FormsModule
  ],

  declarations: [
    CatalogueComponent,
    DetailComponent,
    PanierComponent,
  ],
})

export class ProduitsModule { }
