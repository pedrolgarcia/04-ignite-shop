import { Product } from './reducer'

export enum ActionTypes {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
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