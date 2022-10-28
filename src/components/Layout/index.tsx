import { ReactNode, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/future/image"
import Link from "next/link"
import { Handbag } from "phosphor-react"

import { CartBadge, CartButton, Container, Header } from "./styles"

import { Cart } from "../Cart"

import { useCart } from "../../hooks/useCart"

import logoImg from "../../assets/logo.svg"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter()
  const { itens, quantity } = useCart()

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

            {quantity > 0 && (
              <CartBadge>
                <strong>{quantity}</strong>
              </CartBadge>
            )}
          </CartButton>
        )}
      </Header>
    
      { children }

      <Cart isCartOpened={isCartOpened} closeCart={closeCart} />
    </Container>
  )
}