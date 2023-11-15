import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.sass'],
})
export class AllProductsComponent implements OnInit {
  products: any[] = []; // en peux creer un interface "Product" pour remplace ane ==> products:Product[]=[];
  categories: any[] = [];
  loading = false;
  cartProduct: any[] = [];

  constructor(private service: ProductsService) {}

  ngOnInit(): void {
    this.getAllProduct();
    this.getCategories();
  }

  getAllProduct() {
    this.service.getAllProducts().subscribe(
      (res: any) => {
        this.loading = true;
        this.products = res;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getCategories() {
    this.service.getCategories().subscribe(
      (res: any) => {
        this.loading = true;
        this.categories = res;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getProductByCategorie(event: any) {
    let valueOfSelect = event.target.value;
    if (valueOfSelect == 'all') {
      this.getAllProduct();
      this.loading = true;
      // Autre methode (valueOfSelect == 'All') ? this.getAllProduct : this.service.getproductbycategorie().....
    } else {
      this.service
        .getProductByCategorie(valueOfSelect)
        .subscribe((res: any) => {
          this.loading = true;
          this.products = res;
        });
    }
  }
  addToCart(event: any) {
    if ('cart' in localStorage) {
      this.cartProduct = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProduct.find(
        (item) => item.item.id == event.item.id
      );
      if (exist) {
        alert('produit deja ajouter');
      } else {
        this.cartProduct.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProduct));
      }
    } else {
      this.cartProduct.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProduct));
    }
  }
}
