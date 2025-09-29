import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Products } from './components/products/products';
import { Product } from './models/product';
import { Form } from "./components/form/form";
import Swal from 'sweetalert2';
import { ProductService } from './services/product';

@Component({
  selector: 'app-root',
  imports: [Products, Form],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  products: Product[] = [];
  productSelected: Product = new Product()

  constructor(private service: ProductService){}

  ngOnInit(): void {
    this.service.findAll().subscribe(products => this.products = products)
    // this.products = [
    //   {
    //     id: 1,
    //     name: 'Monitos asus',
    //     price: 1000,
    //     description: 'Monitor 20pulgadas'
    //   },
    //   {
    //     id: 2,
    //     name: 'Motorola Adventure',
    //     price: 1000,
    //     description: 'Telefono para la jungla'
    //   }
    // ]
  }

  addProduct(product: Product):void {
    if (product.id > 0){
      this.service.update(product).subscribe(productUpdate => {
        this.products = this.products.map(prod => {
          if (prod.id == product.id){
            return {...productUpdate}
          }
            return prod
        })

        Swal.fire({
          title: "Producto actualizado",
          text: `Producto ${productUpdate.name} actualizado con exito`,
          icon: "success"
        })
      })
    } else {
      this.service.create(product).subscribe(newProduct => {
        this.products = [... this.products, {...newProduct}]
        Swal.fire({
          title: "Producto creado",
          text: `Producto ${newProduct.name} creado con exito`,
          icon: "success"
        })
      })
    }
  }

  onUpdateProductEvent(product: Product): void {
    this.productSelected = {...product}
  }

  onDeleteProductEvent(id:number): void {
    Swal.fire({
        title: "Seguro desea eliminar?",
        text: "Cuidado se eliminara el producto del sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminarlo!"
      }).then((result) => {
        if (result.isConfirmed){
          this.service.remove(id).subscribe(deletedProduct => {
            this.products = this.products.filter(p => p.id != id)
            
            Swal.fire({
              title: "Producto eliminado!",
              text: `Producto ${deletedProduct.name} eliminado con exito!`,
              icon: "success"
            })
          })
        }
      })
  }
}
