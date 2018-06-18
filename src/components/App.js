import React from 'react';
import axios from 'axios';
import { Route, Switch, Link } from 'react-router-dom';
import MakePicksForm from './MakePicksForm';
import Picks from './Picks';
import Bracket from './Bracket';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			participants: [],
			madePicks: false,
			groupWinners: {}
		}
		this.submitBracket = this.submitBracket.bind(this);
		this.submitPicks = this.submitPicks.bind(this);
	}

	componentDidMount() {
		this.updateParticipants();
	}

	submitBracket(picks) {
		axios.post('/api/submitBracket', picks)
			.then((response) => {
				this.setState({ madePicks: true });
			})
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
				console.log('response: ', response)
				this.setState({
					participants: response.data.results,
					groupWinners: response.data.groupWinners
				});
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
				<Switch>
					<Route exact path="/" render={() => {
						return !this.state.madePicks ?
							<Bracket participants={this.state.participants} groupWinners={this.state.groupWinners} submitBracket={this.submitBracket} />
							:
							<div className="success-container">
								<h1 className="success-msg">You have successfully submitted your picks.</h1>
							</div>
					}} />
					<Route path="/picks/:username" render={(props) => (<Picks {...props} />)} />
				</Switch>
				<aside>
					<h4>Participants</h4>
					<div className="participants-container">
						{this.state.participants.map((user) => {
							return <p key={user._id}><Link to={`/picks/${user.name}`}>{user.name}</Link></p>
						})}
					</div>
				</aside>
			</div>
		)
	}
}

export default App;
