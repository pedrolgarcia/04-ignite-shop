import { createContext, ReactNode, useEffect, useReducer } from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

import { CartItem, cartReducer, Product } from '../reducers/cart/reducer'
import {
  addItemAction,
  removeItemAction,
} from '../reducers/cart/actions'

interface CartContextData {
  itens: CartItem[]
  addItem: (product: Product, quantity: number) => void
  removeItem: (itemId: string) => void
}

export const CartContext = createContext({} as CartContextData)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    {
      itens: [],
    },
    () => {
      const cookies = parseCookies()
      const storedStateAsJSON = cookies["@ignite-shop:cart-itens-state-1.0.0"]

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      } else {
        return {
          itens: []
        }
      }
    },
  )

  const { itens } = cartState

  useEffect(() => {
    const stateJSON = JSON.stringify(cartState)
    setCookie(null, '@ignite-shop:cart-itens-state-1.0.0', stateJSON)
  }, [cartState])

  function addItem(product: Product, quantity) {
    dispatch(addItemAction(product, quantity))
  }

  function removeItem(itemId: string) {
    dispatch(removeItemAction(itemId))
  }

  return (
    <CartContext.Provider
      value={{
        itens,
        addItem,
        removeItem
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
