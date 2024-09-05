import React, { Suspense } from "react";

import { Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
const NotFound=React.lazy(()=>import("./pages/NotFound"));
const QuoteDetail=React.lazy(()=>import("./pages/QuoteDetail"));
const AllQuotes=React.lazy(()=>import("./pages/AllQuotes"));
const NewQuote = React.lazy(() => import("./pages/NewQuote"));
function App() {
  return (
    <Layout>
      <Suspense fallback={
        <div className="centered">
          <LoadingSpinner></LoadingSpinner>
        </div>
      }>
        <Switch>
          <Route path='/new-quote'>
            <NewQuote></NewQuote>
          </Route>
          <Route path='/' exact>
            <Redirect to='/quotes'></Redirect>
          </Route>
          <Route path='/quotes' exact>
            <AllQuotes></AllQuotes>
          </Route>
          <Route path='/quotes/:quoteId'>
            <QuoteDetail></QuoteDetail>
          </Route>
          <Route path='*'>
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
