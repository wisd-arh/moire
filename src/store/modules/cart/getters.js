export default {
    getCartLoading(state) {
        return state.cartLoading
    },
    getCartLoadingError(state) {
        return state.cartLoadingError
    },
    getCartProducts(state) {
        return state.cartProducts
    },
    getDeliveryData(state) {
        return state.deliveryData
    },
    getOrderInfo(state) {
        return state.orderInfo
    },
    cartDetailProducts(state) {
        return state.cartProducts.map(item => {
            const product =  state.cartProductsData.find(p => p.product.id === item.productId)
            return {
                ...item,
                product: {
                    ...product,
                    //image: product.image.file.url,
                    
                },
                positionCost: product.product.price * item.amount, 
            }    
        })
    },
    orderProducts(state) {
        if (state.orderInfo) {
            return state.orderInfo.basket.items.map(item => {
                return {
                    ...item,
                    positionCost: item.price * item.quantity
                }
            })
        } else { return []; }    
    },
    cartTotalPrice(state, getters) {
        return getters.cartDetailProducts.reduce((acc, item) => acc+= item.amount * item.product.price, 0)
    },
    cartPositionsCount(state) {
        return state.cartProducts.length
    },
}