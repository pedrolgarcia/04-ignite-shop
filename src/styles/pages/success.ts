import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  height: 656,

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
    marginBottom: "1.5rem",
  },

  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    lineHeight: 1.4
  },

  a: {
    display: "block",
    fontSize: "$lg",
    color: "$green500",
    marginTop: "4rem",
    textDecoration: "none",
    fontWeight: "bold",

    transition: "color 0.2s",

    "&:hover": {
      color: "$green300", 
    }
  },
})

export const ImagesGroup = styled("div", {
  display: "flex",
  marginBottom: "3rem",
})

export const ImageContainer = styled("div", {
  width: 140,
  height: 140,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  boxShadow: "0px 0px 60px rgba(0, 0, 0, 0.8)",
  margin: "0 -1.75rem",
  borderRadius: 999,
  padding: "0.25rem",
  
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover"
  }
})