
// Hide Page Title and fix nav on top
window.addEventListener('scroll', () => {
    const navegation = document.querySelector('.nav')
    if(window.scrollY > 40) {
        navegation.classList.add('nav--fixed');
    }else{
        navegation.classList.remove('nav--fixed')
    }
})
//Create nav__item from nav.html
function createNav(titleItem,idItem){
    const navItem = document.createElement('li');
    const navButton = document.createElement('button');

    navItem.className = 'nav__item';
    navButton.className = 'nav__button nav__button---nonChecked';
    navButton.id = idItem;
    navButton.innerHTML = titleItem;

    navList.appendChild(navItem);
    navItem.appendChild(navButton);
}

let navItems = [];
const navList = document.querySelector('.nav__list');

fetch('https://brunosiq99.github.io/simpleGuideToJavaScript/assets/html/nav.html').
    then((data) => data.json()).
    then((response) => {  
        response.forEach(element => {
            const titleItem = element.title;
            const idItem = `${titleItem.toLowerCase()}Section`;
            
            createNav(titleItem,idItem);
            
        });
    }).then(() => {
        addListenerToNavButtons();
    });

//Display Sections
function addListenerToNavButtons(){
    const navButtons = document.querySelectorAll('.nav__button');
    navButtons.forEach((button) => {
        button.addEventListener('click',() => {
            changecheckedButton(button);
            verifiesExistingSection(button.id, button.innerText);
        });
    });
}

function changecheckedButton(button){
    const checkedButton = document.querySelector('.nav__button---checked')
    checkedButton.classList.remove('nav__button---checked');
    checkedButton.classList.add('nav__button---nonChecked');
    button.classList.add('nav__button---checked');
    button.classList.remove('nav__button---nonChecked');  
}
function hideOtherSections(){
    let sectionShowned = document.querySelector('.section---showned');
    sectionShowned.classList.remove('section---showned')
}
function verifiesExistingSection(id,title){
    hideOtherSections()
    let sections = document.querySelectorAll('.section');
    sections = Array.from(sections);
    const sectionExist = sections.find(element => element.id === id);
    
    if(typeof sectionExist == 'undefined'){
        createSection(id, title);
    }else{
        sectionExist.classList.add('section---showned');
    } 
}

function createSection(id,title){
    const contentDiv = document.querySelector('.content');
    const section = document.createElement('section');
    section.className = "section section---showned";
    section.id = id;
    const sectionTitle = document.createElement('h2');
    sectionTitle.className = "section__title";
    sectionTitle.innerText = title;
    
    contentDiv.appendChild(section);
    section.appendChild(sectionTitle);

    createContent(id, section);
}

function createContent(id, parentSection){
    const apiUrl = `https://brunosiq99.github.io/simpleGuideToJavaScript/assets/html/${id}.html`;
    fetch(apiUrl).
        then((data) => data.json()).
        then((response) => {
            response.forEach((subject)=>{            
                const divSubject = document.createElement('div');
                divSubject.className = 'subject';
                const subjectTitle = document.createElement('h4');
                subjectTitle.className = 'subject__title';
                subjectTitle.innerHTML = subject.h4;
                const subjectDescription = document.createElement('p');
                subjectDescription.className = 'subject__description';
                subjectDescription.innerHTML = subject.p;
                const subjectCode = document.createElement('div');
                subjectCode.className = 'subject__code';
                subjectCode.innerHTML = `<img class='subject__img' src='https://brunosiq99.github.io/simpleGuideToJavaScript/assets/img/${parentSection.id}/${subject.img}.png'>`
                    
                parentSection.appendChild(divSubject);
                divSubject.appendChild(subjectTitle); 
                divSubject.appendChild(subjectDescription);
                divSubject.appendChild(subjectCode);
            })
        })
}



