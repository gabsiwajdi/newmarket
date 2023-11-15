import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnInit {
  constructor(private service: CartService, private fb: FormBuilder) {}
  cartProduct: any[] = [];
  total = 0;
  success = false;
  form!: FormGroup;
  carts: any[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      start: [''],
      end: [''],
    });
    this.getCartProduct();
  }
  // appliquer le filtre sur date
  applyFiltre() {
    let date = this.form.value;
    this.service.getAllCartByDateRange(date).subscribe((res: any) => {
      this.carts = res;
      console.log(this.carts);
    });
  }

  // recuperer la liste des produits du local storage
  getCartProduct() {
    if ('cart' in localStorage) {
      this.cartProduct = JSON.parse(localStorage.getItem('cart')!);
      console.log(this.cartProduct);
    }
    this.getCardTotale();
  }

  // calcule de totale du produits de la cart
  getCardTotale() {
    this.total = 0;
    for (let x in this.cartProduct) {
      this.total +=
        this.cartProduct[x].item.price * this.cartProduct[x].quantity;
    }
    this.total = parseFloat(this.total.toFixed(3));
  }

  // ajouter 1 lors de click boutto +
  addAmmount(index: any) {
    this.cartProduct[index].quantity++;
    this.getCardTotale();
    localStorage.setItem('cart', JSON.stringify(this.cartProduct));
  }
  // button -
  minecAmmount(index: any) {
    this.cartProduct[index].quantity--;
    this.getCardTotale();
    localStorage.setItem('cart', JSON.stringify(this.cartProduct));
  }
  // lors de changement de valeur de l'input text (quantite)
  detectChange() {
    localStorage.setItem('cart', JSON.stringify(this.cartProduct));
    this.getCardTotale();
  }
  // supprimer un produit de la liste de la cart
  deleteProdact(index: any) {
    this.cartProduct.splice(index, 1);
    this.getCardTotale();
    localStorage.setItem('cart', JSON.stringify(this.cartProduct));
  }
  // supprimer toutes la liste de la produit du cart
  clearAllProduct() {
    const confirmation = window.confirm(
      'Êtes-vous sûr de vouloir vider le panier ?'
    );
    if (confirmation) {
      this.cartProduct = []; // vider la liste des products
      this.getCardTotale();
      localStorage.setItem('cart', JSON.stringify(this.cartProduct));
      alert('Le panier a été vidé avec succès.');
    }
  }
  // envoiyer la cart
  addCart() {
    let products = this.cartProduct.map((item) => {
      return { productID: item.item.id, quantity: item.quantity };
    }); // elle va retourne une tableaux dans la quelle en a id et quantite de tous le produits de la carte
    let Model = {
      userId: 5,
      date: new Date(),
      products: products,
      totale: this.total,
    };

    this.service.createCart(Model).subscribe((res) => {
      this.success = true;
    });
    console.log(Model);
  }
}
