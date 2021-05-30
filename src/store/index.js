import Vue from "vue"
import Vuex from "vuex"
import catalog from "./modules/catalog/index"
import cart from "./modules/cart/index"
import product from "./modules/product/index"

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        catalog,
        cart,
        product
    },
    state: {},
    actions: {},
    mutations: {},
    getters: {}
})

export default store