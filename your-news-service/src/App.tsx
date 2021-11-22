import './App.css';
import {
    Switch, Route,
} from 'react-router-dom'
import Dashboard from "./pages/dashboard/Dashboard";
import Header from "./pages/common/Header";
import React from 'react'

const App = () => {
    
    const Statistics = () => {
        return (
            <>
                <Header/>
                <div className="App">
                    <h2>Statistics</h2>
                    <h5>Categories by popularity</h5>
                    <div>Cooking: 43</div>
                    <div>Finance: 25</div>
                    <div>Movies: 10</div>
                    <div>Baseball: 3</div>
                </div>
            </>
        );
    }
    return (
        <div>
            <Switch>
                <Route path="/dashboard">
                    <Dashboard/>
                </Route>
                <Route path="/statistics">
                    <Statistics/>
                </Route>
                <Route path="/">
                    <Dashboard/>
                </Route>
            </Switch>
        </div>
    )
}

export default App;
