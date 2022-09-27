import { http } from "./config";

export default {
    list:() => {
        return http.get('Products')
    },

    create: (product) => {
        return http.post('Products', product)
    },

    update: (product) => {
        return http.put('Products/' + product.id, product)
    },

    delete: (product) => {
        return http.delete('Products/' + product.id, {data: product})
    }
}