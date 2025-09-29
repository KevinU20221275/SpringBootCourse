import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ProductTable } from './components/ProductTable'
import { ProductForm } from './components/ProductForm'
import { create, findAll, remove, update } from './services/productService'
import Swal from 'sweetalert2'

// const initProducts = [
//     {
//         id:1,
//         name: 'Monitor Asus',
//         description: 'Monitor 20 pulgadas led',
//         price: 4000
//     },
//     {
//         id:2,
//         name: 'Iphone 16 pro',
//         description: 'El telefono apple',
//         price: 1600
//     }
// ]

export function ProductsApp({title = 'Title default!'}){

    const [products, setProducts] = useState([])
    const [productSelected, setProductselected] = useState({
        id: 0,
        name: '',
        description: '',
        price: ''
    })

    useEffect(() => {
        getProducts()
    },[])

    const getProducts = async() => {
        const results = await findAll();
        setProducts(results.data)
    }

    const handleAddProduct = async (product) => {
        if (product.id > 0){
            const response = await update(product)
            setProducts(
                products.map(p => {
                    if (p.id == product.id){
                        return {...response.data}
                    }
                    return p
                })
            )
            Swal.fire({
                title: "Actualizado con exito!",
                text: `Producto ${product.name} actualizado con exito!`,
                icon: "success"
            })
        } else {
            const response = await create(product)
            setProducts([...products, {...response.data}])
            Swal.fire({
                title: "Creado con exito!",
                text: `Producto ${product.name} creado con exito!`,
                icon: "success"
            })
        }
    }

    const handleProductSelected = (product) => {
        setProductselected({...product})
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Esta seguro de eliminar?",
            text: "Cuidado va a elimianr un producto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed){
                remove(id)

                setProducts(
                    products.filter(p => p.id != id)
                )
                Swal.fire({
                    title: "Eliminado con exito!",
                    text: `Producto con ${id} eliminado con exito!`,
                    icon: "success"
                })
            }
        })
        
    }

    return (
        <div className='container pt-4'>
            <h2>{title}</h2>
            <div className="row">
                <div className='col'>
                    <ProductForm handleAdd={handleAddProduct} productSelected={productSelected} />
                </div>
                <div className="col">
                    {
                        (products.length > 0) ? 
                        <ProductTable products={products} handleProducSelected={handleProductSelected} handleDelete={handleDelete} /> :
                        <div className="alert alert-danger">No hay productos en la base de datos</div>
                    }
                </div>
            </div>

        </div>
    )
}

ProductsApp.propTypes = {
    title : PropTypes.string.isRequired
}
