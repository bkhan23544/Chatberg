import React, { Component, useState } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron,Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import WelcomeToChatberg from './WelcomeToChatberg';
import Userchat from './ChatboxComponent';
import { Link } from 'react-scroll';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    inputLabel: {
        color: "white",
        borderColor:"white",
        "&.Mui-focused": {
          color: "#00cc6a"
        }

      },
  }));


const InterestDropdown = (props) => {

    const classes = useStyles();
    const [state, setState] = React.useState({
        interest:"gaming",
});
const history = useHistory();

useEffect(()=>{
    if(localStorage.getItem("reload")=="true"){
        history.go(0)
        localStorage.setItem("reload","false")
      }
    localStorage.setItem("interest","gaming")
},[])

    function handleChange(event) {
        localStorage.setItem("interest",event.target.value)
        setState({interest:event.target.value})
    }

    return (
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel className={classes.inputLabel} id="demo-simple-select-outlined-label">Interest</InputLabel>
        <Select
        style={{color:"white"}}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={state.interest}
          onChange={handleChange}
          label="Interest"
          name="interest"
        >
          <MenuItem value={"gaming"}>Gaming</MenuItem>
          <MenuItem value={"movies"}>Movies</MenuItem>
          <MenuItem value={"programming"}>Programming</MenuItem>
          <MenuItem value={"dating"}>Dating</MenuItem>
          <MenuItem value={"currytraits"}>Curry Traits</MenuItem>
          <MenuItem value={"sports"}>Sports</MenuItem>
          <MenuItem value={"pcbuilding"}>Pc Building</MenuItem>

        </Select>
      </FormControl>
    );
}

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isNavOpen: false,
          isModalOpen: false,
          isChatOpen: false
        };

        this.toggleNav = this.toggleNav.bind(this);
      }

      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }


    render() {

        return(
            <div className="">
                <div >
                   
                <Navbar dark expand="md">
                        <div className=" container w-100 sticky">
                            <NavbarToggler onClick={this.toggleNav} />
                            <NavbarBrand className="mr-auto navbar-brand" href="/"><img src="logo.png" height="95" width="130" alt='Chatberg' /></NavbarBrand>
                            <Collapse isOpen={this.state.isNavOpen} navbar >
                                <Nav navbar >
                                    <NavItem style={{ marginLeft: "100px" }}>
                                        <NavLink className="nav-link" to='home' ><b>HOME</b></NavLink>
                                    </NavItem>
                                    <NavItem style={{ marginLeft: "70px" }}>
                                        <Link className="nav-link" to='ourmission' smooth={true} duration={1000}><b>OUR MISSION</b></Link>
                                    </NavItem>
                                    <NavItem style={{ marginLeft: "70px" }}>
                                        <Link className="nav-link" to='features' smooth={true} duration={1000}> <b>FEATURES</b></Link>
                                    </NavItem>
                                    <NavItem style={{ marginLeft: "70px" }}>
                                        <Link className="nav-link" to='usersfeedback' smooth={true} duration={1000}><b>DEVELOPED BY</b></Link>
                                    </NavItem>

                                </Nav>

                            </Collapse>
                        </div>
                    </Navbar>
                </div>



                {/* Jumbotron Header */}
                
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-8">
                                <WelcomeToChatberg className="navbar-brand" />

                            </div>
                        </div>
                        
                        
                        <div className="row row-header">
                        <InterestDropdown/>
                            <NavLink to="mychatbox"><Button className="jumbotron-btn" size="lg">
                                <b>START CHAT!</b>
                                </Button>
                                </NavLink>

                        </div>
                    </div>
                </Jumbotron>

           
                

            </div>
        );
        
        
    }
}

export default Header;