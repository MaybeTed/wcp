import React from 'react';
import axios from 'axios';
import MakePicksForm from './MakePicksForm';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			participants: [],
			madePicks: false
		}
		this.submitPicks = this.submitPicks.bind(this);
	}

	componentDidMount() {
		this.updateParticipants();
	}

	submitPicks(picks) {
		axios.post('/api/submitPicks', picks)
			.then((response) => {
				this.setState({ madePicks: true });
				this.updateParticipants();
			})
	}

	updateParticipants() {
		window.scrollTo(0,0);
		axios.get('/api/participants')
			.then((response) => {
				this.setState({ participants: response.data });
			})
	}

	render() {
		return (
			<div>
				<header>
					<img src="/worldcup.png" />
					<img src="/messi.png" />
					<img src="/suarez.png" />
					<img src="/neymar.png" />
				</header>
				{!this.state.madePicks ? 
					<MakePicksForm submitPicks={this.submitPicks} />
					:
					<div className="success-container">
						<h1 className="success-msg">You have successfully submitted your picks.</h1>
					</div>
				}
				<aside>
					<h4>Participants</h4>
					<div className="participants-container">
						{this.state.participants.map((user) => {
							return <p key={user._id}>{user.name}</p>
						})}
					</div>
				</aside>
			</div>
		)
	}
}

export default App;
