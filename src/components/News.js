import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'





const News = (props)=> {
    
    const [articles, setArticles] = useState([]);
    const [loading, setloading] = useState(true);
    const [page, setpage] = useState(1);
    const [noMorePages, setnoMorePages] = useState(false);
    const [totalResults, settotalResults] = useState(0);
    

    const capitalise = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

   

    const  updateNews = async()=> {
        props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=7d4ffa2ed44144249ebff0765f406504&country=${props.country}&pageSize=${props.pageSize}&page=${page}`;
        setloading(true);
        let data = await fetch(url);
         props.setProgress(30);
        let parsedData = await data.json();
         props.setProgress(70);

         setArticles(parsedData.articles);
         settotalResults(parsedData.totalResults);
         setloading(false);

         props.setProgress(100);
        if (page === Math.ceil(totalResults /  props.pageSize)) {
            setnoMorePages(true);
        }

    }

    useEffect(() => {
        document.title = `NewsMonkey - ${capitalise( props.category)}`;
      updateNews();
    
      
    }, [])
    
    
    // componentDidMount() runs after the render() method has been run, that is after the component output has been rendered to the DOM

    // const handlePrevClick = async () => {

    //     this.setState({ page: this.state.page - 1 });
    //     this.updateNews();
    // };

    // const handleNextClick = async () => {
    //     this.setState({ page: this.state.page + 1 });
    //     this.updateNews();
    // };

    const fetchMoreData = async () => {
        setpage(page+1);
        const url = `https://newsapi.org/v2/top-headlines?category=${ props.category}&apiKey=7d4ffa2ed44144249ebff0765f406504&country=${ props.country}&pageSize=${ props.pageSize}&page=${page+1}`;
        setloading(true);
        let data = await fetch(url);
        let parsedData = await data.json();

        setArticles(parsedData.articles && parsedData.articles.concat(parsedData.articles));
        settotalResults(parsedData.totalResults);
        setloading(false);

        
        if (page === Math.ceil(totalResults /  props.pageSize)) {
            setnoMorePages(true);
        }
    }


    // render() method is pure, that is, we cannot change the state variables in this function
    
        return (
            <>
                <h1 className='text-center' style={{marginTop: '90px'}}>NewsMonkey - Top {capitalise( props.category)} Headlines</h1>

                <div className="container">
                    <div className="row">
                        {articles && articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title ? element.title : ""} description={element.content ? element.content : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })};


                    </div>
                </div>
                <InfiniteScroll
                    dataLength={articles && articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />} />

                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} rel="noreferrer" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.noMorePages} rel="noreferrer" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}

            </>
        )
    
}

News.defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
