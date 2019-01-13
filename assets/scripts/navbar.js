// Desktop nav
const navbar =  document.querySelector('#navbar'); 
// select top level of nav
const tabs = document.querySelectorAll('.navbar__item.navbar__top-item');

// select 2nd level of nav
const dropdownMenu = document.querySelector('.navbar__dropdown-menu');
// todo fix this WET
const dropdownMenu2 = document.getElementsByClassName('navbar__dropdown-menu');
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
let activeNavbarItem;

// scoping – these variables are updated from within tabOpenClose() – once activeNavbarItem has a value
let getActiveNavbarItemParams;
let activeNavbarItemBackground;
let activeNavbarItemChildren;

const navbarDropdownMenuItem = document.getElementsByClassName('navbar__dropdown-item');


// Desktop nav
//Display correct content for li element clicked, disactivate active tab when active tab clicked. When active show background to nav.
function tabOpenClose() {
  if(this.classList.contains('tab_is-active')) {
    // Desktop nav
    //dropdown close
    // this.classList.remove('tab-enter', 'is_tab-enter_active');
    this.classList.remove('tab_is-active');
    background.classList.remove('navbar__dropdown-bg_is-open');
    navbar.classList.remove('navbar_is-open');

    
    // For mobile/stacked dropdown menu
    this.lastElementChild.classList.remove('navbar__dropdown-menu_is-active');
    this.style.removeProperty('margin-bottom');
   
    //Todo test is addChildClassIsHidden is used/necessary here
    addChildClassIsHidden();
    deactivateDropdownMenu();

    // Remove margin-bottom from all navbar__top-item 
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].style.removeProperty('margin-bottom');
    }
  } else {
    //dropdown open
    for (let i = 0; i < tabs.length; i++) {
      // Desktop – close existing open tab (then open the tab which has been clicked)
      tabs[i].classList.remove('tab_is-active');
      
      // Open the clicked tab tab
      this.classList.add('tab_is-active');
      // Activate background – importanct for desktop nav
      background.classList.add('navbar__dropdown-bg_is-open');
      navbar.classList.add('navbar_is-open');


      /* Mobile nav
      1 Hide all navbar__dropdown-items
      2 Remove all margin-bottom stlye from navbar__dropdown-menu
      3 Show navbar__dropdown-items from the touched navbar__dropdown
      4 Expand the navbar__dropdown to the height of its items
      */

      console.log(this.lastElementChild);
      
      // 1 Assign values to global variables, which are used in other functions


      // 1 Hide all navbar__dropdown-items
      addChildClassIsHidden(); 
      // 2 Hide dropdown menu
      deactivateDropdownMenu();
      // 3 Collapse all dropdown menus
      tabs[i].style.removeProperty('margin-bottom');
      // 4 Declare the active tab to start the process of getting its expanded properties (margin-bottom)
      this.lastElementChild.classList.add('navbar__dropdown-menu_is-active');
        // getElementsBy.. rtns a live HTML collection 
      activeNavbarItem = document.getElementsByClassName('navbar__dropdown-menu_is-active');
        // HTML collection is array like, must state an array-like value
      activeNavbarItemChildren = activeNavbarItem[0].children;
      // 5 Show the active tab's dropdown-menu items
      removeChildClassIsHidden();
      // 6 Get the size the active tab needs to be
      getActiveNavbarItemParams = activeNavbarItem[0].getBoundingClientRect();
      activeNavbarItemHeight = getActiveNavbarItemParams.height;
      // 7 Assign the height of the active dropdown to its parent, active tab.
      this.style.setProperty('margin-bottom', `${activeNavbarItemHeight + 23}px`);
      console.log(`${activeNavbarItemHeight}`);
    }
  }
}


function removeChildClassIsHidden() {
   for (let i = 0; i < activeNavbarItemChildren.length; i++) {
      activeNavbarItemChildren[i].classList.remove('navbar__dropdown-item_is-hidden');
      // allNavbarItemChildren[i].classList.remove
  }
}

// Hide all drop down menu items
function addChildClassIsHidden() {
  for (let i = 0 ; i < navbarDropdownMenuItem.length; i++) {
    navbarDropdownMenuItem[i].classList.add('navbar__dropdown-item_is-hidden');
  }
}


function deactivateDropdownMenu() {
  for (let i = 0; i < dropdownMenu2.length; i++) {
    dropdownMenu2[i].classList.remove('navbar__dropdown-menu_is-active');
  }
}


function removeTabIsActive() {
  for(let i = 0; i < menubar.children.length; i++) {
    menubar.children[i].style.removeProperty('margin-bottom');
    menubar.children[i].classList.remove('tab_is-active');
  }
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


// mobile nav – layer 1
function menuPressed() {
  if(menu.classList.contains('menu_is-active')) {
    
    removeTabIsActive();
    addChildClassIsHidden();
    deactivateDropdownMenu();

    navbar.style.removeProperty('margin-bottom');
    menu.classList.remove('menu_is-active');
    menubar.style.removeProperty('visibility');
    menubar.style.removeProperty('right');
    menu.innerText = "Menu ";
    navbar.classList.remove('menu_is-active', 'navbar_is-open');
  } else {
    navbar.classList.add('menu_is-active');
    // navbar.style.setProperty('margin-bottom', `${navbarHeight}px`);
    navbar.style.setProperty('margin-bottom', '70vh');
    menu.classList.add('menu_is-active');
    menubar.style.setProperty('visibility', 'visible');
    menubar.style.setProperty('right', '0px');
    menu.innerText = "Close";
  }
}
