// g-in-depth

/*
Set the padding of the article to be height of title space plus a constant

1 taking total working line height
2 subtract top space (50px)
3 adjust for visual aesthetic with a const(+16px)
4 add total to margin-top

Top space 50px is a distance from the top of margin-top to the top of banner__header-title's 
bounding box and was found by measuring off of the screen
*/

const topSpace = 50;
const visualBalance = 22;
const article = document.querySelector('.banner__article');
const getTitleParams = document.querySelector('.banner__header-title').getBoundingClientRect();
let title = {
	height: getTitleParams.height
}

article.style.setProperty('margin-top', `${title.height - topSpace + visualBalance}px`);
