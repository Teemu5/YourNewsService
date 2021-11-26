import './App.css';
import {
    Switch, Route,
} from 'react-router-dom'
import Dashboard from "./pages/dashboard/Dashboard";
import Stats from "./pages/Statistics";
import React from 'react'

const App = () => {
    return (
        <div>
            <Switch>
                <Route path="/dashboard">
                    <Dashboard/>
                </Route>
                <Route path="/statistics">
                    <Stats/>
                </Route>
                <Route path="/">
                    <Dashboard/>
                </Route>
            </Switch>
        </div>
    )
}

export default App;
