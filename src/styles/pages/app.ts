import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
   alignItems: "flex-start",
   justifyContent: "center",
   minHeight: "100vh"
})

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  variants: {
    centered: {
      true: {
        justifyContent: "center"
      },
      false: {
        justifyContent: "space-between"
      }
    }
  }
})

export const CartButton = styled("button", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  position: "relative",
  padding: "0.75rem",
  borderRadius: 6,
  border: 0,
  outline: 0,
  backgroundColor: "$gray800",

  cursor: "pointer",

  transition: "filter 0.2s",

  "&:hover": {
    filter: "brightness(0.8)"
  },

  svg: {
    color: "$gray300",
  }
})

export const CartBadge = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  width: "1.5rem",
  height: "1.5rem",
  borderRadius: 24,
  border: "3px solid $gray800",
  backgroundColor: "$green500",

  boxSizing: "content-box",

  position: "absolute",
  top: "-10px",
  right: "-10px",

  strong: {
    fontSize: "0,875rem",
    color: "$white"
  }
})