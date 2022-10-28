import { X } from "phosphor-react";

import { CartContainer, CartContent, CartItems, CloseButton, Resume } from "./styles";

import { CartItem } from "./components/CartItem";

import { useCart } from "../../hooks/useCart";
import { priceFormatter } from "../../utils/formatter";

interface CartProps {
  isCartOpened: boolean
  closeCart(): void
}

export function Cart({ isCartOpened, closeCart }: CartProps) {
  const { itens, total, quantity } = useCart()

  function handleCloseCart() {
    closeCart()
  }

  return (
    <CartContainer opened={isCartOpened}>
      <CloseButton onClick={handleCloseCart}>
        <X />
      </CloseButton>

      <CartContent>
        <strong>Sacola de compras</strong>

        <CartItems>
          <div>
            {itens?.map((item) => (
              <CartItem key={item.id} cartItem={item} />
            ))}
          </div>

          <footer>
            <Resume>
              <p>Quantidade</p>
              <p>{quantity == 0 ? "Nenhum item" : (quantity == 1 ? "1 item" : `${quantity} itens`)}</p>
            </Resume>

            <Resume>
              <strong>Valor total</strong>
              <strong>{priceFormatter.format(total)}</strong>
            </Resume>

            <button>Finalizar compra</button>
          </footer>
        </CartItems>
      </CartContent>
    </CartContainer>
  )
}
