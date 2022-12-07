//*******************************POTOGRAPHERS ELEMENTS CRATION**************/

function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    

    const picture = `assets/photographers/${portrait}`;
    
    function getUserCardDOM() {
        const article = document.createElement('article');

        const photographer = document.getElementsByClassName('photographer_name')
        
        const img = document.createElement('img'); // Image creation
        img.setAttribute("src", picture);
        img.setAttribute("alt", "Photo du photographe" + " " + name,);
        img.setAttribute("aria-label","Photographe" + " " + name);
        
        const nameTag = document.createElement('a'); // Name creation
        nameTag.textContent = name;
        nameTag.classList.add("photographer_name");
        nameTag.setAttribute("id", id);
        nameTag.setAttribute("aria-label","la localisation du photographe" + " " + name + " " + "est à " + " " + city);
        nameTag.setAttribute("href", "./photographer.html?id=" + id)
        
        const locationTag = document.createElement('h3') // Location creation
        locationTag.textContent = city + "," + " " + country;
        locationTag.classList.add("photographer_loc")
    
        const taglineTag = document.createElement('h3'); // Tagline creation
        taglineTag.textContent = tagline;
        taglineTag.classList.add("photographer_tag");
        
        const priceTag = document.createElement('h3'); // Price creation
        priceTag.textContent = price + "€/jour";
        priceTag.classList.add("photographer_price");
  
       
        article.appendChild(img);
        article.appendChild(nameTag);
        article.appendChild(locationTag);
        article.appendChild(taglineTag);
        article.appendChild(priceTag);
       
        return (article);
        
    }
    return { name, picture, city, country, tagline, price, id, getUserCardDOM }
   
}

/*************************************************************************************/



/********************************PERSO PHOTOGRAPHER CREATION**************************/

function persoPhotographerFactory(data) {
    const { name, portrait, city, country, tagline, photographerLink, id } = data;
    
    

    const picture = `assets/photographers/${portrait}`;
     

    function getPersoUserCardDOM() {
      
        const persoPhotographer = document.createElement('article');
        
        const img = document.createElement('img'); // Image creation
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Photo du photographe" + " " + name)
        img.setAttribute("aria-label","Photographe" + " " + name)
        
        const nameTag = document.createElement('h2'); // Name creation
        nameTag.textContent = name;
        nameTag.classList.add("class=photographer_name")
        nameTag.setAttribute("aria-label","la localisation du photographe" + " " + name + " " + "est à " + " " + city)
           
        const locationTag = document.createElement('h3') // Location creation
        locationTag.textContent = city + "," + " " + country;
         
        const taglineTag = document.createElement('h3'); // Tagline creation
        taglineTag.textContent = tagline;
        taglineTag.classList.add("class=photographer_tag")
         
        persoPhotographer.appendChild(img);
        persoPhotographer.appendChild(nameTag);
        persoPhotographer.appendChild(locationTag);
        persoPhotographer.appendChild(taglineTag);
        
        return (persoPhotographer);
        
    }
    return { name, picture, city, country, tagline, photographerLink, id, getPersoUserCardDOM}
   
}









