// Desktop nav
const navbar =  document.querySelector('#navbar'); 

// Select top level of nav
const tabs = document.querySelectorAll('.navbar__item.navbar__top-item');

// Select 2nd level of nav
const dropdownMenu = document.querySelector('.navbar__dropdown-menu');

// Todo fix this WET
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

// Manipulate '+' icon on mobile, assigned inside tabOpenClose
let activeTab;
let activeNavbarMoreIcon;

// Returns an html collection, should have length: 1 or 0.
let activeNavbarItem;

// scoping – these variables are updated from within tabOpenClose() – once activeNavbarItem has a value
let getActiveNavbarItemParams;
let activeNavbarItemBackground;
let activeNavbarItemChildren;

const navbarDropdownMenuItem = document.getElementsByClassName('navbar__dropdown-item');


// Referenced in menuPressed();
const collapseDropdown = {
  stage1: function() { 
          setTimeout(function(){
          removeTabIsActive();
          deactivateDropdownMenu();  
          }, 50)},

  stage2: function() {
          setTimeout(function(){
          navbar.style.removeProperty('margin-bottom');
          }, 125)},

  stage3: function() {
          setTimeout(function(){
          menubar.style.removeProperty('right');
          navbar.classList.remove('menu_is-active', 'navbar_is-open');
          }, 125)},

  stage4: function() {
          setTimeout(function(){
          menubar.style.removeProperty('visibility');
          }, 500)}  
}



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
    // Collapse the more or "+" icon
    activeNavbarMoreIcon.classList.remove('navbar__icon-more_is-active');

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

      // Find the child of tab_i

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
      // //6 Rotate the active tab's more or "+" icon 
      rotateMoreIcon();
      // 7 Get the size the active tab needs to be
      getActiveNavbarItemParams = activeNavbarItem[0].getBoundingClientRect();
      activeNavbarItemHeight = getActiveNavbarItemParams.height;
      // 8 Assign the height of the active dropdown to its parent, active tab.
      this.style.setProperty('margin-bottom', `${activeNavbarItemHeight + 23}px`);
    }
  }
}

// activeTab[0].children[0].children


// Show all dropdown menu items
function removeChildClassIsHidden() {
   for (let i = 0; i < activeNavbarItemChildren.length; i++) {
      activeNavbarItemChildren[i].classList.remove('navbar__dropdown-item_is-hidden');
      // allNavbarItemChildren[i].classList.remove
  }
}



// Hide all dropdown menu items
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


function rotateMoreIcon() {
  //6 Rotate the active tab's more or "+" icon 
      activeTab = document.getElementsByClassName('tab_is-active');
        /* Warning – These values"[0]"" are heavily dependent on navabar.html structure
        is there a prototype function to select the named elements and unbind from html structure?*/
      activeNavbarMoreIcon = activeTab[0].children[0].children[0];
        // Add class to active tab > > to rotate the '+' icon
      activeNavbarMoreIcon.classList.add('navbar__icon-more_is-active');
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



// mobile nav – layer 1
function menuPressed() {
  if(navbar.classList.contains('navbar_is-open', 'menu_is-active')) {
    addChildClassIsHidden();
    activeNavbarMoreIcon.classList.remove('navbar__icon-more_is-active');
    collapseDropdown.stage1();
    collapseDropdown.stage2();
    collapseDropdown.stage3();
    collapseDropdown.stage4();
    menu.innerText = "Menu ";
  } else if (navbar.classList.contains('menu_is-active')) {
    clearTimeout(collapseDropdown.stage2());
    clearTimeout(collapseDropdown.stage3());
    clearTimeout(collapseDropdown.stage4());
    menu.innerText = "Menu ";
  } else {
    navbar.classList.add('menu_is-active');
    navbar.style.setProperty('margin-bottom', '75vh');
    menubar.style.setProperty('visibility', 'visible');
    menubar.style.setProperty('right', '0px');
    menu.innerText = "Close";
  }
}