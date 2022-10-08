import { CartContainer } from "./styles";

interface CartProps {
  isCartOpened: boolean
}

export function Cart({ isCartOpened }: CartProps) {
  return (
    <CartContainer opened={isCartOpened}>Cart</CartContainer>
  )
}
