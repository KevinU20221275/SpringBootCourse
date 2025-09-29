import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'table-product',
  imports: [],
  templateUrl: './products.html',
})
export class Products {
  @Input() products: Product[] = []
  title: string = "Listado de productos"

  @Output() updateProductEvent = new EventEmitter();

  @Output() deleteProductEvent = new EventEmitter();


  onUpdateProduct(product: Product): void {
    this.updateProductEvent.emit(product);
  }

  onDeleteProduct(id: number):void {
    this.deleteProductEvent.emit(id);
  }
}
