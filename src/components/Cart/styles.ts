import { styled } from "../../styles";

export const CartContainer = styled("aside", {
  opacity: 0,
  transform: "translateX(110%)",
  transition: "all 1s ease-in-out",

  variants: {
    opened: {
      true: {
        transform: "translateY(0%)",
        opacity: 1
      }
    },
  }
})