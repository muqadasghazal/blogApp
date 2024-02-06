import React, { useEffect } from "react";
import { useContext , useRef,useState } from "react";
import postContext from "../Context/PostContext";
import PostCard from "./PostCards";


//home related with use personal post cards
const Homee = (props) => {

  const [epost,setPost] = useState({etitle:"" , econtent:""})
  const [toBeUpdatedPostId, setToBeUpdatedPostId] = useState(null); // Initialize with null
  const handleOnChange=(event)=>{
    setPost({...epost , [event.target.name]:event.target.value});
}
  const ref = useRef(null);
  const refClose = useRef(null);
  
  let post = useContext(postContext);
  let {postState,getPosts,updatePosts} = post;
  //this use effect functin means what happens simultaneously when this code will run.
  useEffect(()=>{
    getPosts();
  },[])

  let updatePost=(post)=>{
        ref.current.click();
        setPost({
          etitle:post.title,
          econtent:post.content
        })
        setToBeUpdatedPostId(post.id)
        
  }
  let handleClick = ()=>{
    console.log(toBeUpdatedPostId)
    //khula hai to bnd ho jye, band hai to khul jye
    ref.current.click();
    updatePosts(toBeUpdatedPostId,epost.etitle,epost.econtent)
    props.showAlert("success","Post has been updated")
  }
  return (
    <>
    <div>
  {/* Button trigger modal */}
  <button
    ref={ref}
    type="button"
    className="btn btn-primary d-none"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    Launch demo modal
  </button>
  {/* Modal */}
  <div
    className="modal fade"
    id="exampleModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
           Update Note
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <form action="">
        <div className="mb-3 col-md-6">
          <label htmlFor="etitle" className="form-label">
            <b>Title</b>
          </label>
          <input
            value={epost.etitle}
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            placeholder="Set title here"
            onChange={handleOnChange}>
          </input>

        </div>
        <div className="mb-3">
          <label htmlFor="econtent" className="form-label">
           <b>Content</b>
          </label>
          <textarea
            className="form-control"
            id="econtent"
            name="econtent"
            rows={3}
            value={epost.econtent}
            onChange={handleOnChange}
          />
        </div>
        </form>
          </div>
        <div className="modal-footer">
          <button
            ref={refClose}
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" onClick={handleClick} className="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>

      <h2>Your Posts</h2>
      <div className="container">
        {postState.map((post) => {
          return <PostCard key={post.id} showAlert={props.showAlert} post={post} updatePost={updatePost}/>;
        })}
      </div>
    </div>
    </>
  );
};

export default Homee;
