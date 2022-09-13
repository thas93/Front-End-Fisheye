//Mettre le code JavaScript lié à la page photographer.html

// GET PHOGRAPHERS DATA FROM JSON FILE
async function getPhotographers() {   
    try {
      const recup = await fetch('./data/photographers.json');
      return await recup.json();
      
    } catch (error) {
      console.log(error);
    }
    
  }
  getPhotographers;
  // DISPLAY PHOTOGRAPHERS CARDS
  async function displayData(photographers) {
      const photographersHeader = document.querySelector(".photograph-header");
  
      photographers.forEach((photographer) => {
          const persoPhotographerModel = photographerPersoFactory(photographer);
          const PhotographCardDOM = photographerModel.getphotographCardDOM();
          photographersSection.appendChild(PhotographCardDOM);
      });
  };
  
  async function init() {
      const {photographers} = await getPhotographers();
      displayData(photographers);
  };
  
  init();
  
  
  
  
  
  
