import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'product-form',
  imports: [FormsModule],
  templateUrl: './form.html',
})

export class Form {
  @Input() product: Product = new Product()

  @Output() addProductEvent = new EventEmitter();
  onSubmit(productForm: NgForm):void {
    if (productForm.valid){
      this.addProductEvent.emit(this.product)
      this.clean()
      productForm.reset()
      productForm.resetForm()
    }
  }

  clean():void {
    this.product = new Product()
  }
}
