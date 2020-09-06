import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import MainPage from './MainPageComponent';
import Userchat from './ChatboxComponent';

const Main = () => {


    return (
        <div>
            
            
            <div>
                <TransitionGroup>
                    <CSSTransition classNames="page" timeout={300}>
                    <Switch>
                    <Route path='/home' component={()=>{return(<><Header/><MainPage/><center><Footer/></center></>)} } />
                        <Route exact path='/mychatbox' component={Userchat} />
                        <Redirect to="/home" />
                    </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </div>
            
        </div>


    );
}

export default Main;
    