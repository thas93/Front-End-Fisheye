// GET PHOGRAPHERS DATA FROM JSON FILE
async function getPhotographers() {   
  try {
    const recup = await fetch('./data/photographers.json');
    return await recup.json();
    
  } catch (error) {
    console.log(error);
  }
  
}

// DISPLAY PHOTOGRAPHERS CARDS
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    const {photographers} = await getPhotographers();
    displayData(photographers);
};

init();





