let images = ['../imgs/i1.jpg', '../imgs/i2.jpg', '../imgs/i3.jpg', '../imgs/i4.jpg']
let landingPage = document.getElementsByClassName('landing-page')[0];
let settingsBox = document.getElementsByClassName('settings-box')[0];
let navBar = document.querySelector('.header-parent');
console.log(navBar)
let gearBox = document.getElementsByClassName('gearbox')[0];
const getRoot = document.querySelector(':root');
const lisColors = document.querySelectorAll('.colors-list li')
const btnsSelect = document.querySelectorAll('.btn');
const navSelect = document.querySelectorAll('.btn2');

//Scroll NavBar
window.addEventListener('scroll' , function() {
  if (this.window.scrollY > aboutUs.offsetTop - 100){
    navBar.classList.add('nav-scroll')
  }
  else {
    navBar.classList.remove('nav-scroll')
  }
})
          //Create Nav Bullets//
let newArr = Array.from(document.body.children);
newArr.pop();
newArr = newArr.reverse();
newArr.pop();
newArr.pop();
newArr.pop();
newArr.pop();
newArr = newArr.reverse();
console.log(newArr)
newArr = newArr.filter(el => {
  return el.className !== 'over';
})
newArr.forEach(el => {
console.log();
})
newArr.forEach(el => {
  document.querySelector('.nav-bullets').innerHTML += `<div class="bullet">
  <div class="tooltip" data-bullet="${el.className}">${el.className.replace('-parent','').toUpperCase()}</div>
</div>`
});
let navBullets = document.querySelectorAll('.nav-bullets .bullet');

//Scrolling Into Nav Bullets
navBullets.forEach(el => {
  el.addEventListener('mouseover', e => {
    navBullets.forEach(el => {
      el.firstElementChild.classList.remove('show-it');
    })
    e.target.firstElementChild.classList.add('show-it');
  })
  el.addEventListener('click', e => {
    navBullets.forEach(el => {
      el.classList.remove('active');
    })
    document.querySelector(`.${e.target.firstElementChild.dataset.bullet}`).scrollIntoView({
      behavior: 'smooth'
    })
    e.target.classList.add('active');  
  })
  el.onmouseout = function (e) {
    e.target.firstElementChild.classList.remove('show-it')
  }
})
  
///////////////////////////////Local Storage///////////////////////////////////
//Set BackGround for Last Background Before Reload
if (window.localStorage.newBackground) {
  landingPage.style.backgroundImage = window.localStorage.newBackground;
}
//Generate Random BackgroudImage
let backgroundVar;
let randomBackground = true;
function randomizeImage() {
  if (randomBackground === true) {
    backgroundVar = setInterval(function () {
      window.localStorage.newBackground = `url(${images[Math.floor(Math.random() * images.length)]})`
      landingPage.style.backgroundImage = window.localStorage.newBackground;
      landingPage.style.backgroundSize = 'cover';

    }, 1000);;
  }
  else {
    clearInterval(backgroundVar);
  }
}

//Set Background choice
if (window.localStorage.backgroundChoice) {
  btnsSelect.forEach(function (el) {
    el.classList.remove('active-select');
  })
  btnsSelect.forEach(el => {
    if (el.dataset.background === window.localStorage.backgroundChoice) {
      el.classList.add('active-select');
      randomBackground = window.localStorage.backgroundChoice === 'true' ? true : false
      randomizeImage()
    }
  })
}
//Check if there's old selected Color 
if (window.localStorage.selectedColor) {
  getRoot.style.setProperty('--mainColor', window.localStorage.selectedColor)
  lisColors.forEach(el => {
    el.classList.remove('active-select');
    lisColors.forEach(el => {
      if (el.dataset.color === window.localStorage.selectedColor) {
        el.classList.add('active-select');
      }
    })
  })
}
//Check for Nav bullets Options 
if (window.localStorage.bulletShow) {
  navSelect.forEach(el => {
    el.classList.remove('active-select');
  });
  navSelect.forEach(el => {
    if (el.getAttribute('data-bulletShow') === window.localStorage.bulletShow)
    el.classList.add('active-select');
    
     });
  if (window.localStorage.bulletShow === 'false') {
    navBullets.forEach(el => {
      el.classList.add('hide');
    })
  }
  else {
    navSelect[0].classList.add('active-select');
    navBullets.forEach(el => {
      el.classList.remove('hide');
    })
  }
}

//Reset Button
document.querySelector('.reset').addEventListener('click' , function() {
  localStorage.clear();
  window.location.reload();
})
/////////////////////////////////////Rest Of Code///////////////////////////////////////////

settingsBox.addEventListener('click' , (e) =>{
  e.stopPropagation();
});


document.addEventListener('click' , (e) => {
  if ([...settingsBox.classList][1] && e.target !== settingsBox){
    settingsBox.classList.remove('open');
  }
})

//Show and Hide Settings Boxs

gearBox.addEventListener('click', function () {
  settingsBox.classList.toggle('open');
  gearBox.firstElementChild.classList.toggle('fa-spin');
})

// landingPage.onclick = function () {
//   settingsBox.classList.remove('open');
//   gearBox.firstElementChild.classList.remove('fa-spin');
// }

//Switch Colors 
lisColors.forEach(el => {
  el.onclick = e => {
    lisColors.forEach(el => {
      el.classList.remove('active-select');
    })
    e.target.classList.add('active-select');
    //Save Selected Color
    window.localStorage.selectedColor = e.target.dataset.color
    getRoot.style.setProperty('--mainColor', window.localStorage.selectedColor)
  }
})

//Random Background Choice
btnsSelect.forEach(el => {
  el.onclick = function (e) {
    btnsSelect.forEach(function (el) {
      el.classList.remove('active-select')
    })
    e.target.classList.add('active-select');
    window.localStorage.backgroundChoice = e.target.dataset.background;
    randomBackground = window.localStorage.backgroundChoice === 'true' ? true : false
    randomizeImage()
  }
})

//Show or hide Nav Bullets 
navSelect.forEach(el => {
  el.addEventListener('click' , e => {
    navSelect.forEach(el => {
      el.classList.remove('active-select');
    });
    e.target.classList.add('active-select');
    window.localStorage.bulletShow = e.target.getAttribute('data-bulletShow')
    if (window.localStorage.bulletShow === 'false') {
      navBullets.forEach(el => {
        el.classList.add('hide');
      })
    }
    else {
      navBullets.forEach(el => {
        el.classList.remove('hide');
      })
    }
  });
})

//Change Gear Background On Scrolling
let aboutUs = document.querySelector('.about-parent');
window.addEventListener('scroll', function () {
  if (window.scrollY > aboutUs.offsetTop - 100) {
    gearBox.firstElementChild.style.color = 'white';
    gearBox.style.background = 'black'
  }
  else {
    gearBox.firstElementChild.style.color = 'black';
    gearBox.style.background = 'white'
  }
});

//Skills Progress

let skills = document.querySelector('.skills-parent')
let skillsProgress = document.querySelectorAll('.progress');

window.addEventListener('scroll', function () {
  let skillsOffsetTop = skills.offsetTop
  let skillsOuterHeight = skills.offsetHeight;
  let windowHeight = this.window.innerHeight;
  if (this.window.scrollY > aboutUs.offsetTop - 100) {
    skillsProgress.forEach(el => {
      el.style.width = el.dataset.progress;
    });
  }
  else {
    skillsProgress.forEach(el => {
      el.style.width = 0;
    });
  }

})
//Gallary

//Create Pop Up with the image

let ourGallaryImgs = document.querySelectorAll('.gallary .image-box img')
let overLay = document.querySelector('.over');
ourGallaryImgs.forEach(el => {
  el.onclick = function (e) {
    //Create Overlay Layer
    let overlayPopUp = document.createElement('div');
    overlayPopUp.className = 'overlay2';
    document.body.appendChild(overlayPopUp);
    //Create pop-up box
    let popUp = document.createElement('div');
    popUp.classList.add('pop-up');
    let popUpImg = document.createElement('img');
    popUpImg.src = e.target.src;
    popUp.appendChild(popUpImg);
    document.body.appendChild(popUp);
    if (el.title !== undefined) {
      let alt = document.createElement('h3');
      let altText = document.createTextNode(el.title);
      alt.append(altText);
      popUp.prepend(alt);
      //Create Close Span
      let closeSpan = document.createElement('span');
      let xSign = document.createTextNode('X');
      closeSpan.append(xSign);
      closeSpan.classList.add('xSign')
      popUp.prepend(closeSpan);
    }
  }
})

//Close PopUp 

document.addEventListener('click', function (e) {
  if (e.target.className === 'xSign') {
    e.target.parentNode.remove();
    document.querySelector('.overlay2').remove();
  }
})
window.addEventListener('keyup', e => {
  if (e.key === "Escape") {
    document.querySelector('.pop-up').remove();
    document.querySelector('.overlay2').remove();

  }
})
//Close PopUp when click on screen

document.addEventListener('click', function (e) {
  if (e.target.className === 'overlay2') {
    document.querySelector('.pop-up').remove();
    document.querySelector('.overlay2').remove();
  }
})


//Single Page Redirection 

//Li Links 
let lisLinks = document.querySelectorAll('.header-area ul li a');

lisLinks.forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    lisLinks.forEach(el => {
      el.classList.remove('active');
    })
    document.querySelector(`.${e.target.dataset.link}`).scrollIntoView({
      behavior: 'smooth'
    });
    e.target.classList.add('active');
  })
  window.addEventListener('scroll' , () => {
    lisLinks.forEach(el => {
      el.classList.remove('active');
    })
  })
})

//Burger Menu

let burger = document.querySelector('.links-container button');
console.log(burger);
let ulLinksHeader = document.querySelector('.links-container ul')

burger.addEventListener('click' , function(e) {
  ulLinksHeader.classList.add('showLinks');
  document.querySelector('.introductionText').classList.toggle('hideClass');
  if (!document.querySelector('.introductionText').classList.contains('hideClass'))
  {
    document.querySelector('.links-container .togglemenu').classList.add('menuActive')
    ulLinksHeader.style.opacity = 0;
    ulLinksHeader.style.zIndex = -1;
  }
  else {
    e.stopPropagation();
    ulLinksHeader.style.opacity = 1;
    ulLinksHeader.style.zIndex = 5;
    document.querySelector('.links-container .togglemenu').classList.remove('menuActive')
    
  }
});

document.querySelector('.links-container').onclick = (e) => {
  if (document.querySelector('.introductionText').classList.contains('hideClass')){
    e.stopPropagation();
  }
}
//Click any where outside menu

document.addEventListener('click' , e => {
  if (document.querySelector('.introductionText').classList.contains('hideClass')){
    if (e.target !== document.querySelector('.links-container .showLinks') && e.target !== document.querySelector('.links-container .togglemenu' )){
      document.querySelector('.links-container .togglemenu').classList.add('menuActive')
      console.log(e.target);
      ulLinksHeader.style.opacity = 0;
      ulLinksHeader.style.zIndex = -1;
      document.querySelector('.introductionText').classList.remove('hideClass');
    } 
  }
})
