import{F as I,j as s,P as t,e as b,f as h,g as T,h as N,r as A,i as S,B as m,T as B,br as Y,bs as D,bt as y,bu as z,bv as W,bw as M,bx as q,by as P,bz as H,bA as R,a as X,bB as _,bC as G,l as J,m as K,n as Q}from"./index-BgAz6R-J.js";/* empty css                */import{F as V}from"./FetchProgrammeData-DNSy9I4u.js";import{I as Z}from"./IconButton-DXnj9XZJ.js";import{A as $}from"./ArrowBack-BkYkn4Tn.js";import{C as O}from"./Collapse-C0Rhz45J.js";const U=I(s.jsx("path",{d:"m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"}),"ArrowForward");function L({isSidebarOpen:e,toggleSidebar:i,setCurrentAction:n,setCurrentLink:a,navbar:w}){var p,g,j;const d=b(),o=h(T),x=h(N),f=V(),c=x==null?void 0:x.find(r=>(r==null?void 0:r.uniqueId)===(o==null?void 0:o.uniqueId)),l=f==null?void 0:f.find(r=>{var u;return(r==null?void 0:r._id)===((u=c==null?void 0:c.studentSchoolData)==null?void 0:u.program)});return console.log(f),console.log(l),A.useEffect(()=>{d(S())},[d]),s.jsxs(s.Fragment,{children:[s.jsxs(m,{sx:{backgroundColor:"#292929",padding:".5rem",borderBottom:"2px solid #02b202"},children:[s.jsx(Z,{sx:{position:"absolute",top:".5rem",right:"0",color:"#fff"},onClick:i,children:e?s.jsx($,{sx:{transition:"width 0.5s ease"}}):s.jsx(U,{sx:{transition:"width 0.5s ease"}})}),s.jsxs(m,{className:"userInfo",children:[s.jsx("img",{src:(g=(p=o==null?void 0:o.personalInfo)==null?void 0:p.profilePicture)==null?void 0:g.url,alt:""}),e&&s.jsxs(O,{in:e,className:"infoText",children:[s.jsx("span",{children:(j=o==null?void 0:o.personalInfo)==null?void 0:j.fullName}),o&&s.jsxs(B,{children:["(",l==null?void 0:l.name,")"]})]})]})]}),s.jsx(m,{component:"div",id:"sidebarContentWrap",sx:{padding:e?"0 1rem":"0 .5rem"},children:s.jsx(m,{sx:{color:"#fff"},children:s.jsxs("div",{className:"sidebarContentLinksWrap",children:[s.jsx(s.Fragment,{children:s.jsx(Y,{isSidebarOpen:e,setCurrentAction:n,setCurrentLink:a})}),s.jsx(s.Fragment,{children:s.jsx(D,{isSidebarOpen:e,setCurrentAction:n,setCurrentLink:a})}),s.jsx(s.Fragment,{children:s.jsx(y,{isSidebarOpen:e,setCurrentAction:n,setCurrentLink:a})}),s.jsx(s.Fragment,{children:s.jsx(z,{isSidebarOpen:e,setCurrentAction:n,setCurrentLink:a})}),s.jsx(s.Fragment,{children:s.jsx(W,{isSidebarOpen:e,setCurrentAction:n,setCurrentLink:a})}),s.jsx(s.Fragment,{children:s.jsx(M,{isSidebarOpen:e,setCurrentAction:n,setCurrentLink:a})})]})})})]})}L.propTypes={isSidebarOpen:t.bool,toggleSidebar:t.func,setCurrentAction:t.func,setCurrentLink:t.func,navbar:t.bool};const ss=()=>{const e=b(),i=h(q);return A.useEffect(()=>{e(P())},[e]),i},es=()=>{const e=ss();return e==null?void 0:e.find(n=>(n==null?void 0:n.isCurrent)===!0&&n)},ns=()=>{const e=b(),i=h(H);return A.useEffect(()=>{e(R())},[e]),i},ts=()=>{const e=ns();return e==null?void 0:e.find(n=>(n==null?void 0:n.isCurrent)===!0&&n)};function os({isSidebarOpen:e,setSidebarOpen:i,toggleSidebar:n,setCurrentAction:a,setCurrentLink:w,hovered:d,setHovered:o,drawerWidthCollapsed:x,drawerWidthExpanded:f}){var v,F;const c=h(T),l=es(),p=ts(),g=b(),j=X(),[r,u]=A.useState(!1),k=()=>{window.scrollY>=25?u(!0):u(!1)};window.addEventListener("scroll",k);const E=C=>{C.preventDefault(),c&&(g(K()),j("/sensec/homepage"),Q.success("You logged out Successfully!",{position:"top-right",theme:"dark",toastId:"loggedOut"}))};return s.jsxs(_,{variant:"permanent",anchor:"left",onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1),className:"sidebar",sx:{"& .MuiDrawer-paper":{position:"fixed",top:0,left:0,height:"100vh",width:d?f:x,transition:"width 0.3s",overflowX:"hidden",backgroundColor:"#292929"}},children:[((v=c==null?void 0:c.roles)==null?void 0:v.includes("admin"))&&s.jsx(G,{isSidebarOpen:e,toggleSidebar:n,setCurrentAction:a,setCurrentLink:w,navbar:r,hovered:d,currentTerm:l,currentAcademicYear:p}),((F=c==null?void 0:c.roles)==null?void 0:F.includes("student"))&&s.jsx(L,{isSidebarOpen:e,toggleSidebar:n,setCurrentAction:a,setCurrentLink:w,navbar:r,currentTerm:l}),s.jsx(m,{sx:{},bgcolor:"red",position:"absolute",bottom:0,left:0,width:"inherit",display:"flex",justifyContent:"center",children:s.jsx(J,{sx:{textTransform:"capitalize",color:"#fff",fontSize:"1rem",textAlign:d&&"center",letterSpacing:"1px"},onClick:E,children:s.jsx(B,{width:"100%",textAlign:"center",children:"Logout"})})})]})}os.propTypes={setSidebarOpen:t.func,isSidebarOpen:t.bool,toggleSidebar:t.func,setCurrentAction:t.func,setCurrentLink:t.func,hovered:t.bool,setHovered:t.func,drawerWidthCollapsed:t.number,drawerWidthExpanded:t.number};export{os as SideBar};