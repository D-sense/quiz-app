import React , {Component} from 'react';

/* our Main components */
class Home extends Component {

    constructor () {
        super();

        // Initializing the component's state
        this.state = {
            grades: []
        }
    }

    componentDidMount() {
        /* fetch API in action */
        fetch('/api/auth/grades')
            .then(response => {
                return response.json();
            })
            .then(grades => {
                //Fetched product is stored in the state
                this.setState({ grades });
            });
    }

    renderParticipants() {
        const count = this.state.grades.length;

        //checking is no user has taken the DB.
        if(count == 0){
            return (
                <div>
                    <p>No Participant in the DataBase</p>
                </div>
            );
        }

        return this.state.grades.map(participant => {
            return (
                //this.handleClick() method is invoked onClick.
                <div key={participant.id} >
                    <div>
                        <p>This user id: {participant.user_id} </p>
                        <p>Grade: { participant.grade }</p>
                    </div>
                    <br />
                    <hr />
                </div>

            );
        })
    }




    render() {
        return (
            <div lass="col">
                <h3>List of Participants</h3>
                <div> {this.renderParticipants()} </div>
            </div>
        );
    }

}


export default Home;




