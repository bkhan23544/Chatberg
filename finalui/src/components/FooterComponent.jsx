import React from 'react';
import '../App.css';
import {SocialMediaIconsReact} from 'social-media-icons-react';

const Footer = () => {
    return(
        <div className="footer">

            <div className="row justify-content-center">             
                <div className="" style={{ marginTop: '20px',marginBottom:"20px"}}>
                <SocialMediaIconsReact 
                            icon="github" 
                            url="https://github.com/"
                            iconSize={10}
                            size={40}
                            iconColor="#303243"
                            backgroundColor="#00cc6a"
                            borderColor="#00cc6a"
                        />

                    <p style={{ marginTop: '20px',marginBottom:"20px"}}>© Copyright 2020 by Chatberg</p>
                </div>
            </div>
        
         </div>
    );
}

export default Footer;