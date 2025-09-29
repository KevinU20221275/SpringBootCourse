import PropTypes from "prop-types"
import { useEffect, useState } from "react"

const initialDataForm = {
    id: 0,
    name: '',
    description: '',
    price: ''
}

export function ProductForm({handleAdd, productSelected}){

    const [form, setForm] = useState(initialDataForm)

    
    useEffect(() => {
        setForm(productSelected)
    }, [productSelected])
    
    const {id, name, description, price} = form
    
    return (
        <form onSubmit={e => {
            e.preventDefault()
            if (!name || !description || !price){
                alert('Debe completar los datos del formulario')
                return
            } 
            handleAdd(form)
            setForm(initialDataForm)
            }}>
            <div>
                <input placeholder="Name"
                className="form-control my-3 w-75" 
                name="name" 
                value={name}
                onChange={(e) => setForm({...form, name: e.target.value})}/>
            </div>
            <div>
                <input placeholder="Description"
                className="form-control my-3 w-75" 
                name="description" 
                value={description}
                onChange={(e) => setForm({...form, description: e.target.value})}/>
            </div>
            <div>
                <input placeholder="Price"
                className="form-control my-3 w-75" 
                name="price" 
                value={price}
                onChange={(e) => setForm({...form, price: e.target.value})}/>
            </div>
            <div>
                <button className="btn btn-primary" type="submit">{id > 0 ? 'Update' : 'Create'}</button>
            </div>
        </form>
    )
}

ProductForm.propTypes = {
    handleAdd: PropTypes.func,
    productSelected: PropTypes.object
}