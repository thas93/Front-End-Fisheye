
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
  
  profilCreation();

};

fetchData();

function profilCreation(){
  const pName = document.getElementById('pName');
  pName.textContent = infoPhotographer.name;

  const pLocation = document.getElementById('pLocation');
  pLocation.textContent = infoPhotographer.city + "," + " " + infoPhotographer.country;
      
  const pTag = document.getElementById('pTag');
  pTag.textContent = infoPhotographer.tagline;
      
  const picture = `assets/photographers/${infoPhotographer.portrait}`;

  const pImg = document.getElementById('pImg');
  pImg.setAttribute("src", picture);
}

/***********************************************************************************DISPLAY PHOTOGRAPHER MEDIAS*****************************************************/
let mediaArray = [];
let infoMedia = [];
let allInfo = [];
let likeArray = [];
let currentIndexMedia = ""; 
let currentFilter = 'popularity'

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

      if (currentFilter === 'popularity'){
        popularity();
      }
    
    infoMedia.forEach((photographerMedia) => {  
      displayMedia(photographerMedia);   
  });
         
  //  function getIndex(){
  //    for (let i = 0; i < gallerys.length; i++) {
  //       let gallery = gallerys[i]
  //         gallery.addEventListener('click', function (e){
  //           e.preventDefault(); 
  //           console.log('open Light Box');
  //           openLightBox (e, gallery, gallerys)
  //             currentIndexMedia = i;
  //         })     
  //     }  
  //   }
  // // getIndex();
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
        mediaContent.setAttribute('data-type', 'image');
        mediaContent.setAttribute("src", pictures);
        mediaElements.appendChild(mediaContent); 
    } 
    else {
        const mediaContent = document.createElement('video');
        mediaContent.classList.add('mediaContent');
        mediaContent.setAttribute('data-type', 'video');
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

/******************************************************************************************LIGHT-BOX***********************************************************************/
const body = document.getElementsByTagName('body')[0];
console.log(body);
let lightBoxTitle = document.getElementsByClassName('lightBoxImgTitle')[0];
const modal = document.getElementById('lightBox');       
let lightBoxImg = document.getElementById('modalImg');   
let lightBoxVideo = document.getElementById('modalVideo');
const next = document.getElementsByClassName('leftButon')[0];
const prev = document.getElementsByClassName('rightButon')[0];
const close = document.getElementsByClassName('closeButon')[0];
const likeCounts = document.getElementsByClassName('mediaLike');
let getLightBoxImg = document.getElementsByClassName('imgLightBox')[0];
const popularitys = document.getElementsByClassName('popularity')[0];
const dateItem = document.getElementsByClassName('date-item')[0];
const titleItem = document.getElementsByClassName('title-item')[0];
const gallerys = document.getElementsByClassName('mediaContent');

function filterLightBox (){
  for (let i = 0; i < gallerys.length; i++) {
    let gallery = gallerys[i]
    gallery.addEventListener('click', function (e){
    e.preventDefault(); 
    openLightBox (e, gallery, gallerys)
    currentIndexMedia = i;
    })     
  }
};

function dateFilter(){
  currentFilter = 'date';
  let newDate = infoMedia.sort((a, b) => (a.date < b.date ? 1 : -1));
  document.getElementById('media-section').innerHTML = "";
  newDate.forEach((photographerMedia) => {
  displayMedia(photographerMedia);
  filterLightBox ();
  });
};

function titleFilter(){
  currentFilter = 'title';
  let newTitle = infoMedia.sort((a, b) => (a.title < b.title ? -1 : +1));
  console.log(newTitle, 'title');
  document.getElementById('media-section').innerHTML = "";
  newTitle.forEach((photographerMedia) => {
    displayMedia(photographerMedia);
    filterLightBox ();
  });
};

function popularity(){
  const newInfo = infoMedia.sort((a, b) => (a.likes < b.likes ? 1 : -1))
  document.getElementById('media-section').innerHTML = "";
  newInfo.forEach((photographerMedia) => {
    displayMedia(photographerMedia);
    filterLightBox ();
  });
};

function openLightBox (e, gallery) {
  body.classList.add('hiddenScroll')
  modal.classList.remove('hidden');
  let getTittle = e.target.parentElement.getElementsByClassName('mediaTitle')[0].textContent;
  lightBoxTitle.textContent = getTittle;
  const setMedia = gallery.getAttribute('src');     
  let dataType = gallery.getAttribute('data-type');

  if(dataType ==='video'){
    lightBoxVideo.setAttribute('src', setMedia);
    lightBoxImg.classList.add('hidden');
    lightBoxVideo.classList.remove('hidden');
  } 
  else{
    lightBoxImg.setAttribute('src', setMedia);
    lightBoxVideo.classList.add('hidden');
    lightBoxImg.classList.remove('hidden');
  }
};

function name(){
  let newName = infoMedia.sort((a, b) => (a.title > b.title ? 1 : -1))
  console.log(newName, 'newName'); 
};

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
};

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
  
  const likeSvg = `assets/images/butons/like-black.svg`;
  
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

};

function moveImg (direction){
  let nextIndex = currentIndexMedia+direction;
  currentIndexMedia = currentIndexMedia+direction;
  let typeMedia = infoMedia[nextIndex].image ? 'image' : 'video';
  setNextImg = `assets/medias/${infoMedia[nextIndex].image}`;
  setNexVideo = `assets/medias/${infoMedia[nextIndex].video}`;
  lightBoxTitle.textContent = infoMedia[nextIndex].title; 
  
  if( typeMedia === 'video'){ 
    lightBoxVideo.setAttribute('src', setNexVideo);
    lightBoxImg.classList.add('hidden');
    lightBoxVideo.classList.remove('hidden'); 
  } else {
    setNextImg = `assets/medias/${infoMedia[nextIndex].image}`;
    lightBoxImg.setAttribute('src', setNextImg);
    lightBoxImg.classList.remove('hidden');
    lightBoxVideo.classList.add('hidden');
  }
};

dateItem.addEventListener('click', function (e){
  e.preventDefault();
  dateFilter();
});

popularitys.addEventListener('click', function (e){
  e.preventDefault();
  popularity();
});

titleItem.addEventListener('click', function (e){
  e.preventDefault();
  titleFilter();
});

next.addEventListener('click', function (e){
  e.preventDefault();
  const direction = 1;
  moveImg(direction);  
});

prev.addEventListener('click', function (e){
  e.preventDefault();
  const direction = (-1);
  moveImg(direction);
}); 
  
close.addEventListener('click', function (e){
  e.preventDefault();
  modal.classList.add('hidden'); 
  body.classList.remove('hiddenScroll');     
}); 









