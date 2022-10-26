import { createContext, ReactNode, useEffect, useState } from 'react'
import { parseCookies, setCookie } from 'nookies'
import { v4 as uuidv4 } from 'uuid';
import produce from 'immer'

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
  const [itens, setItens] = useState<CartItem[]>([])

  useEffect(() => {
    const cookies = parseCookies()
    const storedStateAsJSON = cookies["@ignite-shop:cart-itens-state-1.0.0"]
    console.log(storedStateAsJSON)

    if (storedStateAsJSON) {
      setItens(JSON.parse(storedStateAsJSON))
    } else {
      setItens([])
    }
  }, [])

  useEffect(() => {
    if (itens.length > 0) {
      const stateJSON = JSON.stringify(itens)
      setCookie(null, '@ignite-shop:cart-itens-state-1.0.0', stateJSON)
    }
  }, [itens])

  function addItem(product: Product, quantity) {
    setItens((state) => {
      return produce(state, (draft) => {
        const existentItemIndex = state.findIndex(
          (item) => item.product.id === product.id,
        )
  
        if (existentItemIndex < 0) {
          var cartItem: CartItem = {
            id: uuidv4(),
            product: product,
            quantity: quantity,
            total: Number(product.price.replace("R$", "").replace(",", ".")),
          }
          
          draft.push(cartItem)
        } else {
          draft[existentItemIndex].quantity += quantity
          draft[existentItemIndex].total += Number(product.price.replace("R$", "").replace(",", "."))
        }
      })
    })
  }

  function removeItem(itemId: string) {
    setItens((state) => {
      return produce(state, (draft) => {
        draft.filter(item => item.id === itemId)
      })
    })
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
