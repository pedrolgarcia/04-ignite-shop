import { useState } from "react"
import { useRouter } from "next/router"
import { AppProps } from "next/app"
import Image from "next/future/image"
import Link from "next/link"
import { Handbag } from "phosphor-react"

import { CartBadge, CartButton, Container, Header } from "../styles/pages/app"

import { Cart } from "../components/Cart"

import { useCart } from "../hooks/useCart"

import logoImg from "../assets/logo.svg"

export function Layout({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { itens } = useCart()

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
        <Link href="/">
          <Image src={logoImg} alt="" />
        </Link>

        {router.pathname !== "/success" && (
          <CartButton onClick={handleToggleCart}>
            <Handbag size={24} weight="bold" />

            {itens?.length > 0 && (
              <CartBadge>
                <strong>{itens?.length}</strong>
              </CartBadge>
            )}
          </CartButton>
        )}
      </Header>
      
      <Component {...pageProps} />

      <Cart isCartOpened={isCartOpened} closeCart={closeCart} />
    </Container>
  )
}