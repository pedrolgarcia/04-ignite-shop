import { styled } from "../../styles";

export const CartContainer = styled("aside", {
  opacity: 0,
  transform: "translateX(110%)",
  transition: "all 0.3s ease-in-out",

  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  
  width: "30rem",

  backgroundColor: "$gray800",
  boxShadow: "-4px 0px 30px rgba(0, 0, 0, 0.8)",

  variants: {
    opened: {
      true: {
        transform: "translateY(0%)",
        opacity: 1
      }
    },
  }
})

export const CloseButton = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  outline: 0,
  border: 0,

  fontSize: "$lg",

  cursor: "pointer",

  position: "absolute",
  right: "1.5rem",
  top: "1.5rem",

  backgroundColor: "transparent",

  svg: {
    color: "$gray300"
  }
})

export const CartContent = styled("div", {
  padding: "4.5rem 3rem 3rem",

  "> strong": {
    display: "block",
    fontSize: "$lg",
    marginBottom: "2rem"
  }
})

export const CartItems = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem"
})