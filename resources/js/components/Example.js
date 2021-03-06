// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
//
// export default class Example extends Component {
//     render() {
//         return (
//             <div className="container">
//                 <div className="row justify-content-center">
//                     <div className="col-md-8">
//                         <div className="card">
//                             <div className="card-header">Example Component</div>
//
//                             <div className="card-body">
//                                 I'm an example component!
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
//
// if (document.getElementById('example')) {
//     ReactDOM.render(<Example />, document.getElementById('example'));
// }



import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';
import {BrowserRouter} from 'react-router-dom';
import Quiz from './Login';


/* our Main components */
class Main extends Component {

    constructor () {
        super();

        // Initializing the component's state
        this.state = {
            email: "",
            password: "",
        }
    }

    componentDidMount() {
        /* fetch API in action */
        fetch('/api/auth/quiz')
            .then(response => {
                return response.json();
            })
            .then(quizzes => {
                //Fetched product is stored in the state
                this.setState({ quizzes });
            });
    }


    renderWelcome() {
        return (
            <div className="col-md-3">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1"
                           aria-describedby="emailHelp" placeholder="Enter email"
                           value={this.state.email}
                           onChange={this.handleEmailChanged.bind(this)}
                    />

                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                           placeholder="Password"
                           value={this.state.password}
                           onChange={this.handlePasswordChanged.bind(this)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        );
    }

    handleEmailChanged (event) {
        this.setState({email: event.target.value})
    }

    handlePasswordChanged (event) {
        this.setState({password: event.target.value})
    }

    submitForm(event) {
        event.preventDefault();
        superagent
            .post('/api/auth/login')
            .send({email: this.state.email, password: this.state.password})
            .end((err, res) => {
                if(err) {this.state({errMessage: "Authentication Failed"});  return;}
                localStorage.setItem('access_token', res.body.access_token);
            });
    }

    isAuthenticated() {
        const token = localStorage.getItem('access_token');
        return token && token.length > 10;
    }



    render() {
        const isAlreadyAuthenticated = this.isAuthenticated();

        return (
            <div>
                { isAlreadyAuthenticated ?
                    <BrowserRouter>
                        <Quiz />
                    </BrowserRouter>
                    : (
                        <div className="container-fluid">
                            <form onSubmit={this.submitForm.bind(this)}>
                                { this.renderWelcome() }
                            </form>
                        </div>
                    )}
            </div>
        );
    }

}


export default Main;

/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";
*/
if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}


