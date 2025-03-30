import React from 'react'
import "./NewsOverlay.css"

const NewsOverlay = ({show,article,onClose}) => {
    if(!show){
        return null;
    }
  return (
    <div className='modal-overlay'>
        <div className="modal-content">
            <span className="close-btn" onClick={onClose}>
                <i className="fa-solid fa-xmark"></i>
            </span>
            {article && (
                <>
                    <img src={article.image} className='modal-image' alt={article.title} />
                    <h2 className="modal-title">{article.title}</h2>
                    <p className="modal-source">Source: {article.source.name}</p>
                    <p className="modal-date">{new Date(article.publishedAt).toLocaleString('en-GB',{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}</p>
                    <p className="modal-content-text">Global tech giants announce collaboration to develop sustainable AI solutions, aiming to reduce carbon footprint, ensure ethical AI use, and promote transparency in data handling worldwide.</p>
                   
                    {/* here the rel="noopener noreferrer "is a security feature which prevents the new page from accesing the window and new page runs separertly */}
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more-link">Read More</a>
                </>
            )}
            
        </div>
      
    </div>
  )
}

export default NewsOverlay
