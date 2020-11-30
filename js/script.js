/* eslint-disable no-inner-declarations */
'use strict';

// Delete default active class , add the class to the selected link&&article, display selected article
const titleClickHandler = function (event){
  event.preventDefault();
  console.dir(titleClickHandler);
  // 'this'  element
  const clickedElement = this;
  console.log(clickedElement, ` -> titleClickHandler clickedElement`);
  // Event element & currentTarget
  console.log(event, ` -> titleClickHandler event`);
  console.log(event.currentTarget, ` -> titleClickHandler currentTarget`);
  // Articles' active title links from a sidebar
  const activeLinks = document.querySelectorAll('.titles a.active');
  console.log(activeLinks, ` -> all the articles active title links from a sidebar`);
  // Loop - a single active link from a sidebar - removing class 'active'
  for (let activeLink of activeLinks){
    activeLink.classList.remove(`active`);
  }
  // Add an active class to the clicked element
  clickedElement.classList.add(`active`);
  // All active articles
  const activeArticles = document.querySelectorAll(`article.active`);
  console.log(activeArticles, ` -> active articles`);
  // Loop - a single active article - removing class 'active'
  for (let activeArticle of activeArticles){
    activeArticle.classList.remove(`active`);
  }
  // Selecting article & displaying
  const clickedLinkAttribute = clickedElement.getAttribute(`href`);
  console.log(clickedLinkAttribute, ` -> links href attribute`);
  const selectedArticle = document.querySelector(clickedLinkAttribute);
  console.log(selectedArticle, ` -> selected article`);
  selectedArticle.classList.add(`active`);
};

{
  const optArticleSelector = `.post`,
    optTitleSelector = `.post-title`,
    optTitleListSelector = `.titles`,
    optArticleTagsSelector = `.post-tags .list`,
    optAuthorSelector = `.post-author`,
    optTagsListSelector = `.list.tags`;

  function generateTitleLinks(customSelector = ``){
    console.log(`the function generateTitleLinks has been executed`);
    /* remove contents of titleList */
    const titleLink = document.querySelector(optTitleListSelector);
    titleLink.innerHTML = ``;
    /* get the article id */ /* find the title element */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = ``;
    for (let singleArticle of articles){
      console.log(singleArticle, ` -> single article`);
      /* get the article id */
      const articleId = singleArticle.getAttribute(`id`);
      console.log(articleId, ` -> single article ID`);
      /* find the title element*/
      const articleTitle = singleArticle.querySelector(optTitleSelector);
      console.log(articleTitle, ` -> singleArticle title`);
      const articleTitleString = articleTitle.innerHTML;
      console.log(articleTitleString, ` -> article title string`);
      /* create HTML of the link */
      const linkHTML = `<li><a href="#${articleId}"><span>${articleTitleString}</span></a></li>`;
      console.log(linkHTML, ` -> this is a HTML link`);
      html = html + linkHTML;
      console.log(html, ` -> html variable`);
    }
    /* insert link into titleList */
    titleLink.innerHTML = html;
    // Add default active class to the link
    const defArticleId = document.querySelector(`article.active`).getAttribute(`id`);
    const defArticleLink = document.querySelector(`a[href*=${defArticleId}]`);
    defArticleLink.classList.add(`active`);
    // Articles' title links from a sidebar
    const links = document.querySelectorAll(`.titles a`);
    console.log(links, ` -> all the articles title links from a sidebar`);
    // Displaying selected articles
    for (let singleLink of links){
      console.log(singleLink, ` -> a single link from a sidebar`);
      singleLink.addEventListener(`click`, titleClickHandler);
    }
  }
  generateTitleLinks();

  // TAGS

  function generateTags(){
    console.log(`function generateTags has been executed`);
    /* [NEW] create a new variable allTags with an empty array */
    let allTags = [];
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let singleArticle of articles){
      const articleTag = singleArticle.querySelector(optArticleTagsSelector);
      console.log(articleTag, ` to articleTag`);
      articleTag.innerHTML = ``;
      /* make html variable with empty string */
      let html = ``;
      /* get tags from data-tags attribute */
      const tagsString = singleArticle.dataset.tags;
      console.log(tagsString, ` -> to tagi z data-tags`);
      const tagsArrays = tagsString.split(` `);
      console.log(tagsArrays, ` -> to obiekt z tagami`);
      /* START LOOP: for each tag */
      for (let singleTagArray of tagsArrays){
      /* generate HTML of the link */
        console.log(singleTagArray, ` to single tag array`);
        const tagLinkHtml = `<li><a href="#tag-${singleTagArray}"><span>${singleTagArray}</span></a></li> `;
        /* add generated code to html variable */
        html = html + tagLinkHtml;
        console.log(html, `to wartość html`);
        /* [NEW] check if this link is NOT already in allTags */
        if (allTags.indexOf(tagLinkHtml) === -1) allTags.push(tagLinkHtml);
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      articleTag.innerHTML = html;
    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */  /* [NEW] add html from allTags to tagList */
    const tagList = document.querySelector(optTagsListSelector);
    tagList.innerHTML = allTags.join(` `);
  }

  generateTags();

  const tagClickHandler = function (event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log(clickedElement, `to z this`);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute(`href`);
    console.log(href, ` to jest href z this`);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag =  href.substring(5);
    console.log(tag, ` to z href nazwa tagu`);
    /* find all tag links with class active */
    const tagLinksActive = document.querySelectorAll(`a.active[href^="#tag-"]`);
    /* START LOOP: for each active tag link */
    for (let singleTagLinkActive of tagLinksActive){
      /* remove class active */
      singleTagLinkActive.classList.remove(`active`);
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const chosenTagLinks = document.querySelectorAll(`a[href="${href}"]`);
    console.log(chosenTagLinks, `wszytskie linki do kliknietego tagu`);
    /* START LOOP: for each found tag link */
    for (let singleChosenTagLink of chosenTagLinks){
      /* add class active */
      singleChosenTagLink.classList.add(`active`);
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks(`[data-tags~=${tag}]`);
  // eslint-disable-next-line semi
  }
  function addClickListenersToTags(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll(`a[href^="#tag-"]`);
    console.log(tagLinks, ` -> to wszystkie linki do tagow`);
    /* START LOOP: for each link */
    for (let singleTagLink of tagLinks){
      /* add tagClickHandler as event listener for that link */
      singleTagLink.addEventListener(`click`, tagClickHandler);
      /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();

  // AUTHORS

  function generateAuthors(){
    console.log(`function generateAuthors has been executed`);
    const articles = document.querySelectorAll(optArticleSelector);
    for (let singleArticle of articles){
      const authorsArticle = singleArticle.querySelector(optAuthorSelector);
      authorsArticle.innerHTML = ``;
      const authorsArticleString = singleArticle.dataset.author;
      const authorsArray = authorsArticleString.split(` `);
      let html = ``;
      for (let singleAuthorArray of authorsArray){
        const fixAuthorString = singleAuthorArray.replace(`_`, ` `);
        const htmlAuthor = `<a href="#auth-${singleAuthorArray}"><span>${fixAuthorString}</span></a> `;
        html = html + htmlAuthor;
      }
      authorsArticle.innerHTML = html;
    }
  }
  generateAuthors();

  function authorsClickHandler(event){
    console.log(`function authorsClickHandler has been executed`);
    event.preventDefault();
    const clickedElement = this;
    console.log(clickedElement, ` to jest this z autorów`);
    const href = clickedElement.getAttribute(`href`);
    const tag = href.substring(6);
    const authorsLinkActive = document.querySelectorAll(`a.active[href^="#auth-"]`);
    for (let singleAuthorsLinkActive of authorsLinkActive){
      singleAuthorsLinkActive.classList.remove(`active`);
    }
    const choosenAuthorsLinks = document.querySelectorAll(`a[href="${href}"]`);
    for (let singleChoosenAuthorLink of choosenAuthorsLinks){
      singleChoosenAuthorLink.classList.add(`active`);
    }
    generateTitleLinks(`[data-author~=${tag}]`);
  }

  function addClickListenerToAuthors(){
    console.log(`function addClickListenerToAuthors has been executed`);
    const authorsArticleLink = document.querySelectorAll(`a[href^="#auth-"]`);
    for (let singleAuthorArticleLink of authorsArticleLink){
      singleAuthorArticleLink.addEventListener(`click`, authorsClickHandler);
    }
  }

  addClickListenerToAuthors();

}
