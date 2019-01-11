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

// const navbarLeft = document.querySelector('.navbar__left');
//  const navbarLeftItems = document.navbarLeft.children; //!!!!!!!!!!!!!!!!!!!!!!!!!
// cycle through children of navbar left and remove margin-bottom on click of btn-menu & btn-course & tab


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
    //dropdown close
    // this.classList.remove('tab-enter', 'is_tab-enter_active');
    this.classList.remove('tab_is-active');
    background.classList.remove('navbar__dropdown-bg_is-open');
    navbar.classList.remove('navbar_is-open');
    
    // For mobile/stacked dropdown menu
    this.lastElementChild.classList.remove('navbar__dropdown-menu_is-active');
    this.style.removeProperty('margin-bottom');
    addChildClassIsHidden();
    // Remove margin-bottom from all navbar__top-item 
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].style.removeProperty('margin-bottom');
      // navbar__right

      deactivateDropdownMenu();
    }
  } else {
    //dropdown open
    for (let i = 0; i < tabs.length; i++) {
      // close existing open tab and open the tab which has been clicked
      tabs[i].classList.remove('tab_is-active');
      
      deactivateDropdownMenu();

      // //Deactivate all dropdownMenu's
      // for (let i = 0; i < dropdownMenu2.length; i++) {
      //   dropdownMenu2[i].classList.remove('navbar__dropdown-menu_is-active');
      //   console.log('hiding')
      // }
      // console.log(dropdownMenu2.length);

      // // Hide all of tabs > navbar__dropdown-menu > navbar__item – important for mobile nav
      // for (let i = 0; i < navbarDropdownMenuItem.length; i++) {
      //   navbarDropdownMenuItem[i].classList.add('navbar__dropdown-item_is-hidden');
      // }


      // Disable margin-bottom – important for mobile nav
      tabs[i].style.removeProperty('margin-bottom');


      // Activate this tab
      this.classList.add('tab_is-active');
      // Activate background – importanct for desktop nav
      background.classList.add('navbar__dropdown-bg_is-open');
      navbar.classList.add('navbar_is-open');

      /*Target active tab and its UL child
          getElementsByClassName returns an HTML collection, 
          which is array like, it is used here because it live.
          Must assign array value even though it should only ever have length 1
      */
      this.lastElementChild.classList.add('navbar__dropdown-menu_is-active');
      // select dropdown ul
      activeNavbarItem = document.getElementsByClassName('navbar__dropdown-menu_is-active');
      // select dropdown ul > li
      activeNavbarItemChildren = activeNavbarItem[0].children;
     

      /* Display the contents of this ul – comes before getActiveNavbarItemHeight so
       gANIH can includes the height of children*/
      removeChildClassIsHidden();


      /* 
      Give functions in global scope access to variables defined inside this loop be declaring the 
      variables globally and assigning their values here.
      */
      getActiveNavbarItemParams = activeNavbarItem[0].getBoundingClientRect();
      activeNavbarItemHeight = getActiveNavbarItemParams.height;
      // Assign the height of the active dropdown to its parent, active tab.
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

function addChildClassIsHidden() {
  for (let i = 0; i < activeNavbarItemChildren.length; i++) {
    activeNavbarItemChildren[i].classList.add('navbar__dropdown-item_is-hidden');
  }
}


function deactivateDropdownMenu() {
  //Deactivate all dropdownMenu's
  for (let i = 0; i < dropdownMenu2.length; i++) {
    dropdownMenu2[i].classList.remove('navbar__dropdown-menu_is-active');
  }

  // Hide all of tabs > navbar__dropdown-menu > navbar__item – important for mobile nav
  for (let i = 0; i < navbarDropdownMenuItem.length; i++) {
    navbarDropdownMenuItem[i].classList.add('navbar__dropdown-item_is-hidden');
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
    // navbar.style.setProperty('margin-bottom', `${navbarHeight}px`);
    navbar.style.setProperty('margin-bottom', '70vh');
    menu.classList.add('menu_is-active');
    menubar.style.setProperty('visibility', 'visible');
    menubar.style.setProperty('right', '0px');
    menu.innerText = "Close";
  }
}
