import PropTypes from "prop-types"

export function ProductTable({products, handleProducSelected, handleDelete}){
    return (
        <table className="table table-hover table-striped">
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>description</th>
                    <th>price</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((p) => {
                        return (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>{p.description}</td>
                                <td>{p.price}</td>
                                <td>
                                    <button className="btn btn-sm btn-primary"
                                    onClick={() => handleProducSelected(p)}>update</button>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(p.id)}>delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

ProductTable.PropTypes = {
    products: PropTypes.array.isRequired,
    handleProducSelected: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}