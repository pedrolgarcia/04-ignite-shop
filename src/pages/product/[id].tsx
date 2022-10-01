import { useRouter } from "next/router"

import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

export default function Product() {
  const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati molestiae incidunt eius, ut ratione autem. Sapiente quam iusto consectetur adipisci harum debitis suscipit iure eos maiores ea, commodi veritatis quos!</p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}