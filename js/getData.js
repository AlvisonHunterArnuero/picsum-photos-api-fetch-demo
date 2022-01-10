const retrieveData = () => {
  fetch("https://picsum.photos/v2/list?page=2&limit=99")
    .then((response) => response.json())
    .then((results) => displayPhotos(results)).then(()=>addlazyLoadingSrc());
};

const displayPhotos = (photoResults) => {
  const photoContainer = document.querySelector(".root");

  let generatedHtmlContent = '<div class="container-fluid w-75"><div class="row justify-content-md-center">';
  photoResults.forEach(({ id, author, download_url, width, height }) => {
   generatedHtmlContent += `
    <div class="col-12 col-lg-6 col-xl-4 my-3">
    <div class="card text-center">
       <div class="author_name card-header">
          <i class="fas fa-user"></i> Author: 
          <span class="text-muted">${author}</span>
       </div>
       <img data-src=https://picsum.photos/id/${id}/${width}/ class="card-img-top filtered" loading="lazy"
       onerror="this.onerror=null;this.src='https://placeimg.com/400/400/nature';">
       <div class="card-body">
          <div class="card-title">
             <ul class="list-group border-0">
                <li class="list-group-item border-0 h5">Photo Id:${id}</li>
                <li class="list-group-item border-0 h5">Width:${width}px | Height:${height}px</li>
             </ul>
          </div>
          <a target="_blank" href=${download_url} 
             class="center btn btn-outline-dark my-3">
          <i class="fas fa-arrow-circle-down"></i> 
          Download it now!</a>
       </div>
    </div>
 </div>`;
  });

  generatedHtmlContent += "</div></div>";
  photoContainer.innerHTML = generatedHtmlContent;
};

const addlazyLoadingSrc = () => {
   // miramos si tiene soporte a lazy loading nativo
   const hasNativeLazyLoadSupport = 'loading' in HTMLImageElement.prototype;
   // si tiene soporte nativo de carga diferida...
   if (hasNativeLazyLoadSupport) {
      // recuperamos todas las imágenes e iframes con el atributo
      const lazyEls = document.querySelectorAll("[loading=lazy]");
      // pasamos el data-src a src y dejamos que el navegador haga el resto
      lazyEls.forEach(lazyEl => {
         const src = lazyEl.getAttribute("data-src");
         lazyEl.setAttribute("src", src);
      })
   } else {
      // Cargamos dinámicamente una biblioteca externa para 
      // hacer la carga diferida
      const script = document.createElement("script");
      script.async = true;
      script.src =
         "https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.4.0/dist/lazyload.min.js";

      // esta configuración es necesaria por la librería vanilla-lazyload
      // le indicamos los elementos a los que queremos hacer la carga diferida
      window.lazyLoadOptions = {
         elements_selector: "[loading=lazy]"
      }
      // añadimos el script par la carga asíncrona de la biblioteca
      document.body.appendChild(script);
   }
}
