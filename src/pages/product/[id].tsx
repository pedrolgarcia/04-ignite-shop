import { useRouter } from "next/router"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/future/image"
import Stripe from "stripe"

import { stripe } from "../../lib/stripe"

import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

import { priceFormatter } from "../../utils/formatter"

import { useCart } from "../../hooks/useCart"

import { Product as ProductDTO } from "../../contexts/CartContext"

interface ProductProps {
  product: ProductDTO
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  const { addItem } = useCart()
  

  if (isFallback) {
    return <p>Loading...</p>
  }

  function handleAddProductToCart(event, quantity = 1) {
    addItem(product, quantity)
  }

  return (
    <>
      <Head>
        <title>{product.name} - Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{priceFormatter.format(product.price)}</span>

          <p>{product.description}</p>

          <button onClick={handleAddProductToCart}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [/* DICA: Buscar os produtos mais vendidos / mais acessados */],
    fallback: true // quando for true e o ID acessado não estiver na lista acima, o next executa o getStaticProps ASINCRONAMENTE para tentar gerar a página estática do produto
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"]
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount / 100,
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}