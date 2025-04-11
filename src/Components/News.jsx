import React, { useEffect, useState } from 'react'
import Weather from "./Weather"
import Calendar from "./Calendar" 
import "./News.css"
import axios from 'axios'
import NewsOverlay from './NewsOverlay'
import Bookmarks from './Bookmarks'
import BlogsOverlay from './BlogsOverlay'
import "./Overlay.css"
import './BlogsOverlay.css'



const categories =["general","world","business","technology","health","sports","science","entertainment","nation"]


const News = ({onShowBlogs,blogs,onEditBlog,onDeleteBlog}) => {
  const [headline,setHeadline]=useState(null);
  const [news,setNews]=useState([]);
  const [selectedCategory,setSelectedCategory]=useState("general")
  const [searchInput,setSearchInput] = useState("")
  const [searchQuery,setSearchQuery] = useState("")
  const [showOverlay,setShowOverlay] = useState(false)
  const [selectedArticle,setSelectedArticle] = useState("")
  const [bookmarks,setBookmarks] = useState([])
  const [showBookmarkOverlay,setShowBookmarkOverlay] = useState(false)
  const [selectedPost,setSelectedPost] =useState(null)
  const [showBlogOverlay,setShowBlogOverlay] =useState(false)
  useEffect(()=>{
    const fetchNews= async () => {
      const apiKey =import.meta.env.VITE_API_KEY
      let url =`https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=${apiKey}`
      
      if(searchQuery){
        url =`https://gnews.io/api/v4/search?q={searchQuery&lang=en&apikey=${apiKey}`
      }

      const response=await axios.get(url) 

      const fetchedNews= response.data.articles
      

      setHeadline(fetchedNews[0])
      setNews(fetchedNews.slice(1, 7))

      const savedBookmarks =JSON.parse(localStorage.getItem('bookmarks' )) || []

      setBookmarks(savedBookmarks)
  
      console.log(news)
    }
    fetchNews()
  },[selectedCategory,searchQuery])

  const handleCategoryClick = (e,category) =>{
    e.preventDefault();
    setSelectedCategory(category)

  }

  const handleSearch = (e)=>{
    e.preventDefault();
    setSearchQuery(searchInput)
    setSearchInput('')
  }
  
  const handleArticleClick=(article)=>{
    setSelectedArticle(article)
    setShowOverlay(true)

    console.log(article);
  }

  const handleBookmarksClick=(article)=>{
    setBookmarks((prevBookmarks)=>{
      const updatedBookmarks = prevBookmarks.find((bookmark)=>
      bookmark.title === article.title)
        ? prevBookmarks.filter((bookmark)=>bookmark.title !==article.title)
        : [...prevBookmarks,article]
      
      localStorage.setItem('bookmarks',JSON.stringify(updatedBookmarks))
      return updatedBookmarks
    })
  }

  const handleBlogClick =(blog)=>{
    setSelectedPost(blog)
    setShowBlogOverlay(true)
  }
  const closeBlogOverlay =()=>{
    setShowBlogOverlay(false)
    setSelectedPost(null)
  }

  return (
    <div className="news">
        <header className="news-header">
          <h1 className="logo">NewsCraft</h1>
          <div className="search-bar">
          <form onSubmit={handleSearch }>
            <input type="text" placeholder="Search news..." value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>

            </button>
          </form>
          </div>
        </header>
        <div className="news-content">
            <div className="navbar">
                <div className="user" onClick={onShowBlogs}>
                  <img src="./images/3.jpg" alt="user image" />
                  <p>Ruan's Blog</p>
                </div>
                <nav className="categories">
                  <h1 className="nav-heading">Categories</h1>
                  <div className="nav-links">
                    {categories.map((category)=>( <a href="#" key={category} className='nav-link' onClick={(e)=> handleCategoryClick(e,category)}>{category}</a>))}

                    <a href="#" className='nav-link' onClick={()=>setShowBookmarkOverlay(true)}>Bookmarks <i className="fa-solid fa-bookmark"></i>  </a>
                  </div>
                </nav>
            </div>
            <div className="news-section">
              {headline && (
                <div className="headline" onClick={()=>handleArticleClick(headline)}>
                  <img src={headline.image} alt={headline.title} />
                  <h2 className="headline-title">
                    {headline.title}
                  <i 
                    className={`${
                      bookmarks.some((bookmark)=>
                      bookmark.title === headline.title)
                        ? 'fa-solid'
                        : 'fa-regular'    
                      } fa-bookmark bookmark`} onClick={(e)=>
                        {
                          e.stopPropagation()
                          handleBookmarksClick(headline)
                        }
                      
                      } ></i>
                  </h2>
                </div>
              )}
                <div className="news-grid">
                  {news.map((article, index)=>(
                    <div key={index} className="news-grid-item" onClick={()=>handleArticleClick(article)}>
                      <img src={article.image} alt={article.title} />
                      <h3>
                        {article.title}
                        <i 
                    className={`${
                      bookmarks.some((bookmark)=>
                      bookmark.title === article.title)
                        ? 'fa-solid'
                        : 'fa-regular'    
                      } fa-bookmark bookmark`} onClick={(e)=>
                        {
                          e.stopPropagation()
                          handleBookmarksClick(article)
                        }
                      
                      } ></i>
                      </h3>
                    </div>
                  ))}
                  
                </div>
            </div>
            <NewsOverlay show={showOverlay} article={selectedArticle} onClose={()=> setShowOverlay(false)}/>
            <Bookmarks show={showBookmarkOverlay} bookmarks={bookmarks} onClose={()=>setShowBookmarkOverlay(false)}
            onSelectArticle={handleArticleClick} onDeleteBookmark={handleBookmarksClick}/>
            <div className="my-blogs">
              <h1 className="my-blogs-heading">My-Blogs</h1>
              <div className="blog-posts">
                {blogs.map((blog,index)=>(
                  <div key={index} className="blog-post" onClick={()=> handleBlogClick(blog)}>
                     <img src={blog.image} alt={blog.title} />
                     <h3>{blog.title}</h3>
                     <p>{blog.content}</p>
                     <div className="post-buttons">
                      <button className="edit-btn" onClick={()=>onEditBlog(blog)}>
                        <i className="bx bxs-edit"></i>
                      </button>
                      <button className="delete-post" onClick={(e)=>{
                        e.stopPropagation()
                        onDeleteBlog(blog)}
                        } >
                        <i className="bx bxs-x-circle"></i>
                      </button>
                    </div>
                  </div>
                ))}
                
              </div>
              {selectedPost && showBlogOverlay && (
                <BlogsOverlay show={showBlogOverlay} blog={selectedPost} onClose={closeBlogOverlay}/>
              )}
              
            </div>
            <div className="weather-calendar">
            <Weather/>
            <Calendar/>
            
             </div> 
          

        </div>
        <footer className="news-footer">
          <p>
            <span>NewsCraft:News & Blogs</span>
          </p>
          <p>
            &copy;All Rights Reserved. By Pawan
          </p>
        </footer>
    </div>
  )
}

export default News
