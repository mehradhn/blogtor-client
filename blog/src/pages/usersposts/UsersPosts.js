import React, {useEffect, useState} from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import TopBar from '../../components/topbar/TopBar'
import CardUserPost from './CardUserPost';
import './userposts.css'
function UsersPosts() {
  const params = useParams()
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:4000/blog/by-user", {
      method: 'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        _id: params.id // this is the id of the user u want to get blogs of
      },) 
    }).then(response => response.json())
    .then(data =>{ 
      console.log(data)
      if(data.length >= 1) {
        console.log(data)
        setPosts(data)}
      setLoading(false)
    })
  }, []);

  // console.log(posts);

    const singlePageHandler = (_id) => {
    navigate(`/post/${_id}`)
  }
  if(loading) return <h2>Loading</h2>
  return (
    <>
    <TopBar/>
    <div className='container-users-posts'>
      {posts && posts.map((post, idx) => {
        return(
          <CardUserPost post={post} singlePageHandler={singlePageHandler}/>
        )
      })}
      {!posts && <h1 className='no-posts'>At now This user doesn't have any posts</h1>}
    </div>


    </>
  )
}

export default UsersPosts