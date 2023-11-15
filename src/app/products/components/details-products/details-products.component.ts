import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-details-products',
  templateUrl: './details-products.component.html',
  styleUrls: ['./details-products.component.sass'],
})
export class DetailsProductsComponent implements OnInit {
  id: any;
  data: any;
  loading: boolean = false;
  constructor(private service: ProductsService, private route: ActivatedRoute) {
    // activated route pour recuperer l 'id de l'url
    this.id = this.route.snapshot.paramMap.get('id'); // recuperer le id depuis l'url.
  }

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById() {
    this.loading = true;
    this.service.getProductById(this.id).subscribe(
      (res) => {
        this.data = res;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    );
  }
}
