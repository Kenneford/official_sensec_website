import{o as M,p as R,bi as P,bj as S,s as v,t as c,v as b,r as w,w as N,j as n,x as U,y as z,z as E}from"./index-BgAz6R-J.js";function F(e){return M("MuiCircularProgress",e)}R("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const t=44,g=P`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,y=P`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`,I=typeof g!="string"?S`
        animation: ${g} 1.4s linear infinite;
      `:null,A=typeof y!="string"?S`
        animation: ${y} 1.4s ease-in-out infinite;
      `:null,K=e=>{const{classes:r,variant:s,color:a,disableShrink:l}=e,p={root:["root",s,`color${c(a)}`],svg:["svg"],circle:["circle",`circle${c(s)}`,l&&"circleDisableShrink"]};return z(p,F,r)},L=v("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.root,r[s.variant],r[`color${c(s.color)}`]]}})(b(({theme:e})=>({display:"inline-block",variants:[{props:{variant:"determinate"},style:{transition:e.transitions.create("transform")}},{props:{variant:"indeterminate"},style:I||{animation:`${g} 1.4s linear infinite`}},...Object.entries(e.palette).filter(E()).map(([r])=>({props:{color:r},style:{color:(e.vars||e).palette[r].main}}))]}))),V=v("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),B=v("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.circle,r[`circle${c(s.variant)}`],s.disableShrink&&r.circleDisableShrink]}})(b(({theme:e})=>({stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{transition:e.transitions.create("stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:({ownerState:r})=>r.variant==="indeterminate"&&!r.disableShrink,style:A||{animation:`${y} 1.4s ease-in-out infinite`}}]}))),G=w.forwardRef(function(r,s){const a=N({props:r,name:"MuiCircularProgress"}),{className:l,color:p="primary",disableShrink:$=!1,size:u=40,style:D,thickness:i=3.6,value:m=0,variant:h="indeterminate",...j}=a,o={...a,color:p,disableShrink:$,size:u,thickness:i,value:m,variant:h},d=K(o),f={},x={},k={};if(h==="determinate"){const C=2*Math.PI*((t-i)/2);f.strokeDasharray=C.toFixed(3),k["aria-valuenow"]=Math.round(m),f.strokeDashoffset=`${((100-m)/100*C).toFixed(3)}px`,x.transform="rotate(-90deg)"}return n.jsx(L,{className:U(d.root,l),style:{width:u,height:u,...x,...D},ownerState:o,ref:s,role:"progressbar",...k,...j,children:n.jsx(V,{className:d.svg,ownerState:o,viewBox:`${t/2} ${t/2} ${t} ${t}`,children:n.jsx(B,{className:d.circle,style:f,ownerState:o,cx:t,cy:t,r:(t-i)/2,fill:"none",strokeWidth:i})})})});function T({color:e,size:r}){return n.jsx(G,{style:{color:e},size:r})}export{T as L};
