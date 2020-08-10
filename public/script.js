const submitBtn = document.querySelector('.inputValues__submitBtn');
const photoGalleryModal = document.querySelector('.photoGallery');
const logoToX = document.querySelector('.header__marsPicsLogo');
const dateData = document.querySelector('#date');
const dateMessage = document.querySelector('#dateMessage');
const roverIcons = document.querySelector('.menu__roverIcons');
const roverImage = document.querySelector('.menu__img');
const roverHeading = document.querySelector('.menu__roverTitle');
const roverMission = document.querySelector('.menu__roverMission');
const loading = document.querySelector('#loading');

let roverSelected;


//Todays date minus one day for API proper date formating
const today = new Date();
console.log(today);
const month = () => { 
    monthNumbr = today.getMonth()+1
     if (monthNumbr < 10) {
         return `0${monthNumbr}`
     }
     return monthNumbr;
}


const day = () => { 
    dayNumbr = today.getDate()
     if (dayNumbr < 10) {
         return `0${dayNumbr -1}`
     }
     return dayNumbr - 1;
}


const todayDate = `${today.getFullYear()}-${month()}-${day()}`;
dateData.setAttribute('max', todayDate);


//Rover icon selection
roverIcons.addEventListener('click',(e) => {
    const icon = e.target;
    if(icon.getAttribute('id') === 'curiosity') {
        roverSelected = 'curiosity';
        icon.setAttribute('src','./imgs/curiosity_red.png');
        icon.nextElementSibling.setAttribute('src', './imgs/opportunity_white.png');
        roverIcons.lastElementChild.setAttribute('src', './imgs/spirit_rover_white.png')
        roverImage.setAttribute('src', './imgs/rover.jpg');
        roverHeading.innerHTML = 'Curiosity Rover';
        dateData.setAttribute('min', '2012-08-06');
        dateData.setAttribute('max',todayDate);
        roverMission.innerHTML = "Mission: Find out if Mars ever had the right environmental conditions to support small life forms called microbes.";
    }

    if(icon.getAttribute('id') === 'opportunity') {
        roverSelected = 'opportunity';
        icon.setAttribute('src','./imgs/opportunity_red.png');
        roverIcons.firstElementChild.setAttribute('src','./imgs/curiosity_white.png');
        roverIcons.lastElementChild.setAttribute('src', './imgs/spirit_rover_white.png');
        roverImage.setAttribute('src', './imgs/opportunity.jpg');
        roverHeading.innerHTML = 'Opportunity Rover';
        dateData.setAttribute('max', '2018-05-17');
        dateData.setAttribute('min', '2004-01-26');
        roverMission.innerHTML = "Mission: Search for and characterize a wide range of rocks and soils for clues to past water activity on Mars.";
    }

    if(icon.getAttribute('id') === 'spirit') {
        roverSelected = 'spirit';
        icon.setAttribute('src','./imgs/spirit_rover_red.png');
        roverIcons.firstElementChild.setAttribute('src','./imgs/curiosity_white.png');
        icon.previousElementSibling.setAttribute('src', './imgs/opportunity_white.png');
        roverImage.setAttribute('src', './imgs/spirit_rover.jpg');
        roverHeading.innerHTML = 'Spirit Rover';
        dateData.setAttribute('max', '2010-03-21');
        dateData.setAttribute('min', '2004-01-05');
        roverMission.innerHTML = "Mission: Search for and characterize a wide range of rocks and soils for clues to past water activity on Mars.";
    }
})


//Fetch data  & photo gallery functionality
const imgGal = document.querySelector('.imgs');
let imgsNodeList = 0;
const current = document.querySelector('#current');
const opacity = 1;


const imgClick = (e) => {
    //Reset opacity for all images
    imgsNodeList.forEach(img => img.style.opacity = 0.6);

    //Change current image to src of clicked image
    current.src = e.target.src;

    //Add fade in class
    current.classList.add('fade-in');

    //Remove fadin class after 5 seconds
    setTimeout(() => {
        current.classList.remove('fade-in')
    }, 500);
    
    //Change opacity to the opacity variable
    e.target.style.opacity = opacity;
}


const changeImg = (data) => {
    current.setAttribute('src', data.photos[0].img_src);
    loading.textContent = '';

    for( i = 0; i <= 7; i++) {
        if(!data.photos[i].img_src) {
            return console.log(`no image for image spot ${i}/8`);
            }
        const img = document.createElement('img');
        img.setAttribute('src', data.photos[i].img_src);
        imgGal.appendChild(img);
        }

    imgsNodeList = document.querySelectorAll('.imgs img');
    imgsNodeList[0].style.opacity = opacity;
    imgsNodeList.forEach((img) => img.addEventListener('click',imgClick));
}

const getData = async (rover, date) => {
    let response = await fetch(`/photos?rover=${rover}&date=${date}`);
    let data = await response.json();
    changeImg(data);
}


submitBtn.addEventListener('click', () => {

    if(!dateData.value || !roverSelected) {
        return dateMessage.innerHTML = 'Please select a rover and pick a photo date.'
    }

    //Reseting modal and messages
    imgGal.innerHTML = '';
    dateMessage.innerHTML = '';
    current.setAttribute('src','');
    loading.textContent = 'Loading...'

    getData(roverSelected, dateData.value);
   
    photoGalleryModal.style.display = 'block';
    logoToX.setAttribute('src',"./imgs/icons/exit_modal_icon.png" )
    logoToX.style.cursor = "pointer";
})


logoToX.addEventListener('click', () => {
    photoGalleryModal.style.display = 'none';
    logoToX.setAttribute('src', './imgs/icons/marspics_icon.png');
    logoToX.style.cursor = "none";
})

