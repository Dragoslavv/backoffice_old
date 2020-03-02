import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class Home extends Component {
    constructor(props){
        super(props);


    }

    render() {
        return (
            <div id="wrapper" className={ localStorage.getItem('active') === true ? "toggled" :"" }>
                <section id="content-wrapper" >
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="content-title">Welcome</h2>
                            <p>Lorem ipsum...</p>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(Home);