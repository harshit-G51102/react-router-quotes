import { Fragment, useRef, useState } from 'react';

import { Prompt } from 'react-router-dom/cjs/react-router-dom.min';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {
  const authorInputRef = useRef(); 
  const textInputRef = useRef();

  const [isEntering,setIsEntering]=useState(false);
  function submitFormHandler(event) { 
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }
  const formFocusHandler=()=>{
    setIsEntering(true);
  }
  const finishEntering=()=>{
    setIsEntering(false);
  }
  return (
    <Fragment>
      <Prompt when={isEntering} message={(location)=>'are you sure you want to leave ,all your data will be lost'}></Prompt>
      <Card>
      <form onFocus={formFocusHandler} className={classes.form} onSubmit={submitFormHandler}>
        {props.isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner></LoadingSpinner>
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor='author'>Author</label>
          <input type='text' id='author' ref={authorInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='text'>Text</label>
          <textarea id='text' rows='5' ref={textInputRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button className='btn' onClick={finishEntering}>Add Quote</button>
        </div>
      </form>
    </Card>
    </Fragment>
  );
};

export default QuoteForm;

