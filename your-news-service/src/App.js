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
        <Link to={{ pathname: "https://www.hs.fi/" }} target="_blank" />
      )
    }
    return (
      <div className="Article">
    <h1>{title}</h1>
    <h3>{text}</h3>
    <span >source: </span><a href="https://www.hs.fi/" rel="noreferrer">{source}</a>
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
        <Article className="Article" title='title' text='asfsdf dfsdf sdf. fsdfsdf sd.fdsfs .fsdfs' source='HS' sourceLink="https://www.hs.fi/"/>
        <Article className="Article" title='title' text='asfsdf dfsdf sdf. gdfgdfggdf gdf gfgdfgdfgd ' source='HS' sourceLink="https://www.hs.fi/"/>
        <Article className="Article" title='title' text='asfsdf dfsdf sdf. fsdfsdf sd.fdsfs .fsdfs' source='HS' sourceLink="https://www.hs.fi/"/>
        <Article className="Article" title='title' text='asfsdf dfsdf sdf. fsdfsdf sd.fdsfs .fsdfs' source='HS' sourceLink="https://www.hs.fi/"/>
        <Article className="Article" title='title' text='asfsdf dfsdf sdf. fsdfsdf sd.fdsfs .fsdfs' source='HS' sourceLink="https://www.hs.fi/"/>
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
