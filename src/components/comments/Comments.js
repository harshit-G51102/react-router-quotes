import { useCallback, useEffect, useState } from 'react';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

const Comments = () => { 
  const [isAddingComment, setIsAddingComment] = useState(false);
  const param=useParams();
  const {quoteId}=param;
  const {sendRequest,status,data:loadedComments}=useHttp(getAllComments);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  useEffect(()=>{
   sendRequest(quoteId); 
  },[sendRequest,quoteId])
  const addedCommentHandler=useCallback(()=>{
    sendRequest(quoteId);
  },[sendRequest,quoteId])
  let comments;
  if(status==='pending'){
    comments=<div className='centered'><LoadingSpinner></LoadingSpinner></div>
  }
  if(status==='completed' && (loadedComments&& loadedComments.length>0)){
    comments=<CommentsList comments={loadedComments}></CommentsList>
  }
  if(status==='completed' && (!loadedComments && loadedComments.length===0)){
    return <p className='centered'> no comments</p>
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && ( 
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={param.quoteId} onAddedComment={addedCommentHandler}/>}
      {comments}
    </section>
  );
};

export default Comments;
