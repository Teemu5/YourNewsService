import axios from 'axios'
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

const getArticlesAPI = () => {
    // my apiKey is 1c2c347030b145fd9b6aeb4a4a3e073c
    // MAXIMUM 100 REQUESTS PER DAY
    // https://newsapi.org/v2/everything?q=ai&apiKey=1c2c347030b145fd9b6aeb4a4a3e073c
    
  const request = axios.get("https://newsapi.org/v2/everything?q=ai&apiKey=1c2c347030b145fd9b6aeb4a4a3e073c")
  const articles = request.then(response => response.data.articles.map(
        (article: { source: any; description: any; publishedAt: any; title: any; url: any; }) => ({
            source: `${article.source.name}`,
            text: `${article.description}`,
            title: `${article.title}`,
            sourceLink: `${article.url}`
        }))
    )
    return articles
  }

export default { getArticlesAPI, setToken, getAll, create, update, del }