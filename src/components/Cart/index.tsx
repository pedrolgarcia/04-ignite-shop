import { X } from "phosphor-react";

import { CartContainer, CartContent, CartItems, CloseButton, Resume } from "./styles";

import { CartItem } from "./components/CartItem";

interface CartProps {
  isCartOpened: boolean
  closeCart(): void
}

export function Cart({ isCartOpened, closeCart }: CartProps) {
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
            <CartItem />
            <CartItem />
            <CartItem />
          </div>

          <footer>
            <Resume>
              <p>Quantidade</p>
              <p>3 itens</p>
            </Resume>

            <Resume>
              <strong>Valor total</strong>
              <strong>R$ 270,00</strong>
            </Resume>

            <button>Finalizar compra</button>
          </footer>
        </CartItems>
      </CartContent>
    </CartContainer>
  )
}
