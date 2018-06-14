import React from 'react';
import axios from 'axios';
import MakePicksForm from './MakePicksForm';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			participants: []
		}
		this.submitPicks = this.submitPicks.bind(this);
	}

	componentDidMount() {
		this.updateParticipants();
	}

	submitPicks(picks) {
		axios.post('/api/submitPicks', picks)
			.then((response) => this.updateParticipants())
	}

	updateParticipants() {
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
				<MakePicksForm submitPicks={this.submitPicks} />
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
