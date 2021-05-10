export default {
  getProductsLoading(state) {
    return state.productsLoading;
  },
  getProductsLoadingFailed(state) {
    return state.productsLoadingFailed;
  },
  getFilterPriceFrom(state) {
    return state.filterPriceFrom;
  },
  getFilterPriceTo(state) {
    return state.filterPriceTo;
  },
  getFilterCategory(state) {
    return state.filterCategory;
  },
  getFilterColor(state) {
    return state.filterColor;
  },
  getPage(state) {
    return state.page;
  },
  getProductsPerPage(state) {
    return state.productsPerPage;
  },
  getProductsData(state) {
    return state.productsData;
  },
  getCountProducts(state) {
    return state.productsData ? state.productsData.pagination.total : 0
  },
};
