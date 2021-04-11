import React from 'react';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import Header from './common/Header';
import CoursesPage from './CoursesPage';
import { Route, Switch, Redirect } from "react-router-dom";
import NotFoundPage from './NotFoundPage.js';
import ManageCoursePage from './ManageCoursePage.js';


function App() {
    // function getPage() {
    //     const route = window.location.pathname;
    //     if (route === '/courses') return <CoursesPage />;
    //     if (route === '/about') return <AboutPage />;
    //     return <HomePage />;
    // };

    // displays the header component and returns the getPage function result
    return (
        <div className="containerFluid">
            <Header />
            <Switch>
                <Route path='/' exact component={HomePage} />
                <Route path='/courses' component={CoursesPage} />
                <Route path='/about' component={AboutPage} />
                <Route path='/course/:slug' component={ManageCoursePage} />
                <Redirect from='/about-page' to='about' />
                <Route component={NotFoundPage} />
            </Switch>
            { /*getPage()*/ }
        </div>
    );
}

export default App;