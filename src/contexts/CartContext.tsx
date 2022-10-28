import { createContext, ReactNode, useEffect, useState } from 'react'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { v4 as uuidv4 } from 'uuid';
import produce from 'immer'

export interface Product {
  id: string
  name: string
  imageUrl: string
  price: number
  description: string
  defaultPriceId: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  total: number
}

interface CartContextData {
  items: CartItem[]
  total: number
  quantity: number
  addItem: (product: Product, quantity: number) => void
  removeItem: (itemId: string) => void
  clearCart: () => void
}

export const CartContext = createContext({} as CartContextData)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [items, setItems] = useState<CartItem[]>([])

  const total = items.reduce((acc, current) => {
    return acc + current.product.price * current.quantity
  }, 0)
  const quantity = items.reduce((acc, current) => {
    return acc + current.quantity
  }, 0)

  useEffect(() => {
    const cookies = parseCookies()
    const storedStateAsJSON = cookies["@ignite-shop:cart-items-state-1.0.0"]

    if (storedStateAsJSON) {
      setItems(JSON.parse(storedStateAsJSON))
    } else {
      setItems([])
    }
  }, [])

  useEffect(() => {
    if (items.length > 0) {
      const stateJSON = JSON.stringify(items)
      setCookie(null, '@ignite-shop:cart-items-state-1.0.0', stateJSON)
    }
  }, [items])

  function addItem(product: Product, quantity) {
    setItems((state) => {
      return produce(state, (draft) => {
        const existentItemIndex = state.findIndex(
          (item) => item.product.id === product.id,
        )
  
        if (existentItemIndex < 0) {
          var cartItem: CartItem = {
            id: uuidv4(),
            product,
            quantity,
            total: product.price,
          }
          
          draft.unshift(cartItem)
        } else {
          draft[existentItemIndex].quantity += quantity
          draft[existentItemIndex].total += product.price
        }
      })
    })
  }

  function removeItem(itemId: string) {
    setItems((state) => {
      return produce(state, (draft) => {
        return draft.filter(item => item.id != itemId)
      })
    })
  }

  function clearCart() {
    destroyCookie(null, '@ignite-shop:cart-items-state-1.0.0')
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        total,
        quantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
