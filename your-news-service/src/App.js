import logo from './logo.svg';
import './App.css';
import {
  Switch, Route, Link,
} from 'react-router-dom'

import React, { Text } from 'react';
const App = () => {
  const Header = () => {
    return (
    <h1 className="Header"><span className="Header-text-title"><Link to="/dashboard"> Your News Service </Link></span>
    <span className="Header-text-statistics"><Link to="/statistics"> Statistics </Link></span><span className="Header-text-categories"> Categories </span>
    <span className="Header-text-logout"> Logout </span>
    <span></span></h1>
    
  )
  }
  const Category = ({category}) => {
    return (
    <h5 className="Category"> {category} </h5>
  )
  }
  const SelectedCategories = () => {
    return (
    <div><span >
      <span><Category category="Finance"/></span>
      <span><Category category="Baseball"/></span>
      <span><Category category="Cooking"/></span> 
      </span><button>Modify selected categories</button></div>
  )
  }

  const Article = ({text, title, source, sourceLink}) => {

    const handleRedirect = ({sourceLink}) => {
      // NOT WORKING!
      return (
        <Link to={{ pathname: sourceLink }} target="_blank" />
      )
    }
    return (
      <div className="Article">
    <h1>{title}</h1>
    <h3>{text}</h3>
    <span >source: </span><a href={sourceLink} rel="noreferrer">{source}</a>
    <button onClick={handleRedirect}>Open in {source}</button>
    <button onClick={handleRedirect}>Share</button>
    </div>
  )
  }
  const Dashboard = () => {
    return (
      <div className="App">
        <Header/>
        <h2>Dashboard</h2>
        <SelectedCategories/>
        <Article className="Article" title="Stock market on comeback trail heads into what's supposed to be another stellar earnings season" 
          text='Stock proved hard to keep down this week, and the start of the earnings season could further bolster the comeback if profits roll in as expected or better.' 
          source='cnbc' sourceLink="https://www.cnbc.com/2021/10/08/stock-market-on-comeback-trail-heads-into-whats-supposed-to-be-another-stellar-earnings-season-.html"/>
        <Article className="Article" title="Stock market on comeback trail heads into what's supposed to be another stellar earnings season" 
          text='Stock proved hard to keep down this week, and the start of the earnings season could further bolster the comeback if profits roll in as expected or better.' 
          source='cnbc' sourceLink="https://www.cnbc.com/2021/10/08/stock-market-on-comeback-trail-heads-into-whats-supposed-to-be-another-stellar-earnings-season-.html"/>
        <Article className="Article" title="Stock market on comeback trail heads into what's supposed to be another stellar earnings season" 
          text='Stock proved hard to keep down this week, and the start of the earnings season could further bolster the comeback if profits roll in as expected or better.' 
          source='cnbc' sourceLink="https://www.cnbc.com/2021/10/08/stock-market-on-comeback-trail-heads-into-whats-supposed-to-be-another-stellar-earnings-season-.html"/>
        <Article className="Article" title="Stock market on comeback trail heads into what's supposed to be another stellar earnings season" 
          text='Stock proved hard to keep down this week, and the start of the earnings season could further bolster the comeback if profits roll in as expected or better.' 
          source='cnbc' sourceLink="https://www.cnbc.com/2021/10/08/stock-market-on-comeback-trail-heads-into-whats-supposed-to-be-another-stellar-earnings-season-.html"/>
        <Article className="Article" title="Stock market on comeback trail heads into what's supposed to be another stellar earnings season" 
          text='Stock proved hard to keep down this week, and the start of the earnings season could further bolster the comeback if profits roll in as expected or better.' 
          source='cnbc' sourceLink="https://www.cnbc.com/2021/10/08/stock-market-on-comeback-trail-heads-into-whats-supposed-to-be-another-stellar-earnings-season-.html"/>
      </div>
    );
    }

  const Statistics = () => {
    return (
      <div className="App">
        <Header/>
        <h2>Statistics</h2>
        <h5>Categories by popularity</h5>
        <div>Cooking: 43</div>
        <div>Finance: 25</div>
        <div>Movies: 10</div>
        <div>Baseball: 3</div>
      </div>
    );
    }
  return(
    <div>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/statistics">
          <Statistics />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
