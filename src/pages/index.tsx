import Image from "next/future/image";
import { useKeenSlider } from "keen-slider/react"
import { GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import Stripe from "stripe";

import { HomeContainer, Product } from "../styles/pages/home";

import { stripe } from "../lib/stripe";

import "keen-slider/keen-slider.min.css"

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

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
                <strong>{product.name}</strong>
                <span>{product.price}</span>
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
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(price.unit_amount / 100)
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 horas
  }
}