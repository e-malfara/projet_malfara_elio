import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/service/http.service';
import { AddUtilisateur, RemoveUtilisateur } from 'src/shared/actions/utilisateur-action';
import { Utilisateur } from 'src/shared/modeles/Utilisateur';
import { UtilisateurState } from 'src/shared/states/utilisateur-state';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  formLogin!: FormGroup;
  utilisateur$!: Observable<Utilisateur>;
  @Select(UtilisateurState.getLoginUtilisateur) login$!: Observable<string>;
  message!: string;
  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private store: Store) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      login: ["", [Validators.required]],
      mdp: ["", [Validators.required]]
    });
  }

  soumettre(): void{
    this.httpService.postLogin(this.formLogin.get("login")?.value, this.formLogin.get("mdp")?.value).subscribe(
      event =>{
        this.utilisateur$ = this.httpService.getLogin(this.formLogin.get("login")?.value);
        this.utilisateur$.subscribe(u => {
          this.store.dispatch(new AddUtilisateur(u));
        });
        this.message = "";
      },
      error => {
        this.message = error["error"]["error"];
      }
    );
  }

  removeUtilisateur(){
    this.store.dispatch(new RemoveUtilisateur());
  }
}
