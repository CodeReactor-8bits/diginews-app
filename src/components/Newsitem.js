import React from 'react'

const Newsitem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date } = props;
  return (
    <div className="container">
      <div className="card-group">
        <div className="card shadow-lg p-3 mb-5 bg-body rounded h-100">
          <img src={!imageUrl ? "https://images.livemint.com/img/2022/08/04/600x338/OnePlus_10T_1659598689238_1659598689454_1659598689454.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-outline-success">Read More</a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Newsitem