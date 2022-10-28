import { styled } from "../../../../styles";

export const CartItemContainer = styled("div", {
  display: "flex",

  gap: "1.25rem"
})

export const ImageContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  background: "linear-gradient(180deg, #1EA483 0%, #7465D4 100%)",

  borderRadius: 8,
  width: 102,
  height: 93,

  img: {
    width: 93,
    height: 93,
    objectFit: "cover"
  }
})

export const ItemInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",

  width: "100%",
  
  p: {
    fontSize: "$md",
    marginBottom: "0.125rem",
    color: "$gray300",
    lineHeight: 1.6
  },

  strong: {
    fontSize: "$md",
    marginBottom: "0.5rem",
    lineHeight: 1.6
  }
})

export const RemoveItemButton = styled("button", {
  background: "transparent",
  
  border: 0,
  outline: 0,
  
  cursor: "pointer",
  
  color: "$green500",
  fontSize: "1rem",
  fontWeight: "bold",
  lineHeight: 1.6,

  transition: "color 0.2s",

  "&:hover": {
    color: "$green300"
  }
})

export const ItemFooter = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  width: "100%"
})