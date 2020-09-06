import React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import "../App.css";
import { bounceInLeft } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
    bounceInLeft: {
      animation: 'x 1s',
      animationName: Radium.keyframes(bounceInLeft, 'bounce')
    },
}

const FeaturesPage = () => {

    return(
        <div style={{ margin: '20px'}} id="features">

            <StyleRoot style={styles.bounceInLeft}>
                <Card className="features-card-color">
                    <CardHeader className="card-header features-card-color text-center">
                        Features
                    </CardHeader>
                    <CardBody className="card-body container">
                        <div className="containers ml-auto mr-auto">
                        <div className="features-styles">
                            <h5> <i className="fa fa-tags fa-lg icon-color fa-cog" style={{ marginRight: '5px'}}></i>Interest Matching System</h5>
                        </div>
                        <div className="features-styles">
                            <h5> <i className="fa fa-comments fa-lg fa-cog" style={{ marginRight: '5px'}}></i>1 on 1 Text Chat mode</h5>
                        </div>
                        <div className="features-styles">
                            <h5> <i className="fa fa-paper-plane fa-lg fa-cog" style={{ marginRight: '1px'}}></i> Great for making new friends</h5>
                        </div>
                      
                        <div className="features-styles">
                            <h5> <i className="fa fa-mobile fa-2x fa-lg fa-cog" style={{ marginRight: '12px'}}></i> Works great on mobile</h5>
                        </div>
                          <div className="features-styles">
                            <h5> <i className="fa fa-bolt fa-2x fa-cog" style={{ marginRight: '14px'}}></i>Lightweight and Lightning fast</h5>
                        </div>
                        </div>
                    
                    </CardBody>
                
                </Card>
            </StyleRoot>

        </div>
    );
}

export default FeaturesPage;