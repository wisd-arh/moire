export default {
  setProductsLoading(state, value) {
    state.productsLoading = value;
  },
  setProductsLoadingFailed(state, value) {
    state.productsLoadingFailed = value;
  },
  setFilterPriceFrom(state, value) {
    state.filterPriceFrom = value;
  },
  setFilterPriceTo(state, value) {
    state.filterPriceTo = value;
  },
  setFilterCategory(state, value) {
    state.filterCategory = value;
  },
  setFilterColor(state, value) {
    state.filterColor = value;
  },
  setPage(state, value) {
    state.page = value;
  },
  setProductsPerPage(state, value) {
    state.productsPerPage = value;
  },
  setProductsData(state, value) {
    state.productsData = value;
  },
};
