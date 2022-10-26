import { X } from "phosphor-react";

import { CartContainer, CartContent, CartItems, CloseButton, Resume } from "./styles";

import { CartItem } from "./components/CartItem";

import { useCart } from "../../hooks/useCart";

interface CartProps {
  isCartOpened: boolean
  closeCart(): void
}

export function Cart({ isCartOpened, closeCart }: CartProps) {
  const { itens } = useCart()

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
              <p>{itens.length == 0 ? "Nenhum item" : (itens.length == 1 ? "1 item" : `${itens?.length} itens`)}</p>
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
