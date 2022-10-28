import Image from "next/future/image";
import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";
import { useKeenSlider } from "keen-slider/react"
import { Handbag } from "phosphor-react";
import Stripe from "stripe";

import { CartButton, HomeContainer, Product, ProductInfo } from "../styles/pages/home";

import { useCart } from "../hooks/useCart";

import { stripe } from "../lib/stripe";

import "keen-slider/keen-slider.min.css"

import { Product as ProductDTO } from "../contexts/CartContext";
import { priceFormatter } from "../utils/formatter";

interface HomeProps {
  products: ProductDTO[]
}

export default function Home({ products }: HomeProps) {
  const { addItem } = useCart()

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  function handleAddProductToCart(e: any, product: ProductDTO, quantity = 1) {
    e.preventDefault();
    addItem(product, quantity)
  }

  return (
    <>
      <Head>
        <title>Home - Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt="" />

              <footer>
                <ProductInfo>
                  <strong>{product.name}</strong>
                  <span>{priceFormatter.format(product.price)}</span>
                </ProductInfo>

                <CartButton type="button" onClick={(e) => handleAddProductToCart(e, product)}>
                  <Handbag size={24} weight="bold" />
                </CartButton>
              </footer>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </>
  )
}

/* 
  getServerSideProps
  uma função que executa do lado do servidor, ou seja, antes da interface chegar ao cliente
  é executado em toda a requisição e a página do browser só carrega após o fim da execução dessa função
  conseguimos ter acesso ao contexto da requisição (req, res)

  getStaticProps
  uma função que executa só quando o Next criar uma versão de cache nova da página em questão, ou seja,
  quando fizermos um novo deploy (build) OU passando um parâmetro "revalidate" no retorno da função indicando o tempo
  que o Next vai fazer essa build automaticamente

  !! Em desenvolvimento, o next trata getServerSideProps exatamentes igual getStaticProps
*/

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"]
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100,
      description: product.description,
      defaultPriceId: price.id
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 horas
  }
}