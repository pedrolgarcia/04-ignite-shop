import Image from "next/future/image";
import { CartItemContainer, ImageContainer, ItemInfo, RemoveItemButton } from "./styles";

import { CartItem } from "../../../../reducers/cart/reducer";

import { useCart } from "../../../../hooks/useCart";

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
        <strong>{cartItem?.product?.price}</strong>

        <RemoveItemButton onClick={handleRemoveItemFromCart}>
          Remover
        </RemoveItemButton>
      </ItemInfo>
    </CartItemContainer>
  )
}