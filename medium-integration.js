
/**

█░█░█ █▀▀ █▄▄ █▀▀ █░░ █▀█ █░█░█
▀▄▀▄▀ ██▄ █▄█ █▀░ █▄▄ █▄█ ▀▄▀▄▀

█▀▄▀█ █▀▀ █▀▄ █ █░█ █▀▄▀█ ░ ░░█ █▀
█░▀░█ ██▄ █▄▀ █ █▄█ █░▀░█ ▄ █▄█ ▄█

webflow-medium.js - Dynamically embed medium previews in Webflow or wherever TF you want! 👍

by @paulpierre 2021-10-15

https://www.github.com/paulpierre

Interested in working in Blockchain. Want to bring real token utility to web3?
Come join us! https://www.conductiveresearch.com


 **/
async function getMedium() {

  // Configuration values
  const USERNAME = 'souliehq';
  const ARTICLE_COUNT = 3; //total # of medium articles being displayed
  const TITLE_MAX_LENGTH = 75; //cut off for the header title
  const DESCRIPTION_MAX_LENGTH = 200; //max number of characters for the preview description
  const DEFAULT_THUMBNAIL = 'https://uploads-ssl.webflow.com/62a6f478e084b93185834df1/640edc1a6be61f4c5b971c96_soulie_opengraph_1200x630.jpg';
  
  // Query selector strings
  const ARTICLE_THUMBNAILS = [
    '.medium-header-image-1',
    '.medium-header-image-2',
    '.medium-header-image-3'
  ];
  const ARTICLE_TITLE = 'medium-article-title';
  const ARTICLE_DESCRIPTION = 'medium-article-desc';
  const ARTICLE_MINUTES = 'medium-article-desc';
  const MINUTES_TEXT = 'medium-article-desc';
  const ARTICLE_LINKS = 'medium-article-desc';

  alert("Enne URLi..")
  const url = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${USERNAME}/`;

  //grab the RSS json
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  });

  const o = await response.json();
  alert("Tulemus : ", o)
  // lets setup the images, you can change this w/ a query selector
  var article_images = []
  for (const o of ARTICLE_THUMBNAILS) { article_images.push(document.querySelector(o)); }

  //lets setup the elements into an array so we can iterate
  const article_titles = document.querySelectorAll(ARTICLE_TITLE);
  const article_descriptions = document.querySelectorAll(ARTICLE_DESCRIPTION);
  const article_minutes = document.querySelectorAll(ARTICLE_MINUTES);
  const article_links = document.querySelectorAll(ARTICLE_LINKS);

  //lets iterate and change the content
  for(i=0;i<ARTICLE_COUNT;i++)
  {
    article = o.items[i];
    let title = article.title;//.substr(0,TITLE_MAX_LENGTH);
    let link=article.link;

    //here, if we find no image was provided, we replace the default medium pixel with our default image above
    let img=(article.thumbnail && article.thumbnail.substr(19,7) != '_/stat?')?article.thumbnail:DEFAULT_THUMBNAIL;

    //lets strip the HTML as well fix the number of characters
    // TODO: rather than restrict character length, restrict word length via split(), slice the array, and voila. too lazy RN
    let description = article.description.replace('\n','').replace('</p>','<br><br>').replace(/<\/?[^>]+(>|$)/g, "").substr(0,DESCRIPTION_MAX_LENGTH) + ' ...'

    //we know the average person can read 200 words per minute, lets count the words, do some math and round
    let minutes = Math.floor(article.content.replace(/<\/?[^>]+(>|$)/g, "").split(' ').length / 200)

    //console.log(`title:${title}\nlink:${link}\nimg:${img}\nminutes: ${minutes}`);

    //lets go ahead and change the content
    article_images[i].style.backgroundImage=`url('${img}')`;
    article_titles[i].innerText=title;
    article_descriptions[i].innerHTML=description;
    article_minutes[i].innerText=`${minutes} ${MINUTES_TEXT}`;
    article_links[i].href=link;
  }
}
getMedium();