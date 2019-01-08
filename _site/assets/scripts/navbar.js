// Desktop nav
const navbar =  document.querySelector('#navbar'); 
// select top level of nav
const tabs = document.querySelectorAll('.navbar__item.navbar__top-item');
// select 2nd level of nav
const dropdownMenu = document.querySelector('.navbar__dropdown-menu');
const background =  document.querySelector('.navbar__dropdown-bg');

// Get the absolute position of Nav elements
let getDropdownMenuParams = dropdownMenu.getBoundingClientRect();
let getNavParams = navbar.getBoundingClientRect();

let backgroundParams = {
   height: getDropdownMenuParams.height,  
   top: getNavParams.height
 };


 // Mobile nav
const menu = document.getElementById('btn-menu');
const menubar = document.getElementById('navbar__left');

let getNavbarParams = menubar.getBoundingClientRect();
let navbarHeight = getNavbarParams.height;

// Returns an html collection, should have length: 1 or 0.
let activeNavbarItem = document.getElementsByClassName('navbar__dropdown-menu_is-active');
// scoping – these variables are updated from within tabOpenClose() – once activeNavbarItem has a value
let getActiveNavbarItemParams;
let activeNavbarItemBackground;
let activeTab;
// tab_is-active margin bottom = activeNavbarItemBackground


// Desktop nav
//Display correct content for li element clicked, disactivate active tab when active tab clicked. When active show background to nav.
function tabOpenClose() {
if(this.classList.contains('tab_is-active')) {
  //dropdown close
  // this.classList.remove('tab-enter', 'is_tab-enter_active');
  this.classList.remove('tab_is-active');
  background.classList.remove('navbar__dropdown-bg_is-open');
  navbar.classList.remove('navbar_is-open');
  this.lastElementChild.classList.remove('navbar__dropdown-menu_is-active');

  this.style.removeProperty('margin-bottom');
} else {
  //dropdown open
  let i;
  for (i = 0; i < tabs.length; i++) {
    // close existing open tab and open the tab which has been clicked
    tabs[i].classList.remove('tab_is-active');
    this.classList.add('tab_is-active');
    background.classList.add('navbar__dropdown-bg_is-open');
    navbar.classList.add('navbar_is-open');


    // assign a class to get the active class' parameters/height
    // ensure nested UL in navbar__top-item is last element
    this.lastElementChild.classList.add('navbar__dropdown-menu_is-active');

    // These variables are initialised in global scope and have values assigned here
    // Because HTML collection is array-like an array-like position must be stated
    getActiveNavbarItemParams = activeNavbarItem[0].getBoundingClientRect();
    activeNavbarItemHeight = getActiveNavbarItemParams.height;

    // assign the height of the active dropdown to its patrent, active tab.
    this.style.setProperty('margin-bottom', `${activeNavbarItemHeight}px`);
  }
};
}

// Desktop nav
//Correctly position nav background
window.onload = function() {
  background.style.setProperty('transform', `translateY(${backgroundParams.top}px)`);
}
// Desktop nav buttons
tabs.forEach(tab => tab.addEventListener('mousedown', tabOpenClose));


// Mobile nav buttons
menu.addEventListener('mousedown', menuPressed);
menu.addEventListener('touchstart', menuPressed);
// tabs.forEach(tab => tab.addEventListener('touchstart', menuItemPressed));

// mobile nav layer 1
function menuPressed() {
  if(menu.classList.contains('menu_is-active')) {
    navbar.classList.remove('menu_is-active');
    navbar.style.removeProperty('margin-bottom');
    menu.classList.remove('menu_is-active');
    menubar.style.removeProperty('visibility');
    menubar.style.removeProperty('right');
    menu.innerText = "Menu ";
  } else {
    navbar.classList.add('menu_is-active');
    navbar.style.setProperty('margin-bottom', `${navbarHeight}px`);
    menu.classList.add('menu_is-active');
    menubar.style.setProperty('visibility', 'visible');
    menubar.style.setProperty('right', '0px');
    menu.innerText = "Close";
  }
}

// Mobile nav layer 2/2nd level drop down
// function menuItemPressed() {
//   if(this.classList.contains('menu-item_is-active')) {
//     this.classList.remove('menu-item_is-active');

//   }

// }