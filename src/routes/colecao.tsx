import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useEffect } from "react";
import { categories, site } from "@/config/site";
import { products } from "@/data/products";
import { ProductCard, BrandMark } from "@/components/storefront";
export const Route=createFileRoute("/colecao")({validateSearch:(s:Record<string,unknown>)=>({categoria:typeof s.categoria==="string"?s.categoria:"todos"}),component:Collection,head:()=>({meta:[{title:"Coleção — VÉRTICE",name:"description",content:"Conheça as peças da coleção VÉRTICE."}]})});
function Collection(){
 const {categoria}=Route.useSearch();const active=categories.some(c=>c.value===categoria)?categoria:"todos";
 const filtered=active==="todos"?products:products.filter(p=>p.category===active);
 useEffect(()=>{window.scrollTo({top:0,behavior:"instant"})},[active]);
 return <main className="collection-page"><div className="collection-intro"><p className="mono eyebrow"><BrandMark/> VÉRTICE / COLEÇÃO</p><div className="collection-title-row"><h1>Coleção<span>.</span></h1><span className="mono collection-count">{filtered.length.toString().padStart(2,"0")} PEÇAS</span></div><nav className="filters mono" aria-label="Filtrar produtos"><Link to="/colecao" search={{categoria:"todos"}} className={active==="todos"?"selected":""}>Todos</Link>{categories.map(c=><Link key={c.value} to="/colecao" search={{categoria:c.value}} className={active===c.value?"selected":""}>{c.label}</Link>)}</nav></div>
 {filtered.length===0?<div className="empty-category"><p>Nenhuma peça nesta categoria.</p><Link to="/colecao" search={{categoria:"todos"}}>Ver tudo <span>→</span></Link></div>:<div className="catalog-grid">{filtered.map((p,i)=><Fragment key={p.id}>{i===6&&<div className="catalog-note"><img src={site.brandImage} alt="Textura e acabamento de tecido" loading="lazy"/><p className="mono">LINHAS PRECISAS. ESCOLHAS DURADOURAS.</p></div>}<div className="catalog-item" style={{transitionDelay:`${i*35}ms`}}><ProductCard product={p}/></div></Fragment>)}</div>}</main>;
}
