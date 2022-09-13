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






/*************************************************************************************************/ 
// async function getPhotographers() {
//     // Penser à remplacer par les données récupérées dans le json
    
//     const photographers = 
//         fetch('./data/photographers.json')
//         .then(response => response.json(response))
//         .then (response => {
//             return console.log(response.photographers);
            
            
//         })
//         .catch(err => {
//             // throw new Error('La requete api getPhotographer a échoué : ', err)
//           }) 
    
        
       
    
//     // et bien retourner le tableau photographers seulement une fois
//     // return ({
//     //     photographers: [...photographers]})
// }

// getPhotographers();
// async function displayData(photographers) {
//     const photographersSection = document.querySelector(".photographer_section");

//     photographers.forEach((photographer) => {
//         const photographerModel = photographerFactory(photographer);
//         const userCardDOM = photographerModel.getUserCardDOM();
//         photographersSection.appendChild(userCardDOM);
//     });
// };

// async function init() {
//     // Récupère les datas des photographes
//     const {photographers} = await getPhotographers();
//     displayData(photographers);
// };

// init();