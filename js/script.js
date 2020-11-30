/* eslint-disable no-inner-declarations */
'use strict';

// Delete default active class , add the class to the selected link&&article, display selected article
const titleClickHandler = function (event){
  event.preventDefault();
  console.dir(titleClickHandler);
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks){
    activeLink.classList.remove(`active`);
  }
  clickedElement.classList.add(`active`);
  const activeArticles = document.querySelectorAll(`article.active`);
  for (let activeArticle of activeArticles){
    activeArticle.classList.remove(`active`);
  }
  const clickedLinkAttribute = clickedElement.getAttribute(`href`);
  const selectedArticle = document.querySelector(clickedLinkAttribute);
  selectedArticle.classList.add(`active`);
};

{
  const optArticleSelector = `.post`,
    optTitleSelector = `.post-title`,
    optTitleListSelector = `.titles`,
    optArticleTagsSelector = `.post-tags .list`,
    optAuthorSelector = `.post-author`;

  function generateTitleLinks(customSelector = ``){
    const titleLink = document.querySelector(optTitleListSelector);
    titleLink.innerHTML = ``;
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = ``;
    for (let singleArticle of articles){
      const articleId = singleArticle.getAttribute(`id`);
      const articleTitle = singleArticle.querySelector(optTitleSelector);
      const articleTitleString = articleTitle.innerHTML;
      const linkHTML = `<li><a href="#${articleId}"><span>${articleTitleString}</span></a></li>`;
      html = html + linkHTML;
    }
    titleLink.innerHTML = html;
    const defArticleId = document.querySelector(`article.active`).getAttribute(`id`);
    const defArticleLink = document.querySelector(`a[href*=${defArticleId}]`);
    defArticleLink.classList.add(`active`);
    const links = document.querySelectorAll(`.titles a`);
    for (let singleLink of links){
      singleLink.addEventListener(`click`, titleClickHandler);
    }
  }
  generateTitleLinks();

  // TAGS

  function generateTags(){
    console.log(`function generateTags has been executed`);
    const articles = document.querySelectorAll(optArticleSelector);
    for (let singleArticle of articles){
      const articleTag = singleArticle.querySelector(optArticleTagsSelector);
      articleTag.innerHTML = ``;
      let html = ``;
      const tagsString = singleArticle.dataset.tags;
      const tagsArrays = tagsString.split(` `);
      for (let singleTagArray of tagsArrays){
        const tagLinkHtml = `<li><a href="#tag-${singleTagArray}"><span>${singleTagArray}</span></a></li> `;
        html = html + tagLinkHtml;
      }
      articleTag.innerHTML = html;
    }
  }

  generateTags();

  const tagClickHandler = function (event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute(`href`);
    const tag =  href.substring(5);
    const tagLinksActive = document.querySelectorAll(`a.active[href^="#tag-"]`);
    for (let singleTagLinkActive of tagLinksActive){
      singleTagLinkActive.classList.remove(`active`);
    }
    const chosenTagLinks = document.querySelectorAll(`a[href="${href}"]`);
    for (let singleChosenTagLink of chosenTagLinks){
      singleChosenTagLink.classList.add(`active`);
    }
    generateTitleLinks(`[data-tags~=${tag}]`);
  // eslint-disable-next-line semi
  }
  function addClickListenersToTags(){
    const tagLinks = document.querySelectorAll(`a[href^="#tag-"]`);
    for (let singleTagLink of tagLinks){
      singleTagLink.addEventListener(`click`, tagClickHandler);
    }
  }
  addClickListenersToTags();

  // AUTHORS

  function generateAuthors(){
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
    event.preventDefault();
    const clickedElement = this;
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
    const authorsArticleLink = document.querySelectorAll(`a[href^="#auth-"]`);
    for (let singleAuthorArticleLink of authorsArticleLink){
      singleAuthorArticleLink.addEventListener(`click`, authorsClickHandler);
    }
  }

  addClickListenerToAuthors();

}
