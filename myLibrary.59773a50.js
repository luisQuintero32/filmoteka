!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},a=n.parcelRequired76b;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var a={id:e,exports:{}};return t[e]=a,n.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){r[e]=n},n.parcelRequired76b=a);var o=a("bpxeT"),i=a("2TvXO"),c=a("8lXr3"),s=a("dLAzy"),l=document.getElementById("watched-movies--btn"),d=document.getElementById("queue-movies--btn"),u=document.getElementById("movies-container"),p=document.querySelector(".pagination__page"),f=1,g=1;d.addEventListener("click",(function(){l.classList.remove("current--btn"),d.classList.add("current--btn");var n=JSON.parse(localStorage.getItem("queueList")),t=n.map((function(e){return fetch("https://api.themoviedb.org/3/movie/".concat(e,"?api_key=").concat(c.API_KEY,"&language=en")).then((function(e){return e.json()}))}));function r(e){var r="";Promise.all(t).then((function(t){var a=n.length;g=function(e){return e>=20?Math.ceil(e/20):1}(a);var o=(0,s.generatePages)(e,g);p.innerHTML=o;for(var i=1===e?0:20*(e-1),c=Math.min(20*e,t.length),l=i;l<c;l++){var d=t[l];""===d.release_date&&(d.release_date="Sin año registrado");var f="".concat("https://image.tmdb.org/t/p/","w500").concat(d.poster_path),m=d.genres.map((function(e){return e.name})).join(" | "),v='\n            <div class="photo-card">\n              <div class="info">\n                <a onclick="openModal(\''.concat(d.id,'\')" class="info__poster">\n                  <img class="info__poster--img" src="').concat(f,'" alt="').concat(d.title,'" loading="lazy" width="100px" height="100px" id="info__poster--img" />\n                </a>\n                <h3 class="info__title">\n                  <strong class="title">').concat(d.title,'</strong>\n                </h3>\n                <p class="info__genre">\n                  ').concat(m," | ").concat(new Date(d.release_date).getFullYear(),'\n                </p>\n                <p class="info-item"></p>\n              </div>\n            </div>\n          ');r+=v}u.innerHTML=r})).catch((function(e){return console.error(e)}))}function a(){document.getElementById("current-page").innerText=f}r(1),p.addEventListener("click",(function(e){if("LI"===e.target.tagName){var n=e.target.innerText,t=parseInt(n);"..."===n||(f=t,e.stopPropagation(),r(f))}})),document.getElementById("library__prev-page").addEventListener("click",e(o)(e(i).mark((function n(){return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(f>1)){e.next=5;break}return f--,e.next=4,r(parseInt(f));case 4:a();case 5:case"end":return e.stop()}}),n)})))),document.getElementById("library__next-page").addEventListener("click",e(o)(e(i).mark((function n(){return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(f<g)){e.next=5;break}return f++,e.next=4,r(parseInt(f));case 4:a(parseInt(f));case 5:case"end":return e.stop()}}),n)}))))}))}();
//# sourceMappingURL=myLibrary.59773a50.js.map
