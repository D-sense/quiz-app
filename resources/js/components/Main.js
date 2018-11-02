import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';
import {BrowserRouter} from 'react-router-dom';
import Login from './Login';

/* our Main components */
class Main extends Component {

    constructor () {
        super();

        // Initializing the component's state
        this.state = {
            quizzes: []
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
                        <input type="radio" name={quiz.id} value={quiz.id} />{ quiz.answer_one } <br />
                        <input type="radio" name={quiz.id} value={quiz.id} />{ quiz.answer_two } <br />
                        <input type="radio" name={quiz.id} value={quiz.id} />{ quiz.answer_three } <br />
                        <input type="radio" name={quiz.id} value={quiz.id} />{ quiz.correct_answer } <br />
                    </div>
                    <br />
                    <hr />
                </div>

            );
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
                            <form>
                                {this.renderQuestions()}
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

