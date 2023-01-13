import React from "react"
import axios from "axios";

function NewsFeed() {

  const [articles, setArticles] = React.useState(null)
  console.log(process.env.REACT_APP_RAPID_API_KEY)

  React.useEffect(()=>{

    const options = {
      method: 'GET',
      url: 'https://crypto-news16.p.rapidapi.com/news/coindesk',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      setArticles(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }, [])

  const news = articles?.slice(0,7).map((article, index) => {
    return(
      <div key={index}>
        <a href={article.url}><h4>{article.title}</h4></a>
      </div>
    )
  })

  return (
    <div className="news-feed">
      <h2>NewsFeed</h2>
      {news}
    </div> 
  )
}

export default NewsFeed
