
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartProduct, useCart } from "../context/cart";

interface CartItemProps {
    product: CartProduct;
}

export const CartProductItem = ({product}: CartItemProps) => {
    const { decreaseProductQuantity, increaseProductQuantity, removeProduct } = useCart();

    const handleDecreaseProductQuantity =  () => {
        decreaseProductQuantity(product.id);
    }
    const handleIncreaseProductQuantity = () => {
        increaseProductQuantity(product.id);
    }
    const handleRemoveProduct = () => {
        removeProduct(product.id);
    }
    return ( 
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 p-3">
                <div className="relative h-20 w-20 rounded-xl bg-gray-100">
                    <Image src={product.imageUrl} alt={product.name} fill/>
                </div>
                <div className="space-y-1">
                    <p className="max-w-[90%] truncate text-ellipsis text-xs">{product.name}</p>
                    <p className="text-sm font-semibold">
                        {formatCurrency(product.price)}
                    </p>
                    <div className="flex items-center gap-1 text-center">
                        <Button 
                            className="rounded-lg h-7 w-7" 
                            variant="outline"
                            onClick={handleDecreaseProductQuantity}
                        >
                            <ChevronLeftIcon />
                        </Button>
                        <p className="w-7 text-xs">{product.quantity}</p>
                        <Button 
                            className="rounded-lg h-7 w-7" 
                            variant="destructive"
                            onClick={handleIncreaseProductQuantity}
                        >
                            <ChevronRightIcon />
                        </Button> 
                    </div>
                </div>
            </div>
            <Button 
                className="h-7 w-7 rounded-lg" 
                variant="outline"
                onClick={handleRemoveProduct}
            >
                <TrashIcon />
            </Button>
        </div>
    );
}
 
export default CartProductItem;