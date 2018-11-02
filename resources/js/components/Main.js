import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Login from './Login';

/* our Main components */
class Main extends Component {

    constructor () {
        super();

        // Initializing the component's state
        this.state = {
            quizzes: [],
            chosenAnswers: {
                answer_one: "",
                answer_two: "",
                answer_three: "",
                correct_answer: "",
            },
        }

        this.submitAnswers = this.submitAnswers.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(key, e) {

        /*Duplicating and updating the state */
        var state = Object.assign({}, this.state.newProduct);
        state[key] = e.target.value;
        this.setState({newProduct: state });
    }

    /* This method is invoked when submit button is pressed */
    handleSubmit(e) {
        //preventDefault prevents page reload
        e.preventDefault();
        /*A call back to the onAdd props. The current
         *state is passed as a param
         */
        this.props.onAdd(this.state.chosenAnswers);
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

    isAuthenticated() {
        const token = localStorage.getItem('access_token');
        return token && token.length > 10;
    }

    renderQuestions() {
        return this.state.quizzes.map(quiz => {
            return (
                //this.handleClick() method is invoked onClick.
                <div key={quiz.id} >
                    <div>
                        <p>{ quiz.question }</p>
                    </div>
                    <div>
                        <input type="radio" name={quiz.id} value={quiz.id}
                               onChange={(e)=>this.handleInput(quiz.id, e)}
                        />  { quiz.answer_one } <br />
                        <input type="radio" name={quiz.id} value={quiz.id}
                               onChange={(e)=>this.handleInput(quiz.id, e)} />  { quiz.answer_two } <br />
                        <input type="radio" name={quiz.id} value={quiz.id}
                               onChange={(e)=>this.handleInput(quiz.id, e)} />  { quiz.answer_three } <br />
                        <input type="radio" name={quiz.id} value={quiz.id}
                               onChange={(e)=>this.handleInput(quiz.id, e)}/>  { quiz.correct_answer } <br />
                    </div>
                    <br />
                    <hr />
                </div>

            );
        })
    }

    handleAnsweredQuestion (event) {
        this.setState({answer: event.target.value})
    }

    submitAnswers(chosenAnswer) {
        //event.preventDefault();
        /*Fetch API for post request */
        fetch( 'api/products/', {
            method:'post',
            /* headers are important*/
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(chosenAnswer)
        })
            .then(response => {
                return response.json();
            })
            .then( data => {
                //update the state of products and currentProduct
                this.setState((prevState)=> ({
                    chosenAnswer: prevState.products.concat(data),
                }))
            })
    }


    render() {
        const isAlreadyAuthenticated = this.isAuthenticated();

        return (
            <div>
            { !isAlreadyAuthenticated ?
                    <BrowserRouter>
                        <Login />
                    </BrowserRouter>
                    : (
                        <div>
                            <form onSubmit={this.submitAnswers.bind(this)}>
                                {this.renderQuestions()}
                                <button type="submit" className="btn btn-primary">Submit</button>
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


