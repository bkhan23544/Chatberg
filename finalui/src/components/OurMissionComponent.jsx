import React from 'react';
import { Card, CardHeader, CardBody, CardText, Row } from 'reactstrap';
import logo from '../logo.png';
import { FaRobot} from 'react-icons/fa';
import { bounceInLeft, bounceIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
    bounceInLeft: {
      animation: 'x 1s',
      animationName: Radium.keyframes(bounceInLeft, 'bounce')
    },

    bounceIn: {
        animation: 'x 1s',
        animationName: Radium.keyframes(bounceIn, 'bounce')
    }
  }

class OurMissionPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animateIt: false
        }

        this.doAnimation = this.doAnimation.bind(this);
    }
    
    doAnimation() {
        this.setState({
            animateIt: !this.state.animateIt
        })
    
    }
    render() {

        return(
            <div id="ourmission" onMouseEnter={this.doAnimation} onMouseLeave={this.doAnimation}>
                <StyleRoot>
                    <div style={styles.bounceInLeft} >
                        <div className="row ourmission container">
    
                            <div className="col-4 col-sm-4 feedback-card-color text-center">
                                <div className="ourmission-section">
                                   <i className="fa fa-rocket fa-4x"></i>
                                   <h3 style={{marginTop:"10px"}}><b>Have Fun When Bored</b></h3>
                            <h6 style={{marginTop:"10px"}}>Chatberg Keeps you from getting bored.</h6>
                                 
                            </div>
                                
                            </div>
    
                            <div className="col-4 col-sm-4 download-card-color text-center">
    
                               <div className="ourmission-section">
                           <i class="fa fa-user fa-4x"></i>
                           <h3 style={{marginTop:"10px"}}><b>Meet New People</b></h3>
                            <h6 style={{marginTop:"10px"}}>Chatberg lets you meet strangers from all around the world.</h6>
                          
                            </div>
                            </div>
    
                            <div className="col-4 col-sm-4 light-gray text-center">
                              <div className="ourmission-section">
                            <FaRobot size="65"/>
                            <h3 style={{marginTop:"10px"}}><b>Bot Free Expereince</b></h3>
                            <h6 style={{marginTop:"10px"}}>We have worked hard to prevent bots from entering the chats.</h6>
                            </div>
    
                            </div>
                        </div>
    
                    </div>
                </StyleRoot>
                
    
            </div>
        );
    }
}

export default OurMissionPage;