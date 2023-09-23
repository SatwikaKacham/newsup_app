const API_KEY ="9e598dfda985489fbcc9e3df5596127a";
const url="https://newsapi.org/v2/everything?q=";
const ipl=document.getElementById('Ipl');
const politics=document.getElementById('Politics');
const finance=document.getElementById('Finance');
const home=document.getElementById('home');
const searchNews=document.getElementById('search-news');

window.addEventListener("load", ()=>fetchNews("India"));
home.addEventListener("click", ()=>fetchNews("India"));
ipl.addEventListener("click", ()=>fetchNews("ipl"));
politics.addEventListener("click",()=> fetchNews("Politics"));
finance.addEventListener("click", ()=>fetchNews("Finance"));

searchNews.addEventListener("change",()=>{
    const qry=searchNews.value;
    if(!qry) return;
    fetchNews(qry);
})


async function fetchNews(query)
{
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    console.log(data);
    bindData(data.articles);
}


function bindData(articles)
{
    const allCards= document.getElementById("all-cards");
    const cardTemplate=document.getElementById("template-news-card");

    allCards.innerHTML="";

    articles.forEach( (article) =>{
         if(!article.urlToImage || article.urlToImage=="") return ;
        const cardClone=cardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        allCards.appendChild(cardClone);

    })

    function fillDataInCard(cardClone,article)
    {
        const newsImg=cardClone.getElementById('card-image');
        const newsTitle=cardClone.getElementById('card-head');
        const newsSrc=cardClone.getElementById('card-source');
        const newsDesc=cardClone.getElementById('card-discription');

       // console.log(article.description)
       newsImg.src = article.urlToImage;
        newsTitle.innerHTML=article.title;
        newsDesc.innerHTML=article.description;
        const date=new Date(article.publishedAt).toLocaleString("en-US",{timeZone: "Asia/jakarta"});
        newsSrc.innerHTML=article.source.name+" : " +date;


        // cardclone is template so we are getting first element to apply event
        cardClone.firstElementChild.addEventListener('click',() => window.open(article.url));

    }



    
}