import React from "react"
import axios from "axios";


function NewsFeed() {

  const [articles, setArticles] = React.useState(null)

  React.useEffect(()=>{

    const options = {
      method: 'GET',
      url: `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/news`
    }
    
    axios.request(options).then(function (response) {
      setArticles(response.data)
    }).catch(function (error) {
      console.error(error)
    })
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
