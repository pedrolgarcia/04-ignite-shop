import Image from "next/future/image";
import { CartItemContainer, ImageContainer, ItemInfo, RemoveItemButton } from "./styles";

import shirtImg from "../../../../assets/camisetas/1.png"

export function CartItem() {
  return (
    <CartItemContainer>
      <ImageContainer>
        <Image src={shirtImg} alt="" />
      </ImageContainer>

      <ItemInfo>
        <p>Camiseta Beyond the limits</p>
        <strong>R$ 79,90</strong>

        <RemoveItemButton>
          Remover
        </RemoveItemButton>
      </ItemInfo>
    </CartItemContainer>
  )
}