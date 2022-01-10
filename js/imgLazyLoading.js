(function() {
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
  })()

  // I will move this to getData to use it as a callback function instead
  // to be called after retrieving the imgs data