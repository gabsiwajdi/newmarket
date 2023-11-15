import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass'],
})
export class ProductComponent implements OnInit {
  @Input() data: any = {};
  @Output() item = new EventEmitter();
  addButton: boolean = false;
  ammount: number = 0;

  constructor() {}

  ngOnInit(): void {}

  add(event: any) {
    this.item.emit({ item: this.data, quantity: this.ammount });
    this.addButton = false;
  }
}
