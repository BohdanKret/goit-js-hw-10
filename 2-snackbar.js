import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as t}from"./assets/vendor-BbbuE1sJ.js";const r=document.querySelector(".form");r.addEventListener("submit",l);function l(s){s.preventDefault();const o=Number(s.target.elements.delay.value),i=s.target.elements.state.value;new Promise((e,a)=>{setTimeout(()=>{i==="fulfilled"?e(o):a(o)},o)}).then(e=>{t.show({message:`✅ Fulfilled promise in ${e}ms`,messageColor:"white",backgroundColor:"#59A10D",position:"topRight",close:!1,progressBar:!1})}).catch(e=>{t.show({message:`❌ Rejected promise in ${e}ms`,messageColor:"white",backgroundColor:"#EF4040",position:"topRight",close:!1,progressBar:!1})}),r.reset()}
//# sourceMappingURL=2-snackbar.js.map
