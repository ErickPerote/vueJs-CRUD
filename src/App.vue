<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Produtos Front</a>
      </div>
    </nav>

    <div class="container">
      <ul>
        <li v-for="(error, index) of errors" :key="index">
          camp<b>{{error.field}}</b> - {{error.defaultMessage}}
        </li>
      </ul>

      <form @submit.prevent="save">

        <label>Nome</label>
        <input type="text" placeholder="Nome" v-model="product.name">
        <label>Quantidade</label>
        <input type="number" placeholder="QTD" v-model="product.quantity">
        <label>Valor</label>
        <input type="text" placeholder="Valor" v-model="product.price">

        <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>NOME</th>
            <th>VALOR</th>
            <th>QUANTIDADE</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="item of products" :key="item.id">

            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.quantity }}</td>
            <td>
              <button @click="edit(item)" class="waves-effect btn-small blue darken-1"><i
                  class="material-icons">create</i></button>
              <button @click="remove(item)" class="waves-effect btn-small red darken-1"><i
                  class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>
</template>

<script>
import Product from './services/products'

export default {
  data() {
    return {
      product: {
        id: '',
        name: '',
        quantity: '',
        price: ''
      },

      products: [],
      errors: []
    }
  },

  methods: {
    list() {
      Product.list().then(res => {
        this.products = res.data
      })
    },

    save() {
      if (!this.product.id) {
        Product.create(this.product).then(res => {
          this.product = {}
          this.list()
          this.errors = []
        }).catch(e => {
          this.errors = e.response.data.res
        })
      } else {
        Product.update(this.product).then(res => {
          this.product = {}
          this.list()
          this.errors = []
        }).catch(e => {
          this.errors = e.response.data.res
        })
      }

    },

    edit(product) {
      this.product = product
    },

    remove(product) {
      if (confirm('Você realmente deseja deletar o item?')) {
        Product.delete(product).then(res => {
          this.list()
          this.errors = []
        }).catch(e => {
          this.errors = e.response.data.res
        })
      }
    }

  },


  mounted() {
    this.list()
  }
}

</script>

<style>

</style>
