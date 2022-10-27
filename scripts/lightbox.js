  /***********************RECOVERY OF ELEMENTS*******************************/
  
  const modal = document.getElementById('lightBox')
  
  const lightBoxImg = document.getElementsByClassName('modalImg')
  const lightBoxTitle = document.getElementsByClassName('lightBoxImgTitle')
  const next = document.getElementsByClassName('leftButon')
  const prev = document.getElementsByClassName('rightButon')
  const close = document.getElementsByClassName('closeButon')[0]

 /****************************************************************************/
   


    close.addEventListener('click', function (e){
      e.preventDefault();
      modal.classList.add('hidden')
    })

  
    










