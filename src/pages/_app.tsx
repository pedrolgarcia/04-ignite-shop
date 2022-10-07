import { AppProps } from "next/app"
import Image from "next/future/image"
import { Handbag } from "phosphor-react"

import { globalStyles } from "../styles/global"
import { CartBadge, CartButton, Container, Header } from "../styles/pages/app"

import { Cart } from "../components/Cart"

import logoImg from "../assets/logo.svg"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />

        <CartButton>
          <Handbag size={24} weight="bold" />

          <CartBadge>
            <strong>1</strong>
          </CartBadge>
        </CartButton>
      </Header>

      <Component {...pageProps} />

      <Cart />
    </Container>
  )
}
