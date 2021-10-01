const retrieveData = () => {
  fetch("https://picsum.photos/v2/list?page=2&limit=99")
    .then((response) => response.json())
    .then((results) => displayPhotos(results));
};

const displayPhotos = (photoResults) => {
  const photoContainer = document.querySelector(".unsplash");

  let genHtmlContent =
    '<div class="container-fluid w-75"><div class="row justify-content-md-center">';
  photoResults.forEach(({ id, author, download_url, width }) => {
    genHtmlContent += `
            <div class="col-12 col-md-6 col-lg-4 my-3">
            <div class="card align-items-center">
            <img src=https://picsum.photos/id/${id}/${width}/ loading="lazy"
            class="card-img-top filtered">
            <div class="card-body">
            <h5 class="text-center author_name card-title">Photographer: ${author}</h5>
            <a target="_blank" href=${download_url} class="btn btn-outline-dark w-100 mx-auto my-3">Download Photo!</a>
            </div></div></div>`;
  });

  genHtmlContent += "</div></div>";
  photoContainer.innerHTML = genHtmlContent;
};
