const retrieveData = () => {
  fetch("https://picsum.photos/v2/list?page=2&limit=99")
    .then((response) => response.json())
    .then((results) => displayPhotos(results));
};

const displayPhotos = (photoResults) => {
  const photoContainer = document.querySelector(".root");

  let genHtmlContent = '<div class="container-fluid w-75"><div class="row justify-content-md-center">';
  photoResults.forEach(({ id, author, download_url, width, height }) => {
    genHtmlContent += `
    <div class="col-12 col-lg-6 col-xl-4 my-3">
    <div class="card text-center">
       <div class="author_name card-header">
          <i class="fas fa-user"></i> Author: 
          <span class="text-muted">${author}</span>
       </div>
       <img src=https://picsum.photos/id/${id}/${width}/ loading="lazy"
          class="card-img-top filtered">
       <div class="card-body">
          <div class="card-title">
             <ul class="list-group border-0">
                <li class="list-group-item border-0">Id:${id}</li>
                <li class="list-group-item border-0">Width:${width}px</li>
                <li class="list-group-item border-0">Height:${height}px</li>
             </ul>
          </div>
          <a target="_blank" href=${download_url} 
             class="center btn btn-outline-dark my-3">
          <i class="fas fa-arrow-circle-down"></i> 
          Download Photo!</a>
       </div>
    </div>
 </div>`;
  });

  genHtmlContent += "</div></div>";
  photoContainer.innerHTML = genHtmlContent;
};
