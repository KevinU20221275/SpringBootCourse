import axios from "axios";

// springboot api url
const baseUrl = 'http://localhost:8080';

export const findAll = async() => {
    try {
        const response = await axios.get(baseUrl);
        return response
    } catch (error) {
        console.error(error)
    }

    return null
}

export const create = async({name, description, price}) => {
    try {
        return await axios.post(baseUrl, {
            name,
            description,
            price
        })
    } catch (error) {
        console.error(error)
    }

    return undefined
}

export const update = async({id, name, description, price}) => {
    try {
        return await axios.put(`${baseUrl}/${id}`, {
            name,
            description,
            price
        })
    } catch (error) {
        console.error(error)
    }
    return undefined
}

export const remove = async(id) => {
    try {
        await axios.delete(`${baseUrl}/${id}`)
    } catch (error) {
        console.error(error)
    }
}