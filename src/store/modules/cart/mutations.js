export default {
    updateOrderInfo(state, orderInfo) {
        state.orderInfo = orderInfo
    },
    resetCart(state) {
        state.cartProducts = []
        state.cartProductsData = []
    },
    updateCartProductAmount(state, {productId, amount}) {
        let item = state.cartProducts.find(item => item.productId === productId)
        if (item) {
            item.amount = amount
        }   
    },
    deleteCartProduct(state, productId) {
        state.cartProducts = state.cartProducts.filter(item => item.productId !== productId)
    },
    updateUserAccessKey(state, accessKey) {
        state.userAccessKey = accessKey
    },
    updateCartProductsData(state, items) {
        state.cartProductsData = items
    },
    syncCartProducts(state) {
        state.cartProducts = state.cartProductsData.map( item => {
            return {
                productId: item.product.id,
                amount: item.quantity
            }
        })
    },
    updateLoadingStatus(state, {loading, error}) {
        state.cartLoading = loading
        state.cartLoadingError = error
    },
    setDeliveryData(state, value) {
        state.deliveryData = value
    },
}