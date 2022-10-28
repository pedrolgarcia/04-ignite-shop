import { useState } from "react";
import { ShoppingBagOpen, X } from "phosphor-react";
import axios from "axios";

import { CartContainer, CartContent, CartItems, CartItemsContainer, CloseButton, EmptyCart, Resume } from "./styles";

import { CartItem } from "./components/CartItem";

import { useCart } from "../../hooks/useCart";
import { priceFormatter } from "../../utils/formatter";

interface CartProps {
  isCartOpened: boolean
  closeCart(): void
}

interface CheckoutData {
  price: string
  quantity: number
}

export function Cart({ isCartOpened, closeCart }: CartProps) {
  const { items, total, quantity } = useCart()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  function handleCloseCart() {
    closeCart()
  }

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      
      const data: CheckoutData[] = items.map((item) => ({
        price: item.product.defaultPriceId,
        quantity: item.quantity
      }))

      const response = await axios.post("/api/checkout", {
        items: data
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch(err) {
      // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)
      console.log(err)

      setIsCreatingCheckoutSession(false)

      alert("Falha ao redirecionar para o checkout!")
    }
  }

  return (
    <CartContainer opened={isCartOpened}>
      <CloseButton onClick={handleCloseCart}>
        <X />
      </CloseButton>

      <CartContent>
        <strong>Sacola de compras</strong>

        <CartItems>
          {items.length > 0 ? (
            <CartItemsContainer>
              {items?.map((item) => (
                <CartItem key={item.id} cartItem={item} />
              ))}
            </CartItemsContainer>
          ) : (
            <EmptyCart>
              <ShoppingBagOpen weight="thin" size={30} />
              <p>Carrinho vazio</p>
            </EmptyCart>
          )}

          <footer>
            <Resume>
              <p>Quantidade</p>
              <p>{quantity == 0 ? "Nenhum item" : (quantity == 1 ? "1 item" : `${quantity} itens`)}</p>
            </Resume>

            <Resume>
              <strong>Valor total</strong>
              <strong>{priceFormatter.format(total)}</strong>
            </Resume>

            <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession}>Finalizar compra</button>
          </footer>
        </CartItems>
      </CartContent>
    </CartContainer>
  )
}
