import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
// import { useParams, useSearchParams } from "next/navigation";

// import { formatCurrency } from "@/helpers/format-currency";

//recebo os produtos que quero renderizar
interface ProductsProps {
    product: Product[];
}

    const  ProductsList = ({ product }: ProductsProps) => {
   
    
    return ( 
        <div className="space-y-3 px-5 ">
            {
                //para cada produto renderizo um código
                product.map(product => (
                    //cliquei no produto levo para outra página
                    <Link 
                        key={product.id} 
                        href={`/`} 
                        className="flex items-center justify-between gap-10 border-b py-3"
                    >
                        {/* ESQUERDA */}
                        <div>
                            <h3 className="text-sm font-medium">{product.name}</h3>
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                                {product.description}
                            </p>

                            <p className="pt-3 text-sm font-semibold">
                                {new Intl.NumberFormat("pt-BR", {
                                style:"currency",
                                currency:'BRL'
                                }).format(product.price)}
                            </p>
                        </div>
                        {/* Direita */}
                        <div className="relative min-h-[82px] min-w-[120px]">
                           <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="rounded-lg object-contain"
                           
                           /> 
                        </div>
                    </Link>
                ))}
        </div>
     );
};
 
export default ProductsList;