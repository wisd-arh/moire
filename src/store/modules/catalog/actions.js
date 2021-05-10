import { API_BASE } from '@/config.js'
import axios from 'axios'

export default {
  loadProducts(context) {
    context.commit('setProductsLoading', true)
    context.commit('setProductsLoadingFailed', false)

//    clearTimeout(this.loadProductsTimer);
    // this.loadProductsTimer = setTimeout(() => {
      axios
        .get(API_BASE + "products", {
          params: {
            page: context.state.page,
            limit: context.state.productsPerPage,
            categoryId: context.state.filterCategory,
            minPrice: context.state.filterPriceFrom,
            maxPrice: context.state.filterPriceTo,
            colorId: context.state.filterColor,
          },
        })
        .then((response) => context.commit('setProductsData', response.data))
        .catch(() => context.commit('setProductsLoadingFailed', true))
        .then(() => context.commit('setProductsLoading', false))
    //}, 0);
  },
};
