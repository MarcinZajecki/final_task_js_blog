'use strict';

// Delete default active class , add the class to the selected link&&article, display selected article
const titleClickHandler = function (event) {
    event.preventDefault();
    console.dir(titleClickHandler);
    // 'this'  element
    const clickedElement = this;
    console.log(clickedElement, ' -> titleClickHandler clickedElement');
    // Event element & currentTarget
    console.log(event, ' -> titleClickHandler event');
    console.log(event.currentTarget, ' -> titleClickHandler currentTarget');
    // Articles' active title links from a sidebar 
    const activeLinks = document.querySelectorAll('.titles a.active');
    console.log(activeLinks, ' -> all the articles active title links from a sidebar');
    // Loop - a single active link from a sidebar - removing class 'active'
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }
    // Add an active class to the clicked element
    clickedElement.classList.add('active');
    // All active articles
    const activeArticles = document.querySelectorAll('article.active');
    console.log(activeArticles, ' -> active articles before using function titleClickHaldler');
    // Loop - a single active article - removing class 'active'
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
    // Selecting article & displaying
    const clickedLinkAttribute = clickedElement.getAttribute('href');
    console.log(clickedLinkAttribute, ' -> link`s href attribute');
    const selectedArticle = document.querySelector(clickedLinkAttribute);
    console.log(selectedArticle, ' -> selected article');
    selectedArticle.classList.add('active');
}

// Articles' title links from a sidebar 
const links = document.querySelectorAll('.titles a');
console.log(links, ' -> all the articles title links from a sidebar');
// Displaying selected articles
for (let singleLink of links) {
    console.log(singleLink, ' -> a single link from a sidebar');
    singleLink.addEventListener('click', titleClickHandler);
}





  /* remove class 'active' from all article links  CHECK 

   add class 'active' to the clicked link  CHECK

   remove class 'active' from all articles CHECK

   get 'href' attribute from the clicked link CHECK

   find the correct article using the selector (value of 'href' attribute) CHECK

   add class 'active' to the correct article CHECK*/



