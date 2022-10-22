import { useState } from "react"
import { useRouter } from "next/router"
import { AppProps } from "next/app"
import Image from "next/future/image"
import { Handbag } from "phosphor-react"

import { globalStyles } from "../styles/global"
import { CartBadge, CartButton, Container, Header } from "../styles/pages/app"

import { Cart } from "../components/Cart"

import logoImg from "../assets/logo.svg"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [isCartOpened, setIsCartOpened] = useState(false)

  function handleToggleCart() {
    setIsCartOpened(!isCartOpened)
  }

  function closeCart() {
    setIsCartOpened(false)
  }

  return (
    <Container>
      <Header centered={router.pathname === "/success"}>
        <Image src={logoImg} alt="" />

        {router.pathname !== "/success" && (
          <CartButton onClick={handleToggleCart}>
            <Handbag size={24} weight="bold" />

            <CartBadge>
              <strong>1</strong>
            </CartBadge>
          </CartButton>
        )}
      </Header>

      <Component {...pageProps} />

      <Cart isCartOpened={isCartOpened} closeCart={closeCart} />
    </Container>
  )
}
