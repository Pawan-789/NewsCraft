import React, { useEffect, useState } from 'react'
import Weather from "./Weather"
import Calendar from "./Calendar" 
import "./new.css"
import axios from 'axios'




const News = () => {
  const [headline,setHeadline]=useState(null);
  const [news,setNews]=useState([]);

  useEffect(()=>{
    const fetchNews=async() => {
      const url="https://gnews.io/api/v4/top-headlines?category=general&lang=en&apikey=9e9504f434d8714995bd02b8d3d0c25d"
      
      const response=await axios.get(url) 

      const fetchedNews= response.data.articles
  
      console.log(fetchedNews[0])
    }
    fetchNews()
  },[])
  
  
  return (
    <div className="news">
        <header className="news-header">
          <h1 className="logo">News & Blogs</h1>
          <div className="search-bar">
          <form >
            <input type="text" placeholder="Search news..." />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>

            </button>
          </form>
          </div>
        </header>
        <div className="news-content">
            <div className="navbar">
                <div className="user">
                  <img src="./images/3.jpg" alt="user image" />
                  <p>Ruan's Blog</p>
                </div>
                <nav className="categories">
                  <h1 className="nav-heading">Categories</h1>
                  <div className="nav-links">
                    <a href="#" className='nav-link'>General</a>
                    <a href="#" className='nav-link'>World</a>
                    <a href="#" className='nav-link'>Business</a>
                    <a href="#" className='nav-link'>Technology</a>
                    <a href="#" className='nav-link'>Health</a>
                    <a href="#" className='nav-link'>Sports</a>
                    <a href="#" className='nav-link'>Science</a>
                    <a href="#" className='nav-link'>Entertainment</a>
                    <a href="#" className='nav-link'>Nation</a>
                    <a href="#" className='nav-link'>Bookmarks <i className="fa-regular fa-bookmark"></i>  </a>
                  </div>
                </nav>
            </div>
            <div className="news-section">
                <div className="headline">
                  <img src="./images/news.jpeg" alt="Headline-img" />
                  <h2 className="headline-title">Its a clash of two Nations:Ukrain & Russia 
                  <i className="fa-regular fa-bookmark bookmark"></i>
                  </h2>
                </div>
                <div className="news-grid">
                  <div className="news-grid-item">
                    <img src="./images/tech.jpeg" alt="News Img" />
                    <h3>
                      Anything but this is fake!. 
                      <i className="fa-regular fa-bookmark bookmark"></i>
                    </h3>
                  </div>
                  <div className="news-grid-item">
                    <img src="./images/sports.jpeg" alt="News Img" />
                    <h3>
                      Anything but this is fake!. 
                      <i className="fa-regular fa-bookmark bookmark"></i>
                    </h3>
                  </div>
                  <div className="news-grid-item">
                    <img src="./images/sports.jpeg" alt="News Img" />
                    <h3>
                      Anything but this is fake!. 
                      <i className="fa-regular fa-bookmark bookmark"></i>
                    </h3>
                  </div>
                  <div className="news-grid-item">
                    <img src="./images/entertainment.jpeg" alt="News Img" />
                    <h3>
                      Anything but this is fake!. 
                      <i className="fa-regular fa-bookmark bookmark"></i>
                    </h3>
                  </div>
                  <div className="news-grid-item">
                    <img src="./images/world.jpeg" alt="News Img" />
                    <h3>
                      Anything but this is fake!. 
                      <i className="fa-regular fa-bookmark bookmark"></i>
                    </h3>
                  </div>
                  <div className="news-grid-item">
                    <img src="./images/health.jpeg" alt="News Img" />
                    <h3>
                      Anything but this is fake!. 
                      <i className="fa-regular fa-bookmark bookmark"></i>
                    </h3>
                  </div>
                </div>
            </div>
            <div className="my-blogs">My Blogs
            </div>
            <div className="weather-calendar">
            <Weather/>
            <Calendar/>
            
             </div>
          

        </div>
        <footer className="news-footer">Footer</footer>
    </div>
  )
}

export default News
