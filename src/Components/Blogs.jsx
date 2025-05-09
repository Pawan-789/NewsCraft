import React, { useEffect, useState } from 'react'
import './Blogs.css'

const Blogs = ({onBack,onCreateBlog,editPost,isEditing}) => {
    const [showForm,setShowForm] = useState(false)
    const [image,setImage] =useState(null)
    const [title,setTitle] =useState('')
    const [content,setContent] = useState('')
    const [submitted,setSubmitted] =useState(false)
    const [titleValid,setTitleValid] = useState(true)
    const [contentValid,setContentValid] = useState(true)
    const [userImage, setUserImage] = useState('./images/ghibli.jpg');

     // Adding this useEffect to load user data when component mounts
     useEffect(() => {
        const savedUserData = JSON.parse(localStorage.getItem('userData'));
        if (savedUserData && savedUserData.image) {
            setUserImage(savedUserData.image);
        }
    }, []);
    useEffect(()=>{
        if(isEditing && editPost){
            setImage(editPost.image)
            setTitle(editPost.title)
            setContent(editPost.content)
            setShowForm(true)
        }else{
            setImage(null)
            setTitle('')
            setContent('')
            setShowForm(false)
        }
    },[isEditing,editPost])

    const handleImageChange   = (e) =>{
        if(e.target.files && e.target.files[0]) {
            const file=e.target.files[0]

            const maxSize= 1* 1024* 1024
 
            if(file.size>maxSize){
                alert('File size exceeds 1MB')
                return
            }
            const reader = new FileReader()
            reader.onloadend = () =>{
                setImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }
    const handleTitleChange =(e) =>{
        setTitle(e.target.value)
        setTitleValid(true)
        
    }
    const handleContentChange =(e) => {
        setContent(e.target.value)
        setContentValid(true)
    }
    const handleSubmit = (e)=>{
        e.preventDefault() 

        if(!title || !content){
            if(!title)setTitleValid(false)
            if(!content)setContentValid(false)
            return
        }
        const newBlog ={
            image,
            title,
            content, 
        }
        onCreateBlog(newBlog,isEditing)
        setImage(null)
        setTitle('')
        setContent('')
        setShowForm(false)
        setSubmitted(true)
        setTimeout(()=>{
        setSubmitted(false)
        onBack()
        },3000)
    }
  return (
    <div className="blogs">
        <div className="blogs-left">
            <img src={userImage} alt="User Img" />
        </div>
        <div className="blogs-right">
            {!showForm && !submitted && (<button className="post-btn" onClick={()=>setShowForm(true)}>Create New Post</button>)}
            {submitted && <div className='submission-msg'>Post Submitted</div>}
            <div className={`blogs-right-form ${showForm ? 'visible' : 'hidden'}` }> 
                <h1>{isEditing ? 'Edit Post' : 'New Post'}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="img-upload">
                        <label htmlFor="file-upload" className='file-upload'>
                            <i className="bx bx-upload"></i>Upload Image
                        </label>
                        <input type="file" id="file-upload" onChange={handleImageChange} />
                    </div>
                    <input type="text" placeholder='Add Title (Max 60 characters)' className={`title-input ${!titleValid ? 'invalid' : ''}`} maxLength={60}
                     value={title}onChange={handleTitleChange}/>
                    <textarea className={`text-input ${!contentValid ? 'invalid' : ''}`} placeholder='Add Text' value={content} onChange={handleContentChange}></textarea>
                    <button className='submit-btn' type='submit'>{isEditing ? "Update Post" : "Submit Post"} </button>
                </form>
            </div>
            
       
            <button className="blogs-close-btn" onClick={onBack}>Back 
                <i className="bx bx-chevron-right"></i>
            </button>
        </div>
    </div>
  )
}

export default Blogs
