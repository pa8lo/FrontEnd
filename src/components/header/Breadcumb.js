import React, { Component } from 'react';
import { Breadcrumb } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';

class BreadcumbMenu extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        redirectHome: false,
        redirectSection : false,
        redirectUrlSection : ''
      }
    }

    setRedirectToHome = () => {
        this.setState({
          redirectHome: true
        })
      }

      setRedirectToSection = () => {
        this.setState({
          redirectSection: true
        })
      }
      
      ToHome(){
        if (this.state.redirectHome) {
          return <Redirect to='/' />
        }
      }

      ToSection(){
        if (this.state.redirectSection) {
          return <Redirect to={`/${this.state.redirectUrlSection}`} />
        }
      }

    render() {

        let directories = window.location.href.split('/')
        directories.splice(0, 3);
        var hasNumber = /\d/g;

        return (
            <Breadcrumb style={{backgroundColor:"transparent", color:"white", marginBottom: "0px"}}>
                
                <Breadcrumb.Item onClick={() => this.setRedirectToHome()}  style={{ color:"white"}}><span style={{marginTop:"60px"}}>Home</span></Breadcrumb.Item>
                {this.ToHome()}

                {directories.map((dir, index) => {

                  let count = 0;
                  
                  count += 1;


                  if(dir === "rrhh"){

                    if(this.state.redirectSection === true){
                      this.state.redirectUrlSection = dir
                    }

                    return(
                      <Breadcrumb.Item key={dir} style={{ color:"white"}} onClick={() => this.setRedirectToSection()}>
                        RRHH
                      {this.ToSection()}
                      </Breadcrumb.Item>
                    )
                    
                  }else if(dir === "roles" || dir === "empleados" || dir === "turnos" || dir === "asistencias"){

                    if(this.state.redirectSection === true){
                      this.state.redirectUrlSection = "rrhh"
                    }

                    return(
                      <Breadcrumb.Item  key={dir} style={{ color:"white"}} onClick={() => this.setRedirectToSection()}>
                        {dir.charAt(0).toUpperCase() + dir.substring(1)}
                        {this.ToSection()}
                      </Breadcrumb.Item>
                    )

                  }else if(dir.indexOf('?=') > -1){

                    let double_word = dir.split("?")

                    let first_word = (double_word[0].charAt(0).toUpperCase() + double_word[0].substring(1))
                    // let second_word = (double_word[1].charAt(0).toUpperCase() + double_word[1].substring(1))

                    let def_word = first_word.split("-")

                    let first_word_final = (def_word[0].charAt(0).toUpperCase() + def_word[0].substring(1))
                    let second_word_final = (def_word[1].charAt(0).toUpperCase() + def_word[1].substring(1))

                    return(
                      <Breadcrumb.Item onClick={() => this.setRedirectToSection()} key={double_word[0]} style={{ color:"white"}}>
                        {first_word_final + " " + second_word_final}
                        {this.ToSection()}
                      </Breadcrumb.Item>
                    )

                  }else if(dir.indexOf('-') > -1){
                    
                    let double_word = dir.split("-")

                    let first_word = (double_word[0].charAt(0).toUpperCase() + double_word[0].substring(1))
                    let second_word = (double_word[1].charAt(0).toUpperCase() + double_word[1].substring(1))

                    return(
                      <Breadcrumb.Item disabled key={dir} style={{ color:"white"}}>
                        {first_word + " " + second_word}
                      </Breadcrumb.Item>
                    )

                  }else if(hasNumber.test(dir)){

                    return null
                    
                  }else if(dir === "pedido"){

                    if(this.state.redirectSection === true){
                      this.state.redirectUrlSection = dir+"s"
                    }

                    return(
                    <Breadcrumb.Item key={dir} style={{ color:"white"}} onClick={() => this.setRedirectToSection()}>
                        {dir.charAt(0).toUpperCase() + dir.substring(1)}s
                        {this.ToSection()}
                    </Breadcrumb.Item>
                    )                
                  }else if(dir === "producto"){

                    if(this.state.redirectSection === true){
                      this.state.redirectUrlSection = "modulo"
                    }

                    return(
                    <React.Fragment>
                      <Breadcrumb.Item key={dir} style={{ color:"white"}} onClick={() => this.setRedirectToSection()}>
                          Modulo
                          {this.ToSection()}
                      </Breadcrumb.Item>
                      <Breadcrumb.Item key={count} disabled style={{ color:"white"}}>
                          {dir.charAt(0).toUpperCase() + dir.substring(1)}
                      </Breadcrumb.Item>
                      
                    </React.Fragment>
                    )                
                  }else{
                    if(this.state.redirectSection === true){
                      this.state.redirectUrlSection = dir
                    }
                    return(
                      <Breadcrumb.Item key={dir} style={{ color:"white"}} onClick={() => this.setRedirectToSection()}>
                        {dir.charAt(0).toUpperCase() + dir.substring(1)}
                        {this.ToSection()}
                      </Breadcrumb.Item>
                    )
                  }
                })}

              </Breadcrumb>
        );
    }
}

export default BreadcumbMenu;