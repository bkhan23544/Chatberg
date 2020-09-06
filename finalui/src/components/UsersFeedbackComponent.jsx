import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Card, CardHeader, CardBody, Media } from 'reactstrap';
import "../App.css";
import FEEDBACKS from '../feedbacks/feedbacks';
import ReactStars from "react-rating-stars-component";
import Avatar from 'react-avatar';
import img from '../images/feedbacks/bilal.jpg'
import '../App.css';
import { bounceInLeft } from 'react-animations';
import Radium, {StyleRoot} from 'radium';


const styles = {
  bounceInLeft: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounceInLeft, 'bounce')
  },
}



const RenderCard = ({props}) => {
console.log(props.image,"image")
// console.log(img,"image")
  return(
    // <Media className="row-header">
    //   <Media left href="">
    //     <Avatar src={props.image} round={true} size={200} style={{ margin: '10px' }}/>
    //   </Media>
    //   <Media body className="text-left">
    //     <Media heading >
    //         {props.name}
    //     </Media>
    //     <Media aria-describedby>
    //       {props.description}
    //     </Media>
    //   </Media>
    // </Media>
    <center>
    <img src={props.image} width="200" height="200" style={{borderRadius:"50%"}}/>
    <h4 className="developer"><b>{props.name}</b></h4>
    <h6 className="developer">{props.description}</h6>
    </center>

  );

}



const UsersFeedback = (props) => {


    const settings = {
        adaptiveHeight: false,   
        dots: true,
        infinite: true,
        speed: 5000,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
        initialSlide: 1,
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };


    return (
      <div style={{ margin: '20px'}} id="usersfeedback">   
        <StyleRoot style={styles.bounceInLeft}>
          <Card className="feedback-card-color text-center">
            <CardHeader className="card-header feedback-card-color" >
                Developed By
            </CardHeader>
              
            <CardBody className="card-body">
                <Slider {...settings} arrows={false} style={{ margin: '20px'}}>
                    
                  {FEEDBACKS.map((user) => {
          
                    return (
                        <div className="container">
                            <RenderCard props={user} />
                        </div>
                    );
          
                    })
                  }
            
                </Slider>
            </CardBody>    
        </Card>
        </StyleRoot>
      </div>
    );
  
}

export default UsersFeedback;



