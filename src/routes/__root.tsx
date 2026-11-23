import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts, type ErrorComponentProps } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/components/cart";
import { Header, Footer, CartDrawer } from "@/components/storefront";

function NotFoundComponent() {
  return <main className="not-found"><p className="mono eyebrow">VÉRTICE / 404</p><h1>Esta página não existe.</h1><p>O endereço pode estar incorreto ou a peça não está mais disponível.</p><Link to="/" className="button button-light">Voltar ao início</Link></main>;
}
function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return <main className="not-found"><p className="mono eyebrow">VÉRTICE / ERRO</p><h1>Não foi possível carregar.</h1><p>Tente novamente ou volte para a página inicial.</p><div className="error-actions"><button className="button button-outline" onClick={()=>{router.invalidate();reset();}}>Tentar novamente</button><Link to="/" className="button button-light">Voltar ao início</Link></div></main>;
}
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
 head:()=>({meta:[{charSet:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1"},{title:"VÉRTICE — Vista sua própria direção"},{name:"description",content:"Moda masculina casual e urbana. Cortes limpos, tecidos escolhidos com critério."},{property:"og:type",content:"website"},{property:"og:title",content:"VÉRTICE — Vista sua própria direção"},{property:"og:description",content:"Moda masculina casual e urbana."},{name:"theme-color",content:"#0B0B0C"}],links:[{rel:"stylesheet",href:appCss},{rel:"icon",href:"/favicon.svg",type:"image/svg+xml"},{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..125,400;75..125,500;75..125,600;75..125,700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"}]}),
 shellComponent:RootShell,component:RootComponent,notFoundComponent:NotFoundComponent,errorComponent:ErrorComponent
});
function RootShell({children}:{children:ReactNode}){return <html lang="pt-BR"><head><HeadContent/></head><body>{children}<Scripts/></body></html>}
function RootComponent(){const {queryClient}=Route.useRouteContext();return <QueryClientProvider client={queryClient}><CartProvider><Header/><Outlet/><Footer/><CartDrawer/></CartProvider></QueryClientProvider>}
