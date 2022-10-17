
/***EXTRACT ID FROM URL**************************************************************/
const takeId = window.location.search;
    // console.log(takeId);
const extractId = new URLSearchParams(takeId);
    // console.log(extractId);
const photographerId = extractId.get("id");
    // console.log(photographerId);

/***************************************************************************************/

/***DISPLAY PHOTOGRAPHER INFO********************************************************/

let infoPhotographer = "";
let photographerArray = [];

async function fetchData() {
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((promise) => {photographerArray = promise.photographers});
 
  photographerArray.filter((photographerElement) => {
    if (photographerElement.id == photographerId) {
      infoPhotographer = photographerElement;     
    }
  });
  
  const pName = document.getElementById('pName');
  pName.textContent = infoPhotographer.name;

  const pLocation = document.getElementById('pLocation');
  pLocation .textContent = infoPhotographer.city + "," + " " + infoPhotographer.country;
      
  const pTag = document.getElementById('pTag');
  pTag .textContent = infoPhotographer.tagline;
      
  const picture = `assets/photographers/${infoPhotographer.portrait}`;

  const pImg = document.getElementById('pImg');
  pImg.setAttribute("src", picture);  
};

fetchData();

/**************************************************************************************** */

/***DISPLAY PHOTOGRAPHER MEDIAS*****************************************************/
let mediaArray = [];
let infoMedia = [];

async function fetchMedia() {
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((promise) => {mediaArray = promise.media});
    
    mediaArray.filter((photographerMedia) => {
      if (photographerMedia.photographerId == photographerId) {
        infoMedia.push(photographerMedia);
        console.log(infoMedia);       
       }     
  });
  
  infoMedia.forEach((photographerMedia) => {
    const pictures = `assets/medias/${photographerMedia.image}`;   
    const video = `assets/medias/${photographerMedia.video}`;
    const likeSvg = `assets/images/likesvg.svg`;
    const title = photographerMedia.title;
    const like = photographerMedia.likes;

    const mediaSection = document.getElementById('media-section')
      
    const mediaElements = document.createElement('div')
    mediaElements.classList.add('mediaElements')

    if (photographerMedia = photographerMedia.image){
        const mediaContent = document.createElement('img')
        mediaContent.classList.add('mediaContent')
        mediaContent.setAttribute("src", pictures);
        mediaElements.appendChild(mediaContent) 
    } else {
        const mediaContent = document.createElement('video')
        mediaContent.classList.add('videoContent')
        mediaContent.setAttribute("src", video);
        mediaElements.appendChild(mediaContent) 
      }
        const mediaDetails = document.createElement('div')
        mediaDetails.classList.add('mediaDetails')

        const mediaTitle = document.createElement('h2')
        mediaTitle.classList.add('mediaTitle')
        mediaTitle.textContent = title;
      
        const likeElements = document.createElement('div')
        likeElements.classList.add('likeElements')
        const mediaLike = document.createElement('div')
        mediaLike.classList.add('mediaLike')
        mediaLike.textContent = like;

        const likeLogo = document.createElement('img')
        likeLogo.classList.add('likeLogo')
        likeLogo.setAttribute("src", likeSvg)
       
        mediaSection.appendChild(mediaElements)     
        mediaElements.appendChild(mediaDetails)
        mediaDetails.appendChild(mediaTitle)
        mediaDetails.appendChild(likeElements)
        likeElements.appendChild(mediaLike)
        likeElements.appendChild(likeLogo)
  }); 
};  

fetchMedia();

  /***********************************************************************************/

















