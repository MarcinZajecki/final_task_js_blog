/* eslint-disable no-inner-declarations */
'use strict';

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

  // Delete default active class , add the class to the selected link&&article, display selected article
  const titleClickHandler = function (event){
    event.preventDefault();
    console.dir(titleClickHandler);
    // 'this'  element
    const clickedElement = this;
    console.log(clickedElement, ' -> titleClickHandler clickedElement');
    // Event element & currentTarget
    console.log(event, ' -> titleClickHandler event');
    console.log(event.currentTarget, ' -> titleClickHandler currentTarget');
    // find and hide active article link
    const activeLinks = document.querySelectorAll('.titles a.active');
    console.log(activeLinks, ' -> all the articles active title links from a sidebar');
    // find and hide active article
    for (let activeLink of activeLinks){
      activeLink.classList.remove(`active`);
    }
    // Add an active class to the clicked element
    clickedElement.classList.add('active');
    // All active articles
    const activeArticles = document.querySelectorAll('article.active');
    console.log(activeArticles, ' -> active articles');
    // active article - removing class 'active'
    for (let activeArticle of activeArticles){
      activeArticle.classList.remove(`active`);
    }
    // Selecting article & displaying
    const clickedLinkAttribute = clickedElement.getAttribute('href');
    console.log(clickedLinkAttribute, ' -> links href attribute');
    const selectedArticle = document.querySelector(clickedLinkAttribute);
    console.log(selectedArticle, ' -> selected article');
    selectedArticle.classList.add('active');
  };

  function generateTitleLinks(customSelector = ''){
    console.log('the function generateTitleLinks has been executed');
    /* remove contents of titleList */
    const titleLink = document.querySelector(opt.list.title);
    titleLink.innerHTML = '';
    /* get the article id */ /* find the title element */
    const articles = document.querySelectorAll(opt.select.article + customSelector);
    let html = '';
    for (let singleArticle of articles){
      console.log(singleArticle, ' -> single article');
      /* get the article id */
      const articleId = singleArticle.getAttribute('id');
      console.log(articleId, ' -> single article ID');
      /* find the title element*/
      const articleTitle = singleArticle.querySelector(opt.select.title);
      console.log(articleTitle, ' -> singleArticle title');
      const articleTitleString = articleTitle.innerHTML;
      console.log(articleTitleString, ' -> article title string');
      /* create HTML of the link */
      const linkHTML = `<li><a href="#${articleId}"><span>${articleTitleString}</span></a></li>`;
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
    for (let singleLink of links){
      console.log(singleLink, ' -> a single link from a sidebar');
      singleLink.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();

  function defArticleActiveLink (){
    // Add default active class to the link
    console.log('function defArticleActiveLink has been executed');
    const defArticleId = document.querySelector('article.active').getAttribute('id');
    console.log(defArticleId, 'defArticleId');
    const defArticleLink = document.querySelector(`a[href*=${defArticleId}]`);
    console.log(defArticleLink, 'defArticleLink');
    defArticleLink.classList.add('active');
  }

  // TAGS

  // function which is counting a number of times a specific tag occurs
  function calculateTagsParams(tags){
    const obj = tags;
    let arr = Object.values(obj);
    console.log(arr, 'arr');
    let min = Math.min(...arr);
    let max = Math.max(...arr);
    console.log( `Min value: ${min}, max value: ${max}` );
    const params = {'minimum': min, 'maximum': max};
    return params;
    // const params = {max: 0, min: Infinity};
    // for(const tag in tags){
    //   // params.max = Math.max(tags[tag], params.max);
    //   // params.min = Math.min(tags[tag], params.min);
    //   params.max < tags[tag] ? params.max = tags[tag] : params.max;
    //   !params.min < tags[tag] ? params.min = tags[tag] : params.min;
    // }
    // return params;
  }

  function calculateTagClass(count, params){
    console.log('calculateTagClass count', count);
    console.log('calculateTagClass params', params);
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
    console.log('function generateTags has been executed');
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(opt.select.article);
    /* START LOOP: for every article: */
    for (let singleArticle of articles){
      const articleTag = singleArticle.querySelector(opt.select.tag);
      console.log(articleTag, ' to articleTag');
      articleTag.innerHTML = '';
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const tagsString = singleArticle.dataset.tags;
      console.log(tagsString, ' -> to tagi z data-tags');
      const tagsArrays = tagsString.split(' ');
      console.log(tagsArrays, ' -> to obiekt z tagami');
      /* START LOOP: for each tag */
      for (let singleTagArray of tagsArrays){
      /* generate HTML of the link */
        console.log(singleTagArray, ' to single tag array');
        const tagLinkHtml = `<li><a href="#tag-${singleTagArray}"><span>${singleTagArray}</span></a></li> `;
        /* add generated code to html variable */
        html = html + tagLinkHtml;
        console.log(html, 'to wartość html');
        /* [NEW] check if this link is NOT already in allTags */
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
    console.log(allTags, 'allTags');
    // counting a number of times a specific tag occurs
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    /* [NEW] create variable for all tag links HTML code */
    let allTagsHtml = '';
    for (const tag in allTags){
      console.log(`Value at tag  ${tag} in allTags: ` + allTags[tag]);
      const tagListItem = ` <li><a class="` + calculateTagClass(allTags[tag], tagsParams) + `" href="#tag-${tag}"><span>${tag}</span></a></li> `;
      console.log(tagListItem, 'tag list item');
      allTagsHtml += tagListItem;
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(opt.list.tag);
    /* [NEW] add html from allTagsHtml to tagList */
    tagList.innerHTML = allTagsHtml;
  }

  generateTags();

  const tagClickHandler = function (event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log(clickedElement, 'to z this');
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href, ' to jest href z this');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag =  href.substring(5);
    console.log(tag, ' to z href nazwa tagu');
    /* find all tag links with class active */
    const tagLinksActive = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (let singleTagLinkActive of tagLinksActive){
      /* remove class active */
      singleTagLinkActive.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const chosenTagLinks = document.querySelectorAll(`a[href="${href}"]`);
    console.log(chosenTagLinks, 'wszytskie linki do kliknietego tagu');
    /* START LOOP: for each found tag link */
    for (let singleChosenTagLink of chosenTagLinks){
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
    console.log(tagLinks, ' -> to wszystkie linki do tagow');
    /* START LOOP: for each link */
    for (let singleTagLink of tagLinks){
      /* add tagClickHandler as event listener for that link */
      singleTagLink.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();

  // AUTHORS

  function calculateAuthorsParams (authors){
    const authorsValues = Object.values(authors);
    const max = Math.max(...authorsValues);
    const min = Math.min(...authorsValues);
    const params = {minimum: min, maximum: max};
    return params;
  }

  function calculateAuthorClass(count, params){
    console.log(count);
    const normalizedCount = count - params.minimum;
    const normalizedMax = params.maximum - params.minimum;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opt.cloud.classCount - 1) + 1);
    return opt.cloud.authorPrefix + classNumber;
  }

  function generateAuthors(){
    console.log('function generateAuthors has been executed');
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
        const htmlAuthor = ` <a href="#auth-${singleAuthorArray}"><span>${fixAuthorString}</span></a> `;
        html = html + htmlAuthor;
        if(!allAuthors[singleAuthorArray]) allAuthors[singleAuthorArray] = 1;
        else allAuthors[singleAuthorArray]++;
      }
      authorsArticle.innerHTML = html;
    }
    const authorsList = document.querySelector(opt.list.author);
    authorsList.innerHTML ='';
    const authorsParams = calculateAuthorsParams(allAuthors);
    let authorLinkHtml = '';
    for (const singleAuthor in allAuthors){
      calculateAuthorClass(allAuthors[singleAuthor], authorsParams);
      const fixAuthorListString = singleAuthor.replace('_', ' ');
      const htmlAuthorList = `<li><a class = "${calculateAuthorClass(allAuthors[singleAuthor], authorsParams)}" href="#auth-${singleAuthor}"><span>${fixAuthorListString}</span></a></li>`;
      authorLinkHtml += htmlAuthorList;
    }
    console.log(allAuthors);
    authorsList.innerHTML = authorLinkHtml;

  }
  generateAuthors();

  function authorsClickHandler(event){
    console.log('function authorsClickHandler has been executed');
    event.preventDefault();
    const clickedElement = this;
    console.log(clickedElement, ' to jest this z autorów');
    const href = clickedElement.getAttribute('href');
    const tag = href.substring(6);
    const authorsLinkActive = document.querySelectorAll('a.active[href^="#auth-"]');
    for (let singleAuthorsLinkActive of authorsLinkActive){
      singleAuthorsLinkActive.classList.remove('active');
    }
    const choosenAuthorsLinks = document.querySelectorAll(`a[href="${href}"]`);
    for (let singleChoosenAuthorLink of choosenAuthorsLinks){
      singleChoosenAuthorLink.classList.add('active');
    }
    generateTitleLinks(`[data-author~=${tag}]`);
  }

  function addClickListenerToAuthors(){
    console.log('function addClickListenerToAuthors has been executed');
    const authorsArticleLink = document.querySelectorAll('a[href^="#auth-"]');
    for (let singleAuthorArticleLink of authorsArticleLink){
      singleAuthorArticleLink.addEventListener('click', authorsClickHandler);
    }
  }

  addClickListenerToAuthors();

  // Add active class to article which is visible by default
  function allArticleLinksVisible() {
    console.log('function allArticleLinksVisible is working');
    const abc = document.getElementById('article-caller');
    abc.addEventListener('click', function(){
      generateTitleLinks('');
    });
  }
  allArticleLinksVisible();
  defArticleActiveLink ();
}
