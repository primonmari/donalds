//para acessar o parametro , primeiro vou criar uma interface, porque vou receber esse
//RESTAURANTE MENU PAGE

import Image from "next/image";
import { notFound } from "next/navigation"; //mostra tela vazia caso não exista imagem

import { db } from "@/lib/prisma";

import ConsumptionMethodOption from "./components/consumption-method-option";

//parametro como prop , e ela vai definir quais props vou receber
interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

//para acessar a slug no componente recebo params
const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: {
      menuCategories: {
        include: {product: true}
      },
    },
  });
  // console.log(restaurant?.menuCategories)

  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      {/*Logo e titulo*/}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant?.avatarImageUrl}
          alt={restaurant.name} //leitor de tela
          width={82}
          height={82}
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>

      {/*Bem-Vindo */}
      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-14">
        <ConsumptionMethodOption
          slug={slug}
          option="DINE_IN"
          buttonText="Para comer aqui"
          imageAlt="Comer aqui"
          imageUrl="/dine_in.png"
        />
        <ConsumptionMethodOption
          slug={slug}
          option="TAKEAWAY"
          buttonText="Para levar"
          imageAlt="Para levar"
          imageUrl="/takeaway.png"
        />
      </div>
    </div>
  );
};

//PQ o componente RestaurantPage é assync? Por padrão todos os componentes que cria no next, ou seja a RestaurantPage.
//São server components - são renderizados/EXECUTADOS no servidor
//Podem ser assincronos
//Podem chamar recursos do back end (BD)
//Não posso usar hooks, não posso ter interatividade nenhuma
//Para ter interatividade, tem que criar um client component "use client", mas não posso ter o component como async se for client component
//TB não conseguimos acessar recursos do servidor , como chamar o banco de dados, dentro do client component

export default RestaurantPage;
