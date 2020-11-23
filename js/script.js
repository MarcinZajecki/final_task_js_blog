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
    console.log(activeArticles, ' -> active articles');
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


{
    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    function generateTitleLinks(){
        console.log('the function generateTitleLinks has been executed');
        /* remove contents of titleList */
        const titleLink = document.querySelector(optTitleListSelector);
        titleLink.innerHTML = '';
        /* get the article id */ /* find the title element */
        const articles = document.querySelectorAll(optArticleSelector);
        let html = '';
        for (let singleArticle of articles) {
            console.log(singleArticle, ' -> single article')
            /* get the article id */
            const articleId = singleArticle.getAttribute('id');
            console.log(articleId, ' -> single article ID');
            /* find the title element*/
            const articleTitle = singleArticle.querySelector(optTitleSelector);
            console.log(articleTitle, ' -> singleArticle title');
            const articleTitleString = articleTitle.innerHTML;
            console.log(articleTitleString, ' -> article title string');
            /* create HTML of the link */ 
            const linkHTML = '<li><a href="#' + articleId + '"<span>' + articleTitleString + '</span></a></li>';
            console.log(linkHTML, ' -> this is a HTML link');
            html = html + linkHTML;
            console.log(html, ' -> html variable');
        }
        /* insert link into titleList */  
        titleLink.innerHTML = html;
        
        // Articles' title links from a sidebar 
        const links = document.querySelectorAll('.titles a');
        console.log(links, ' -> all the articles title links from a sidebar');
        // Displaying selected articles
        for (let singleLink of links) {
            console.log(singleLink, ' -> a single link from a sidebar');
            singleLink.addEventListener('click', titleClickHandler);
        }
    }

    generateTitleLinks();
}

 
