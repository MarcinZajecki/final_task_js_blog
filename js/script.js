/* eslint-disable no-inner-declarations */
'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

{
  const opt = {
    select: {
      article: '.post',
      title: '.post-title',
      tag: '.post-tags .list',
      author: '.post-author',
    },
    list: {
      title: '.titles',
      tag: '.list.tags',
      author: '.list.authors',
    },
    cloud: {
      classCount: 5,
      authorPrefix: 'author-size-',
      tagPrefix: 'tag-size-',
    },
  };

  const titleClickHandler = function (event){
    event.preventDefault();
    const clickedElement = this;
    // find and hide active article link
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (const activeLink of activeLinks){
      activeLink.classList.remove(`active`);
    }
    // show clicked article link
    clickedElement.classList.add('active');
    // find and hide active article
    const activeArticles = document.querySelectorAll('article.active');
    for (const activeArticle of activeArticles){
      activeArticle.classList.remove(`active`);
    }
    // find article related to clicked link and show it
    const clickedLinkAttribute = clickedElement.getAttribute('href');
    const selectedArticle = document.querySelector(clickedLinkAttribute);
    selectedArticle.classList.add('active');
  };

  function generateTitleLinks(customSelector = ''){
    /* remove contents of titleList */
    const titleLink = document.querySelector(opt.list.title);
    titleLink.innerHTML = '';
    /* get the article id */ /* find the title element */
    const articles = document.querySelectorAll(opt.select.article + customSelector);
    let html = '';
    for (const singleArticle of articles){
      /* get the article id */
      const articleId = singleArticle.getAttribute('id');
      /* find the title element*/
      const articleTitle = singleArticle.querySelector(opt.select.title);
      const articleTitleString = articleTitle.innerHTML;
      /* create HTML of the link */
      const linkHTMLData = {id: articleId, title: articleTitleString};
      const linkHTML = templates.articleLink(linkHTMLData);
      html = html + linkHTML;
    }
    /* insert link into titleList */
    titleLink.innerHTML = html;
    // Articles' title links from a sidebar
    const links = document.querySelectorAll('.titles a');
    // Displaying selected articles
    for (const singleLink of links){
      singleLink.addEventListener('click', titleClickHandler);
    }
  }

  function defArticleActiveLink (){
    // Add default active class to the link
    const defArticleId = document.querySelector('article.active').getAttribute('id');
    const defArticleLink = document.querySelector(`a[href*=${defArticleId}]`);
    defArticleLink.classList.add('active');
  }

  // TAGS

  // function which is counting a number of times a specific tag occurs
  function calculateTagsParams(tags){
    const obj = tags;
    let arr = Object.values(obj);
    let min = Math.min(...arr);
    let max = Math.max(...arr);
    const params = {'minimum': min, 'maximum': max};
    return params;
    // alternative version
    // const params = {max: 0, min: Infinity};
    // for(const tag in tags){
    //   // params.max = Math.max(tags[tag], params.max);
    //   // params.min = Math.min(tags[tag], params.min);
    //   params.max < tags[tag] ? params.max = tags[tag] : params.max;
    //   !params.min < tags[tag] ? params.min = tags[tag] : params.min;
    // }
    // return params;
  }

  // dividing tags to a specific number of class
  function calculateTagClass(count, params){
    // for(let i = 1; i < opt.cloud.classCount + 1; i++){
    //   if (count <= i/opt.cloud.classCount*params.maximum) return opt.cloud.tagPrefix + i;
    // }
    const normalizedCount = count - params.minimum;
    const normalizedMax = params.maximum - params.minimum;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opt.cloud.classCount - 1) + 1);
    return opt.cloud.tagPrefix + classNumber;
  }

  function generateTags(){
    /*create a new variable allTags with an empty object */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(opt.select.article);
    /* START LOOP: for every article: */
    for (let singleArticle of articles){
      const articleTag = singleArticle.querySelector(opt.select.tag);
      articleTag.innerHTML = '';
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const tagsString = singleArticle.dataset.tags;
      const tagsArrays = tagsString.split(' ');
      /* START LOOP: for each tag */
      for (const singleTagArray of tagsArrays){
      /* generate HTML of the link */
        const tagLinkHTMLData = {id: singleTagArray, tagName: singleTagArray};
        const tagLinkHtml = templates.tagLink(tagLinkHTMLData);
        /* add generated code to html variable */
        html = html + tagLinkHtml;
        /*check if this link is NOT already in allTags */
        if (!allTags[singleTagArray]) {
          allTags[singleTagArray] = 1;
        } else {
          allTags[singleTagArray]++;
        }
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      articleTag.innerHTML = html;
    /* END LOOP: for every article: */
    }
    // counting a number of times a specific tag occurs
    const tagsParams = calculateTagsParams(allTags);
    /*create variable for all tag links HTML code */
    const allTagsData = {tags: []};
    for (const tag in allTags){
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams),
      });
    }
    /*find list of tags in right column */
    const tagList = document.querySelector(opt.list.tag);
    /*add html to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }

  const tagClickHandler = function (event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag =  href.substring(5);
    /* find all tag links with class active */
    const tagLinksActive = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (const singleTagLinkActive of tagLinksActive){
      /* remove class active */
      singleTagLinkActive.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const chosenTagLinks = document.querySelectorAll(`a[href="${href}"]`);
    /* START LOOP: for each found tag link */
    for (const singleChosenTagLink of chosenTagLinks){
      /* add class active */
      singleChosenTagLink.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks(`[data-tags~=${tag}]`);
  // eslint-disable-next-line semi
  }
  function addClickListenersToTags(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for (const singleTagLink of tagLinks){
      /* add tagClickHandler as event listener for that link */
      singleTagLink.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  }

  // AUTHORS

  function calculateAuthorsParams (authors){
    const authorsValues = Object.values(authors);
    const max = Math.max(...authorsValues);
    const min = Math.min(...authorsValues);
    const params = {minimum: min, maximum: max};
    return params;
  }

  function calculateAuthorClass(count, params){
    const normalizedCount = count - params.minimum;
    const normalizedMax = params.maximum - params.minimum;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opt.cloud.classCount - 1) + 1);
    return opt.cloud.authorPrefix + classNumber;
  }

  function generateAuthors(){
    let allAuthors = {};
    const articles = document.querySelectorAll(opt.select.article);
    for (const singleArticle of articles){
      const authorsArticle = singleArticle.querySelector(opt.select.author);
      authorsArticle.innerHTML = '';
      const authorsArticleString = singleArticle.dataset.author;
      const authorsArray = authorsArticleString.split(' ');
      let html = '';
      for (const singleAuthorArray of authorsArray){
        const fixAuthorString = singleAuthorArray.replace('_', ' ');
        const authorLinkHtmlData = {id: singleAuthorArray, authorName: fixAuthorString};
        const htmlAuthor = templates.authorLink(authorLinkHtmlData);
        html = html + htmlAuthor;
        if(!allAuthors[singleAuthorArray]) allAuthors[singleAuthorArray] = 1;
        else allAuthors[singleAuthorArray]++;
      }
      authorsArticle.innerHTML = html;
    }
    const authorsList = document.querySelector(opt.list.author);
    authorsList.innerHTML ='';
    const authorsParams = calculateAuthorsParams(allAuthors);
    const authorLinkHtmlData = {authors: []};
    for (const singleAuthor in allAuthors){
      const fixAuthorListString = singleAuthor.replace('_', ' ');
      authorLinkHtmlData.authors.push({
        authClassName: calculateAuthorClass(allAuthors[singleAuthor], authorsParams),
        authName: singleAuthor,
        authString: fixAuthorListString,
      });
    }
    authorsList.innerHTML = templates.authCloudLink(authorLinkHtmlData);

  }
  function authorsClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.substring(6);
    const authorsLinkActive = document.querySelectorAll('a.active[href^="#auth-"]');
    for (const singleAuthorsLinkActive of authorsLinkActive){
      singleAuthorsLinkActive.classList.remove('active');
    }
    const choosenAuthorsLinks = document.querySelectorAll(`a[href="${href}"]`);
    for (const singleChoosenAuthorLink of choosenAuthorsLinks){
      singleChoosenAuthorLink.classList.add('active');
    }
    generateTitleLinks(`[data-author~=${tag}]`);
  }

  function addClickListenerToAuthors(){
    const authorsArticleLink = document.querySelectorAll('a[href^="#auth-"]');
    for (const singleAuthorArticleLink of authorsArticleLink){
      singleAuthorArticleLink.addEventListener('click', authorsClickHandler);
    }
  }
  // Add active class to article which is visible by default
  function allArticleLinksVisible() {
    const abc = document.getElementById('article-caller');
    abc.addEventListener('click', function(){
      generateTitleLinks('');
    });
  }

  generateTitleLinks();
  generateTags();
  addClickListenersToTags();
  generateAuthors();
  addClickListenerToAuthors();
  allArticleLinksVisible();
  defArticleActiveLink ();
}
