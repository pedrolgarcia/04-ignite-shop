import Image from "next/future/image";
import { CartItemContainer, ImageContainer, ItemFooter, ItemInfo, RemoveItemButton } from "./styles";

import { CartItem } from "../../../../contexts/CartContext";

import { useCart } from "../../../../hooks/useCart";

import { priceFormatter } from "../../../../utils/formatter";

interface CartItemProps {
  cartItem: CartItem
}

export function CartItem({ cartItem }: CartItemProps) {
  const { removeItem } = useCart()

  function handleRemoveItemFromCart() {
    removeItem(cartItem.id)
  }

  return (
    <CartItemContainer>
      <ImageContainer>
        <Image src={cartItem?.product?.imageUrl} width={93} height={93} alt="" />
      </ImageContainer>

      <ItemInfo>
        <p>{cartItem?.product?.name}</p>
        <strong>{priceFormatter.format(cartItem?.product?.price)}</strong>

        <ItemFooter>
          <RemoveItemButton onClick={handleRemoveItemFromCart}>
            Remover
          </RemoveItemButton>

          <span>x{cartItem.quantity}</span>
        </ItemFooter>
      </ItemInfo>
    </CartItemContainer>
  )
}