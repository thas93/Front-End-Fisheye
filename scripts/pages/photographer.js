
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

  const smallBoxContent = document.getElementById('smallBoxContent')

  const smallPhotographerPrice = document.createElement('div')
  smallPhotographerPrice.classList.add('boxPrice')
  smallPhotographerPrice.textContent = infoPhotographer.price + "€/jour" 
  smallBoxContent.appendChild(smallPhotographerPrice)

};

fetchData();

/**************************************************************************************** */

/***DISPLAY PHOTOGRAPHER MEDIAS*****************************************************/
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

  let sumLikes = likeArray.reduce((a, b) => {
      return a + b;
  });
 
  const smallBoxContent = document.getElementById('smallBoxContent')
  const likeAdd = document.createElement('div')
        likeAdd.classList.add('likeAdd')
        likeAdd.textContent = sumLikes;
  const likeSvg = `assets/images/butons/likesvg.svg`;
  const smallLogo = document.createElement('img')
        smallLogo.classList.add('smallLogo')
        smallLogo.setAttribute("src", likeSvg)
  
        smallBoxContent.appendChild(likeAdd)
        smallBoxContent.appendChild(smallLogo)
  
  infoMedia.forEach((photographerMedia) => {
    const pictures = `assets/medias/${photographerMedia.image}`;   
    const video = `assets/medias/${photographerMedia.video}`;
    const likeSvg = `assets/images/butons/likesvg.svg`;
    const title = photographerMedia.title;
    const like = photographerMedia.likes;
    let likeAmount = Number(like)
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
        mediaTitle.setAttribute('id', 'mediaT')
        mediaTitle.textContent = title;
      
        const likeElements = document.createElement('div')
        likeElements.classList.add('likeElements')
        const mediaLike = document.createElement('div')
        mediaLike.classList.add('mediaLike')
        mediaLike.setAttribute('id', 'mLike')
        mediaLike.textContent = likeAmount

        const likeLogo = document.createElement('img')
        likeLogo.classList.add('likeLogo')
        likeLogo.setAttribute("src", likeSvg)

        mediaSection.appendChild(mediaElements)     
        mediaElements.appendChild(mediaDetails)
        mediaDetails.appendChild(mediaTitle)
        mediaDetails.appendChild(likeElements)
        likeElements.appendChild(mediaLike)
        likeElements.appendChild(likeLogo)


/**********************************LIGHT-BOX******************************************************/         
        const gallerys = document.getElementsByClassName('mediaContent')
        const likeHearts = document.getElementsByClassName('likeLogo')
        
        for(const gallery of gallerys){ 
          gallery.addEventListener('click', function (e){
            e.preventDefault();
            const setImg = gallery.getAttribute('src')      
            modal.classList.remove('hidden')
            lightBoxImg.setAttribute('src', setImg)           
          })
        }
        let likeCker = false 
        for(const likeHeart of likeHearts){
          likeHeart.addEventListener('click', function (e){   
            e.preventDefault(); 
            let heartSelect = e.target.parentElement.textContent
            let likeNumberConvert = Number(heartSelect)
            
            likeCker = !likeCker
            likeCker ? likeNumberConvert = likeNumberConvert+1 : likeNumberConvert = likeNumberConvert-0
            likeString = likeNumberConvert.toString()
            console.log(heartSelect);
            heartSelect = likeString
            console.log(likeString);
            
            
            
            
        
                      
          
         
          
          
          
          })
        }
  });
};  

fetchMedia(); 
/*******************************LIGHT-BOX**********************************************/

  
const mElements = document.getElementsByClassName('mediaElements')
const modal = document.getElementById('lightBox')       
const lightBoxImg = document.getElementById('modalImg')
const lightBoxTitle = document.getElementById('lightBoxImgTitle')     
const next = document.getElementsByClassName('leftButon')[0]    
const prev = document.getElementsByClassName('rightButon')[0]
const close = document.getElementsByClassName('closeButon')[0]
const likeCounts = document.getElementsByClassName('mediaLike')



for(const mElement of mElements){           
  mElement.addEventListener('click', function (e){
    e.preventDefault();
    const elementTitle = mElement.querySelector('.mediaTitle').textContent
    lightBoxTitle.innerHTML = elementTitle            
  })
}

next.addEventListener('click', function (e){
    e.preventDefault();
    console.log('next');       
}) 

prev.addEventListener('click', function (e){
    e.preventDefault();
    console.log('prev'); 
}) 
  
          

close.addEventListener('click', function (e){
  e.preventDefault();
  modal.classList.add('hidden')        
})  
















