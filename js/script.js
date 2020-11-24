/* eslint-disable no-inner-declarations */
'use strict';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove(`active`);
  }
  clickedElement.classList.add(`active`);
  const activeArticles = document.querySelectorAll(`article.active`);
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove(`active`);
  }
  const clickedLinkAttribute = clickedElement.getAttribute(`href`);
  const selectedArticle = document.querySelector(clickedLinkAttribute);
  selectedArticle.classList.add(`active`);
}


{
  const optArticleSelector = `.post`,
    optTitleSelector = `.post-title`,
    optTitleListSelector = `.titles`;

  function generateTitleLinks(){
    const titleLink = document.querySelector(optTitleListSelector);
    titleLink.innerHTML = ``;
    const articles = document.querySelectorAll(optArticleSelector);
    let html = ``;
    for (let singleArticle of articles) {
      const articleId = singleArticle.getAttribute(`id`);
      const articleTitle = singleArticle.querySelector(optTitleSelector);
      const articleTitleString = articleTitle.innerHTML;
      const linkHTML = `<li><a href="#${articleId}"<span>${articleTitleString}</span></a></li>`;
      html = html + linkHTML;
    }
    titleLink.innerHTML = html;
    const defArticleId = document.querySelector(`article.active`).getAttribute(`id`);
    const defArticleLink = document.querySelector(`a[href*=${defArticleId}]`);
    defArticleLink.classList.add(`active`);
    const links = document.querySelectorAll(`.titles a`);
    for (let singleLink of links) {
      singleLink.addEventListener(`click`, titleClickHandler);
    }
  }

  generateTitleLinks();
}
