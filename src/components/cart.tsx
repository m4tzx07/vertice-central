import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";
type CartItem = { product: Product; size: string; quantity: number };
type CartContextValue = { items: CartItem[]; isOpen: boolean; openCart:()=>void; closeCart:()=>void; addItem:(product:Product,size:string,quantity?:number)=>void; changeQuantity:(key:string,delta:number)=>void; removeItem:(key:string)=>void; clear:()=>void; count:number; total:number };
const CartContext = createContext<CartContextValue|null>(null);
const keyOf = (item:CartItem) => item.product.id + "::" + item.size;
export function CartProvider({children}:{children:ReactNode}) {
  const [items,setItems] = useState<CartItem[]>([]);
  const [isOpen,setIsOpen] = useState(false);
  useEffect(()=>{ try { const raw=localStorage.getItem("vertice-cart"); if(raw) setItems(JSON.parse(raw) as CartItem[]); } catch { setItems([]); } },[]);
  useEffect(()=>{ try { localStorage.setItem("vertice-cart",JSON.stringify(items)); } catch { /* storage may be unavailable */ } },[items]);
  const value = useMemo<CartContextValue>(()=>({
    items,isOpen,openCart:()=>setIsOpen(true),closeCart:()=>setIsOpen(false),
    addItem:(product,size,quantity=1)=>{setItems(current=>{const key=product.id+"::"+size;const found=current.find(x=>keyOf(x)===key);return found?current.map(x=>keyOf(x)===key?{...x,quantity:x.quantity+quantity}:x):[...current,{product,size,quantity}];});setIsOpen(true);},
    changeQuantity:(key,delta)=>setItems(current=>current.map(x=>keyOf(x)===key?{...x,quantity:Math.max(1,x.quantity+delta)}:x)),
    removeItem:(key)=>setItems(current=>current.filter(x=>keyOf(x)!==key)),clear:()=>setItems([]),
    count:items.reduce((sum,x)=>sum+x.quantity,0),total:items.reduce((sum,x)=>sum+x.product.price*x.quantity,0)
  }),[items,isOpen]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart(){const value=useContext(CartContext);if(!value)throw new Error("useCart precisa estar dentro de CartProvider");return value;}
export const cartKey = keyOf;
