
/***********************************************************************************EXTRACT ID FROM URL**************************************************************/
const takeId = window.location.search;
    // console.log(takeId);
const extractId = new URLSearchParams(takeId);
    // console.log(extractId);
const photographerId = extractId.get("id");
    // console.log(photographerId);
 
/******************************************************************************************************************************************************************/

/********************************************************************************DISPLAY PHOTOGRAPHER INFO********************************************************/

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
  pLocation.textContent = infoPhotographer.city + "," + " " + infoPhotographer.country;
      
  const pTag = document.getElementById('pTag');
  pTag.textContent = infoPhotographer.tagline;
      
  const picture = `assets/photographers/${infoPhotographer.portrait}`;

  const pImg = document.getElementById('pImg');
  pImg.setAttribute("src", picture);

};

fetchData();

/***********************************************************************************DISPLAY PHOTOGRAPHER MEDIAS*****************************************************/
let mediaArray = [];
let infoMedia = [];
let allInfo = [];
let likeArray = []; 

async function fetchMedia() {
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((promise) => {allInfo = promise})
    mediaArray = allInfo.media
   
    mediaArray.filter((photographerMedia) => {
      if (photographerMedia.photographerId == photographerId) { 
        infoMedia.push(photographerMedia);
        likeArray.push(photographerMedia.likes)  
       }     
  });

  infoMedia.forEach((photographerMedia) => {
    displayMedia(photographerMedia)
  });
  
/**********************************LIGHT-BOX******************************************************/         
        const gallerys = document.getElementsByClassName('mediaContent')
        let lightBoxTitle = document.getElementsByClassName('lightBoxImgTitle')[0]
        
        for(const gallery of gallerys){ 
          gallery.addEventListener('click', function (e){
            e.preventDefault();
            let lbxTitle = document.getElementsByClassName('mediaTitle')[0].textContent
            lightBoxTitle.textContent = lbxTitle
            const setImg = gallery.getAttribute('src')     
            modal.classList.remove('hidden')
            lightBoxImg.setAttribute('src', setImg)
            smBox = document.getElementById('smallBoxContent')
            smBox.classList.add('hidden')   
         })     
        }
        smallBoxContent()   
};

fetchMedia(); 

function displayMedia(photographerMedia){
  
    const pictures = `assets/medias/${photographerMedia.image}`;   
    const video = `assets/medias/${photographerMedia.video}`;
    const likeSvg = `assets/images/butons/likesvg.svg`;
    const title = photographerMedia.title;
    let like = photographerMedia.likes;
    let likeAmount = Number(like);
    const mediaSection = document.getElementById('media-section');  
    const mediaElements = document.createElement('div');
    mediaElements.classList.add('mediaElements');
     
    if (photographerMedia = photographerMedia.image){
        const mediaContent = document.createElement('img');
        mediaContent.classList.add('mediaContent');
        mediaContent.setAttribute("src", pictures);
        mediaElements.appendChild(mediaContent); 
    } else {
        const mediaContent = document.createElement('video');
        mediaContent.classList.add('videoContent');
        mediaContent.setAttribute("src", video);
        mediaElements.appendChild(mediaContent); 
      }
        const mediaDetails = document.createElement('div');
        mediaDetails.classList.add('mediaDetails');

        const mediaTitle = document.createElement('h2');
        mediaTitle.classList.add('mediaTitle');
        mediaTitle.setAttribute('id', 'mediaT');
        mediaTitle.textContent = title;
      
        const likeElements = document.createElement('div');
        likeElements.classList.add('likeElements');
        const mediaLike = document.createElement('div');
        mediaLike.classList.add('mediaLike');
        mediaLike.setAttribute('id', 'mLike');
        mediaLike.textContent = likeAmount

        const likeLogo = document.createElement('img');
        likeLogo.classList.add('likeLogo');
        likeLogo.setAttribute("src", likeSvg);

        mediaSection.appendChild(mediaElements);     
        mediaElements.appendChild(mediaDetails);
        mediaDetails.appendChild(mediaTitle);
        mediaDetails.appendChild(likeElements);
        likeElements.appendChild(mediaLike);
        likeElements.appendChild(likeLogo);
       
        const likeHeart = likeElements.getElementsByClassName('likeLogo')[0];
          likeHeart.addEventListener('click', function (e){   
            e.preventDefault();
            likePhoto(e);
          })
}

function likePhoto (el){
  let heartSelect = el.target.parentElement.getElementsByClassName('mediaLike')[0];
  let likeNumberConvert = parseInt(heartSelect.textContent);
  let likeSests = document.getElementsByClassName('likeAdd')[0];
  let likeSest = parseInt(likeSests.textContent);

  if (heartSelect.classList.contains('liked')) {  
    likeNumberConvert--
    heartSelect.textContent = likeNumberConvert
    likeSest-- 
    likeSests.textContent = likeSest
    heartSelect.classList.remove("liked");
            
  } else {           
     likeNumberConvert++
     heartSelect.textContent = likeNumberConvert
     likeSest++
     likeSests.textContent = likeSest; 
     heartSelect.classList.add("liked");      
  }   
}
/*******************************LIGHT-BOX**********************************************/

const modal = document.getElementById('lightBox');       
const lightBoxImg = document.getElementById('modalImg');
       
const prev = document.getElementsByClassName('rightButon')[0];
const close = document.getElementsByClassName('closeButon')[0];
const likeCounts = document.getElementsByClassName('mediaLike');

let getLightBoxImg = document.getElementsByClassName('imgLightBox')[0];
const next = document.getElementsByClassName('leftButon')[0];
const mediaGallerys = [document.getElementsByClassName('mediaContent')]; 

next.addEventListener('click', function (e){
  e.preventDefault();

  console.log(getLightBoxImg);

for(let mediaGallery of mediaGallerys){ 
 console.log(mediaGallery);
    
}

})

prev.addEventListener('click', function (e){
    e.preventDefault();
    console.log('prev'); 
}) 
  
close.addEventListener('click', function (e){
  e.preventDefault();
  modal.classList.add('hidden');
  smBox.classList.remove('hidden');        
})  

function smallBoxContent(){

let sumLikes = likeArray.reduce((a, b) => {
  return a + b;
});

const smallBoxContent = document.getElementById('smallBoxContent');
const likesElements = document.createElement('div');
    likesElements.classList.add('likesElements');
let likeAdd = document.createElement('div');
    likeAdd.classList.add('likeAdd');
    likeAdd.textContent = sumLikes;
const likeSvg = `assets/images/butons/likesvg.svg`;
const smallLogo = document.createElement('img');
    smallLogo.classList.add('smallLogo');
    smallLogo.setAttribute("src", likeSvg);
const smallPhotographerPrice = document.createElement('div');
    smallPhotographerPrice.classList.add('boxPrice');
    smallPhotographerPrice.textContent = infoPhotographer.price + "€/jour"; 
    
    smallBoxContent.appendChild(likesElements);
    likesElements.appendChild(likeAdd);
    likesElements.appendChild(smallLogo);
    smallBoxContent.appendChild(smallPhotographerPrice);

  }



