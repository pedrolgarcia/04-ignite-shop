import { X } from "phosphor-react";

import { CartContainer, CartContent, CartItems, CloseButton } from "./styles";

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
          <CartItem />
          <CartItem />
          <CartItem />
        </CartItems>
      </CartContent>
    </CartContainer>
  )
}
