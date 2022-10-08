import { AppProps } from "next/app"
import Image from "next/future/image"
import { Handbag } from "phosphor-react"

import { globalStyles } from "../styles/global"
import { CartBadge, CartButton, Container, Header } from "../styles/pages/app"

import { Cart } from "../components/Cart"

import logoImg from "../assets/logo.svg"
import { useState } from "react"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const [isCartOpened, setIsCartOpened] = useState(false)

  function handleToggleCart() {
    setIsCartOpened(!isCartOpened)
  }

  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />

        <CartButton onClick={handleToggleCart}>
          <Handbag size={24} weight="bold" />

          <CartBadge>
            <strong>1</strong>
          </CartBadge>
        </CartButton>
      </Header>

      <Component {...pageProps} />

      <Cart isCartOpened={isCartOpened} />
    </Container>
  )
}
