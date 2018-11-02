import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';
import {BrowserRouter} from 'react-router-dom';
import Home from './Home';


/* our Main components */
class Login extends Component {

    constructor () {
        super();

        // Initializing the component's state
        this.state = {
            email: "",
            password: "",
        }
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
        //event.preventDefault();
        superagent
            .post('/api/auth/login')
            .send({email: this.state.email, password: this.state.password})
            .end((err, res) => {
                if(err) {this.state({errMessage: "Authentication Failed"});  return;}
                localStorage.setItem('access_token', res.body.access_token);
            });
        this.setState({});
    }


    render() {
        return (
            <div>
                <div className="container-fluid">
                    <form onSubmit={this.submitForm.bind(this)}>
                        { this.renderWelcome() }
                        </form>

                    <Home />

                </div>
            </div>
        );
    }

}


export default Login;


