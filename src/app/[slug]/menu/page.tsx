
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

// import RestaurantCategories from "./components/categories";
import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ ConsumptionMethod: string }>;
}

//verifica se comsumptionMethod é igual aos metodos de realizar  o pedido, entrega ou nao
const isConsumptionMethodValid = (ConsumptionMethod: string) => {
    return ["DINE_IN", "TAKEAWAY"].includes(ConsumptionMethod.toUpperCase());//considera minusculo e maisculo
};

const RestaurantMenuPage = async ({ params, searchParams  }: RestaurantMenuPageProps) => {
    
    const {slug} = await params;   
    const {ConsumptionMethod} =  await searchParams;

    //se é invalido retorna o notfound
    if (!isConsumptionMethodValid(ConsumptionMethod)) {
        return notFound();
    }

    const restaurant = await db.restaurant.findUnique({ 
        where: { slug }, 
        include: { 
            menuCategories: {
                include: { product: true }
            },
        },
    });
    
    if (!restaurant) {
        return notFound();
    }
    return ( 
        <div>
            <RestaurantHeader restaurant={restaurant} />
        </div>
     );
}
 
export default RestaurantMenuPage;