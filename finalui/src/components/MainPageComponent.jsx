import React, { useState,useEffect } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';
import UsersFeedbackPage from './UsersFeedbackComponent';
import DownloadsPage from './DownloadsComponent';
import FeaturesPage from './FeaturesComponents';
import mission from '../images/mission.jpg';
import features from '../images/features.jpg';
import feedback from '../images/feedback.jpg';
import '../App.css';
import OurMissionPage from './OurMissionComponent';
import Contact from './ContactComponent';
import {useHistory} from 'react-router-dom'



const items = [
    {
      src: mission,
      altText: '',
      caption: 'Meet With New People',
      text: ''
    },
    {
      src: features,
      altText: '',
      caption: 'Usable On A Range Of Devices'
    },
    {
      src: feedback,
      altText: '',
      caption: 'For Everyone'
    }
  ];

const HomePage = (props) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
  
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);

    }
  
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
          className="carousel-item"
        >
          <img className="img-fluid" src={item.src} alt={item.altText} height={"600"} width={"100%"}/>
          <CarouselCaption color={"black"} captionText={item.text} captionHeader={item.caption} />
        </CarouselItem>
      );
    });
  
    return (
      <div >
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
          className="carousel"
        >
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
      </div>
    );
}



 


const MainPage = () => {

const history=useHistory()
  useEffect(()=>{
    if(localStorage.getItem("reload")=="true"){
      history.go(0)
      localStorage.setItem("reload","false")
    }
    
  })

  return(
    <div>
      <HomePage />
      <center><OurMissionPage /></center>
      <FeaturesPage />
     
      <DownloadsPage />
      <UsersFeedbackPage />
      {/* <Contact /> */}
    </div>
  );
}

export default MainPage;