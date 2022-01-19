import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LiensComponent } from './liens/liens.component';
import { RouterModule, Routes } from '@angular/router';
import { ProduitState } from 'src/shared/states/produits-state';
import { NgxsModule } from '@ngxs/store';
import { ApiHttpInterceptor } from './interceptor/apihttp.interceptor';
import { UtilisateurState } from 'src/shared/states/utilisateur-state';

const appRoutes: Routes = [
  {
    path: 'produits',
    loadChildren: () =>
      import('./produits/produits.module').then((m) => m.ProduitsModule),
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('./contacts/contacts.module').then((m) => m.ContactsModule),
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LiensComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot([ProduitState]),
    NgxsModule.forRoot([UtilisateurState]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
