import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Produit } from 'src/app/modele/produit';
import { HttpService } from 'src/app/service/http.service';
import { ProduitsService } from 'src/app/service/produits.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  id: number = 0;
  constructor(private httpService: HttpService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params.id;
  }

  public produit: Produit | undefined;

  ngOnInit(): void {
    this.httpService.getProducts().subscribe(produits => {
      this.produit = produits.find(p => p.id_produit == this.id);
    });
    
  }

}
