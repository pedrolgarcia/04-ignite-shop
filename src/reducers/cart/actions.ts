import { CartItem, Product } from './reducer'

export enum ActionTypes {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  SET_ITENS_FROM_COOKIES = 'SET_ITENS_FROM_COOKIES',
}

export function addItemAction(product: Product, quantity: number) {
  return {
    type: ActionTypes.ADD_ITEM,
    payload: {
      product,
      quantity
    },
  }
}

export function removeItemAction(itemId: string) {
  return {
    type: ActionTypes.REMOVE_ITEM,
    payload: {
      itemId,
    },
  }
}

export function setItensFromCookies(itens: CartItem[]) {
  return {
    type: ActionTypes.SET_ITENS_FROM_COOKIES,
    payload: {
      itens,
    },
  }
}