import React from 'react'
import "./Overlay.css"
import './Bookmarks.css'
const Bookmarks = ({show,bookmarks,onClose,onSelectArticle,onDeleteBookmark}) => {
    if(!show){
        return null
    }
     
  return (
    <div className="modal-overlay">
        <div className="modal-content">
            <span className="close-btn" onClick={onClose}>
                <i className="fa-solid fa-xmark"></i>
            </span>
            <h2 className="bookmark-heading">Bookmarked News</h2>
            <div className="bookmark-list">
                {bookmarks.map((article,index)=> (
                    <div className="bookmark-item" key={index} onClick={()=>onSelectArticle(article)}>
                    <img src={article.image} alt={article.title}/>
                    <h3>{article.title}</h3>
                    <span className="delete-btn" onClick={(e)=>{ e.stopPropagation()
                        onDeleteBookmark(article)}
                        }>
                        <i className="fa-regular fa-circle-xmark"></i>
                    </span>
                </div>
                ))}
                
                
            </div>
        </div>
    </div>
  )
}

export default Bookmarks
