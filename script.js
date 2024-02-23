'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// LEARN MORE SCROLL BUTTON

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  const s1coords = section1.getBoundingClientRect();

  section1.scrollIntoView({ behavior: 'smooth' });
});

// PAGE NAVIGATION
// 1. ADD EVENT LISTENER TO COMMON PARENT ELEMENT
// 2. DETERMINE WHAT ELEMENT ORIGINATED THE EVENT
// EVENT DELEGATION
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// TABBED COMPONENT
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');


  // GUARD CLAUSE
  if (!clicked) return;

  // REMOVE ACTIVE CLASS FROM TAB AND CONTENT
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  
  // ACTIVE TAB
  clicked.classList.add('operations__tab--active');

  // ACTIVE CONTENT AREA
  
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

////////////////////////////////////////////////////
//--------------------LECTURES------------------
////////////////////////////////////////////////////
/*
// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);



const allSections = document.querySelectorAll('.section');

console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');

console.log(allButtons);

console.log(document.getElementsByClassName('btn'));


// Creating and inserting elements
// .insertAdjacentHTML


// INSERTING ELEMENTS




// message.textContent =
//   'We use cookies for improved functionality and analytics.';



// cloning message
// header.prepend(message.cloneNode(true))

// header.before(message);
// header.after(message);

// DELETING ELEMENTS

document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  message.remove();
})

//-------------------STYLES ATTRIBUTES AND CLASSES-------------

// Styles

const header = document.querySelector('.header');

const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML =
  'We use cookies for improved functionality and analytics.<button class = "btn btn--close-cookie">Got it!</button>';
header.append(message);

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered ');

// Attributes

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);
console.log(logo.getAttribute('designer'));

logo.alt = 'Beautiful minimalist logo';

console.log(logo.alt);
logo.setAttribute('company', 'Bankist');

console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add();
logo.classList.remove();
logo.classList.toggle();
logo.classList.contains();

// Don't use
logo.className = 'jonas';


const h1 = document.querySelector('h1');

const allertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};

h1.addEventListener('mouseenter', allertH1);


// OLD WAY OF SCROLLING DOWN
btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  const s1coords = section1.getBoundingClientRect();


  //LOGGING EVENT BUTTON CORDINATES
  console.log(e.target.getBoundingClientRect());
  console.log(s1coords);

  //VIEW CURRENT SCROLL CORDINATES
  console.log('current scroll (X/Y)', window.scrollX, scrollY);

  // VIEWPORT HEIGHT WIDTH
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // SCROLLING
  // window.scrollTo(
  //   s1coords.left + window.screenX,
  //   s1coords.top + window.scrollY
  // );

  // OLD SCHOOL WAY OF SMOOTH SCROLLING
  window.scrollTo({
    left: s1coords.left + window.screenX,
    top: s1coords.top + window.scrollY,
    behavior: 'smooth',
  });
});

// REMOVE EVENT AFTER CERTAIN TIME
// setTimeout(() => h1.removeEventListener('mouseover', allertH1), 3000);

// OLD WAY OF ADDING EVENT LISTENERS
// h1.onmousenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// };

// ------------------EVENT PROPAGATION----------------

// rgb(255,255,255)

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;


//EVENT LISTENERS ARE LISTENING TO EVENTS AT BUBBLING PHASE BY DEFAULT. NOT TO CAPTURING PHASE

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('link', e.target, e.currentTarget);
  // THIS KEYWORD IS THE SAME THING AS EVENT.CURRENTTARGET
  console.log(e.currentTarget === this);

  // STOPING THE EVENT PROPAGATION
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('container', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('navbar', e.target, e.currentTarget);
});

// PAGE NAV (IT'S NOT BAD FOR COUPLE ELEMENTS BUT IT GETS WORSE IF WE HAVE HUNDREDS OR THOUSANDS)

document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});


// ----------------DOM TRAVERSING---------------------

const h1 = document.querySelector('h1');

// GOING DOWNWARDS: CHILD
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// GOING UPWARDS : PARENTS

console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';

// GOING SIDEWAYS: SIBLINGS
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
