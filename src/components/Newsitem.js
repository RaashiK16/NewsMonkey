import React from 'react'

const Newsitem = (props)=> {

    
        let { title, description, imageUrl, newsUrl, author, date, source } = props;
        return (
            <div >
                <div className="card my-3">
                    <div style={{display:'flex', justifyContent:'flex-end', position:'absolute', right:'5px', top:'5px'}}>

                        <span class="badge rounded-pill bg-danger" >{source}<span class="visually-hidden">unread messages</span></span>
                    </div>
                    <img src={imageUrl ? imageUrl : "https://www.vskills.in/certification/blog/wp-content/uploads/2015/01/structure-of-a-news-report.jpg"} className="card-img-top" alt="" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unknown Author"} on {new Date(date).toGMTString()}</small></p>
                    </div>
                </div>
                <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-dark btn-sm">Read Complete Article</a>

            </div>


        )
    
}

export default Newsitem
