
import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"

import { CartContextProvider } from "../contexts/CartContext"

import { Layout } from "../components/Layout"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartContextProvider>
  )
}
