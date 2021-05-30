import state from "./state"

export default {
    getProductData(state) {
        return state.productData
    },
    getProductLoading(state) {
        return state.productLoading
    },
    getProductLoadingFailed(state) {
        return state.productLoadingFailed
    },
    getProductAdded(state) {
        return state.productAdded
    },
    getProductAddSending(state) {
        return state.productAddSending
    },
}