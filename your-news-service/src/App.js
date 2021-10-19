import logo from './logo.svg';
import './App.css';
import {
  Switch, Route,
} from 'react-router-dom'

const App = () => {
  const Header = () => {
    return (
    <h1 className="Header"><span>Your News Service</span></h1>
    
  )
  }
  const Article = ({text, title, source}) => {
    return (
      <div className="Article">
    <h1>{title}</h1>
    <h3>{text}</h3>
    <span >source: </span><a href="https://www.hs.fi/" rel="noreferrer">{source}</a>
    </div>
  )
  }
  const Dashboard = () => {
    return (
      <div className="App">
        <Header/>
        <Article className="Article" title='title' text='asfsdf dfsdf sdf. fsdfsdf sd.fdsfs .fsdfs' source='HS'/>
      </div>
    );
    }

  const Statistics = () => {
    return (
      <div className="App">
        <Header/>
        <div>Sports: 43</div>
        <div>Finance: 25</div>
        <div>Movies: 10</div>
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
