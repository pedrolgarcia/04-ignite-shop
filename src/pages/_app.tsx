
import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"

import { CartContextProvider } from "../contexts/CartContext"

import { Layout } from "./_layout"

globalStyles()

export default function App(appProps: AppProps) {
  return (
    <CartContextProvider>
      <Layout {...appProps} />
    </CartContextProvider>
  )
}
