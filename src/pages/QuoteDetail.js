import { Fragment, useEffect } from "react";
import { Link, Route, Switch, useParams ,useRouteMatch} from "react-router-dom/cjs/react-router-dom.min";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
const QuoteDetail=()=>{

    const match=useRouteMatch()
    const param=useParams();
    const {quoteId}=param;
    const {sendRequest,status,data:loadedQuote,error}=useHttp(getSingleQuote,true);
    useEffect(()=>{
        sendRequest(quoteId);
    },[sendRequest,quoteId])
    if(status==='pending'){
        return<div className="centered"><LoadingSpinner></LoadingSpinner></div>
    }
    if(!loadedQuote){
        return <NoQuotesFound></NoQuotesFound>
    }
    if(error){
        return <div>error</div>
    }
    return(
        <Fragment>
            <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text}></HighlightedQuote>
            <Route path={match.path}>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}/comments`}>comments</Link>
                </div>
            </Route>
            <Switch>
            <Route path={`${match.path}/comments`}>
                <Comments ></Comments> 
            </Route>
            </Switch>
        </Fragment>
    ) 
}
export default QuoteDetail;