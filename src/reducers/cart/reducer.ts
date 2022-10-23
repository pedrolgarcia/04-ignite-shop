import { produce } from 'immer'
import { v4 as uuidv4 } from 'uuid';

import { ActionTypes } from './actions'

export interface Product {
  id: string
  name: string
  imageUrl: string
  price: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  total: number
}

interface CartState {
  itens: CartItem[]
}

export function cartReducer(state: CartState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_ITEM:
      return produce(state, (draft) => {
        var existentItem = draft.itens.find(item => item.product.id === action.payload.product.id)
        const existentItemIndex = state.itens.findIndex(
          (item) => item.product.id === action.payload.product.id,
        )
  
        if (existentItemIndex < 0) {
          var cartItem = {
            id: uuidv4(),
            product: action.payload.product,
            quantity: action.payload.quantity,
            total: action.payload.product.price,
          }
          
          draft.itens.push(cartItem)
        } else {
          draft.itens[existentItemIndex].quantity += action.payload.quantity;
          draft.itens[existentItemIndex].total += action.payload.product.price;
        }
      })
    
    case ActionTypes.REMOVE_ITEM:
      return produce(state, (draft) => {
        draft.itens.filter(item => item.id === action.payload.itemId)
      })

    default:
      return state
  }
}
