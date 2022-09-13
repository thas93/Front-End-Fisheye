//*******************************POTOGRAPHES ELEMENTS CRATION**************/

function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;
    

    const picture = `assets/photographers/${portrait}`;
     

    function getUserCardDOM() {
        const article = document.createElement('article');
        
        const img = document.createElement('img'); // Image creation
        img.setAttribute("src", picture,)
        img.setAttribute("alt", "Photo du photographe" + " " + name,)
        img.setAttribute("aria-label","Photographe" + " " + name)
        
        const nameTag = document.createElement('h2'); // Name creation
        nameTag.textContent = name;
        nameTag.classList.add("class=photographer_name")
        nameTag.setAttribute("aria-label","la localisation du photographe" + " " + name + " " + "est à " + " " + city)
        
        const locationTag = document.createElement('h3') // Location creation
        locationTag.textContent = city + "," + " " + country;
        locationTag.setAttribute("id","photographer_location");
        
        const taglineTag = document.createElement('h3'); // Tagline creation
        taglineTag.textContent = tagline;
        taglineTag.classList.add("class=photographer_tag")
        
        const priceTag = document.createElement('h3'); // Price creation
        priceTag.textContent = price + "€/jour";
        priceTag.classList.add("class=photographer_price")

        article.appendChild(img);
        article.appendChild(nameTag);
        article.appendChild(locationTag);
        article.appendChild(taglineTag);
        article.appendChild(priceTag);
        return (article);
        
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
   
}


/*************************************************************************************/

function photographerPersoFactory(data) {
    const { name, portrait, city, country, tagline } = data;
    

    const picture = `assets/photographers/${portrait}`;
     

    function getPhotographCardDOM() {
        const article = document.createElement('article');
        
        const img = document.createElement('img'); // Image creation
        img.setAttribute("src", picture,)
        img.setAttribute("alt", "Photo du photographe" + " " + name,)
        img.setAttribute("aria-label","Photographe" + " " + name)
        
        const nameTag = document.createElement('h2'); // Name creation
        nameTag.textContent = name;
        nameTag.classList.add("class=photographer_name")
        nameTag.setAttribute("aria-label","la localisation du photographe" + " " + name + " " + "est à " + " " + city)
        
        const locationTag = document.createElement('h3') // Location creation
        locationTag.textContent = city + "," + " " + country;
        locationTag.setAttribute("id","photographer_location");
        
        const taglineTag = document.createElement('h3'); // Tagline creation
        taglineTag.textContent = tagline;
        taglineTag.classList.add("class=photographer_tag")
        
       

        article.appendChild(img);
        article.appendChild(nameTag);
        article.appendChild(locationTag);
        article.appendChild(taglineTag);
       
        return (article);
        
    }
    return { name, picture, city, country, tagline, price, getPhotographCardDOM }
   
}


