import React, {useState, useEffect} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  const capitalizeFirstLetter =(string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
   
  const updateNews = async () =>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=15b048032f38452e8f30c89541cc0281&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false) 
  }
  useEffect(() => {
    document.title = `DigiNews-${capitalizeFirstLetter(props.category)}`;
    updateNews();
    // eslint-disable-next-line
  },[])

  // const handlePrevClick = async()=>{
  //   setPage(page - 1);
  //   updateNews();
  // }
  // const handleNextClick = async()=>{
  //     setPage(page + 1);
  //     updateNews();
  //   }
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=15b048032f38452e8f30c89541cc0281&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };
  return (
    <>
      <h2 className='text-center' style={{ margin: '40px 0px' }}>Top -{capitalizeFirstLetter(props.category)} Headlines</h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">

          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between my-3">
        <button disabled={this.state.page<=1} type="button" className="btn btn-success"onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" 
        className="btn btn-success" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
    </>
  )
}
News.defaultProps = {
  country: 'In',
  pageSize: 8,
  category: 'General'
}  
News.propTypes= {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News;