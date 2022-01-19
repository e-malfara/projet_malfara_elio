import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  formSignin!: FormGroup;
  message!: string;
  constructor(private formBuilder: FormBuilder, private httpService: HttpService) { }

  ngOnInit(): void {
    this.formSignin = this.formBuilder.group({
      nom: ["", [Validators.required]],
      prenom: ["", [Validators.required]],
      login: ["", [Validators.required]],
      mdp: ["", [Validators.required]]
    });
    this.message = "";
  }

  soumettre(): void{

    this.httpService.postRegister(this.formSignin.get("nom")?.value, this.formSignin.get("nom")?.value, this.formSignin.get("login")?.value, this.formSignin.get("mdp")?.value).subscribe(
      event =>{
        this.message = "Vous compte a bien été créer ! Vous pouvez dès à présent vous connecter"
        this.formSignin.get("nom")?.setValue("");
        this.formSignin.get("prenom")?.setValue("");
        this.formSignin.get("login")?.setValue("");
        this.formSignin.get("mdp")?.setValue("");
      },
      error => {
        this.message = error["error"]["error"];
      }
    );
  }

}
