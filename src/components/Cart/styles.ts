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
  height: "100%",

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

  display: "flex",
  flexDirection: "column",
  height: "100%",

  "> strong": {
    display: "block",
    fontSize: "$lg",
    marginBottom: "2rem"
  }
})

export const CartItemsContainer = styled("div", {
  display: "flex",
  gap: "1.5rem",
  flexDirection: "column",
})

export const CartItems = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  height: "100%",

  footer: {
    display: "flex",
    flexDirection: "column",
    
    button: {
      marginTop: "3.56rem",
      backgroundColor: "$green500",
      border: 0,
      color: "$white",
      borderRadius: 8,
      padding: "1.25rem",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "$md",
  
      "&:disabled": {
        opacity: 0.6,
        cursor: "not-allowed"
      },
  
      transition: "background-color 0.2s",
  
      "&:hover": {
        backgroundColor: "$green300"
      }
    }
  }
})

export const EmptyCart = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  flex: 1,
  
  opacity: 0.5,
  marginBottom: 50,

  svg: {
    marginBottom: 10
  }
})

export const Resume = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  fontSize: "$md",
  lineHeight: 1.6,

  marginBottom: "0.5rem",
  
  "p:first-child": {
    fontSize: "1rem",
  },

  "strong:last-child": {
    fontSize: "$xl",
  }
})