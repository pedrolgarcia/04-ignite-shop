import { useEffect } from "react";
import { GetServerSideProps } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import Stripe from "stripe";

import { stripe } from "../lib/stripe";

import { ImageContainer, ImagesGroup, SuccessContainer } from "../styles/pages/success";

import { useCart } from "../hooks/useCart";

interface SuccessProps {
  customerName: string
  quantity: number
  products: {
    id: number
    name: string
    imageUrl: string
  }[]
}

export default function Success({ customerName, quantity, products }: SuccessProps) {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <>
      <Head>
        <title>Compra efetuada - Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>
    
      <SuccessContainer>
        <ImagesGroup>
          {products.map((product) => (
            <ImageContainer key={product.id}>
              <Image src={product.imageUrl} width={120} height={110} alt="" />
            </ImageContainer>
          ))}
        </ImagesGroup>

        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de <strong>{quantity == 1 ? `${products[0].name}` : `${quantity} camisas`}</strong> já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if(!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"]
  })

  const customerName = session.customer_details.name

  let quantity = 0

  const products = session.line_items.data.map((item) => {
    const product = item.price.product as Stripe.Product

    quantity += item.quantity

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
    }
  })

  return {
    props: {
      customerName,
      products,
      quantity
    }
  }
}