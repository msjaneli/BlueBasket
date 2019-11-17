import { createSelector } from 'reselect'

export const isLoading = (state) => state.checkout.isLoading

export const getCartStatus = (state) => state.checkout.cartStatus

export const getCart = (state) => state.checkout.cart

export const getCartByRestaurant = createSelector(
    getCart,
    (cart) => {
        var orders = {};
        cart.forEach(item => {
            if (!orders[item.rid]) {
                orders = {
                  ...orders, 
                  [item.rid]: {
                    restaurant: '',
                    cartIds: [],
                    lids: [],
                    names: [],
                    quantities: [],
                    prices: [],
                    notes: [],
                    total: 0
                  }
              }
            }
            orders[item.rid].restaurant = item.restaurant;
            orders[item.rid].cartIds.push(item.cartId);
            orders[item.rid].lids.push(item.lid);
            orders[item.rid].names.push(item.name);
            orders[item.rid].quantities.push(item.quantity);
            orders[item.rid].prices.push(item.price);
            orders[item.rid].notes.push(item.note);
            orders[item.rid].total += item.price * item.quantity;
        })

        return orders;
    }
)

export const getSubTotal = createSelector(
    getCart,
    (cart) => {
        var subtotal = 0;
        cart.forEach(item => {
            subtotal += item.quantity * item.price
        })

        return subtotal.toFixed(2);
    }
)