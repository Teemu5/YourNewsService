import axios from 'axios'
import {ArticleItem} from "../models";

  const getBingNewsArticlesForCategory = async (category: string) => {

    // MAXIMUM 1,000 request / month
    // 3 requests per second
    var axios = require("axios").default;
    var newArticles: ArticleItem[] = []
    var options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news',
      params: {
        category: 'Business',
        cc: 'US',
        setLang: 'en-US',
        safeSearch: 'Off',
        textFormat: 'Raw'
      },
      headers: {
        'x-bingapis-sdk': 'true',
        'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
        'x-rapidapi-key': '672414f34bmsh96fc902ca2c6841p1f1181jsnee10a2cef1b2'
      }
    }
    await axios.request(options).then((response: { data: {
    value: any } }) => response.data.value.map(
    (article: { provider: any; description: any; name: any; url: any; topic: any;}) => ({
        source: `${article.provider[0].name}`,
        text: `${article.description}`,
        title: `${article.name}`,
        sourceLink: `${article.url}`,
        category: `${category}`
    }))).then((resArticles: ArticleItem[]) => {
      newArticles = resArticles
      console.log(resArticles)
    })

    return newArticles
  }

  const getAllBingNewsArticles = async () => {
    /*
    ALL CATEGORIES IN BING NEWS API
    */
   console.log(getBingNewsArticlesForCategory('business'))
    return [...await getBingNewsArticlesForCategory('business'), ...await getBingNewsArticlesForCategory('Entertainment'),
            ...await getBingNewsArticlesForCategory('Health'), ...await getBingNewsArticlesForCategory('Politics'),
            ...await getBingNewsArticlesForCategory('Products'), ...await getBingNewsArticlesForCategory('ScienceAndTechnology'),
            ...await getBingNewsArticlesForCategory('Sports'), ...await getBingNewsArticlesForCategory('US'), 
            ...await getBingNewsArticlesForCategory('World')]
    }





  const getNewscatcherArticles = () => {

    // MAXIMUM 21 REQUEST PER HOUR
    var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://newscatcher.p.rapidapi.com/v1/latest_headlines',
  params: {lang: 'en', media: 'True'},
  headers: {
    'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
    'x-rapidapi-key': '672414f34bmsh96fc902ca2c6841p1f1181jsnee10a2cef1b2'
  }
  }

  const articles = axios.request(options).then((response: { data: {
    articles: any } }) => response.data.articles.map(
    (article: { clean_url: any; summary: any; title: any; link: any; topic: any;}) => ({
        source: `${article.clean_url}`,
        text: `${article.summary}`,
        title: `${article.title}`,
        sourceLink: `${article.link}`,
        category: `${article.topic}`
    }))
)
console.log(articles)
return articles
}

/*
  const getArticlesAPI = () => {
    // EI KATEGORIOITA
    // my apiKey is 1c2c347030b145fd9b6aeb4a4a3e073c
    // MAXIMUM 100 REQUESTS PER DAY
    // https://newsapi.org/v2/everything?apiKey=1c2c347030b145fd9b6aeb4a4a3e073c
    
  const request = axios.get("https://newsapi.org/v2/everything?apiKey=1c2c347030b145fd9b6aeb4a4a3e073c")
  const articles = request.then(response => response.data.articles.map(
        (article: { source: any; description: any; publishedAt: any; title: any; url: any; sources: any;}) => ({
            source: `${article.source.name}`,
            text: `${article.description}`,
            title: `${article.title}`,
            sourceLink: `${article.url}`,
            category: `${article.sources.category}`
        }))
    )
    console.log(articles)
    return articles
  }
*/

export default { getNewscatcherArticles, getBingNewsArticlesForCategory, getAllBingNewsArticles }






// NO BACKEND YET

/*
const baseUrl = '/api/news'
let token: string
const setToken = (newToken: any) => {
  token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response: { data: any }) => response.data)
}

const create = async (newObject: any) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const del = async (id: any) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(token)
  const res = await axios.delete(`${ baseUrl }/${id}`, config)
  return res.data
}
const update = async (id: any, newObject: any) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.put(`${ baseUrl }/${id}`, newObject, config)
  return res.data
}
*/