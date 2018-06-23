import React from 'react';

class Bracket extends React.Component {
	constructor() {
		super();
		this.state = {
			round2A: '---',
			round2B: '---',
			round2C: '---',
			round2D: '---',
			round2E: '---',
			round2F: '---',
			round2G: '---',
			round2H: '---',
			round3A: '---',
			round3B: '---',
			round3C: '---',
			round3D: '---',
			round4A: '---',
			round4B: '---',
			champ: '---',
			name: ''
		}
		this.savePicks = this.savePicks.bind(this);
		this.selectName = this.selectName.bind(this);
		this.selectTeam = this.selectTeam.bind(this);
		this.selectRound2 = this.selectRound2.bind(this);
	}

	savePicks(e) {
		const picks = this.state;
		if (picks[name] === '') {
			alert('You forgot to select your name');
			return;
		}
		for (var key in picks) {
			if (picks[key] === '---') {
				alert('You didn\'t finish filling out the bracket');
				return;
			}
		}
		this.props.submitBracket(picks);
	}

	selectName(e) {
		const name = e.target.value;
		this.setState({ name })
	}

	selectTeam(e) {
		const team = e.currentTarget.textContent;
		const group = this.props.groupWinners;
		if (team === group['A'].winner || team === group['B'].second) {
			this.setState({
				round2A: team,
				round3A: '---',
				round4A: '---',
				champ: '---'
			})
		} else if (team === group['C'].winner || team === group['D'].second) {
			this.setState({
				round2B: team,
				round3A: '---',
				round4A: '---',
				champ: '---'
			})
		} else if (team === group['E'].winner || team === group['F'].second) {
			this.setState({
				round2C: team,
				round3B: '---',
				round4A: '---',
				champ: '---'
			})
		} else if (team === group['G'].winner || team === group['H'].second) {
			this.setState({
				round2D: team,
				round3B: '---',
				round4A: '---',
				champ: '---'
			})
		} else if (team === group['B'].winner || team === group['A'].second) {
			this.setState({
				round2E: team,
				round3C: '---',
				round4B: '---',
				champ: '---'
			})
		} else if (team === group['D'].winner || team === group['C'].second) {
			this.setState({
				round2F: team,
				round3C: '---',
				round4B: '---',
				champ: '---'
			})
		} else if (team === group['F'].winner || team === group['E'].second) {
			this.setState({
				round2G: team,
				round3D: '---',
				round4B: '---',
				champ: '---'
			})
		} else if (team === group['H'].winner || team === group['G'].second) {
			this.setState({
				round2H: team,
				round3D: '---',
				round4B: '---',
				champ: '---'
			})
		}
	}

	selectRound2(e) {
		const team = e.currentTarget.textContent;
		const match = e.currentTarget.className.slice(0, 2);
		if (match === '2A') {
			this.setState({
				round3A: team,
				round4A: '---',
				champ: '---'
			})
		} else if (match === '2B') {
			this.setState({
				round3B: team,
				round4A: '---',
				champ: '---'
			})
		} else if (match === '2C') {
			this.setState({
				round3C: team,
				round4B: '---',
				champ: '---'
			})
		} else if (match === '2D') {
			this.setState({
				round3D: team,
				round4B: '---',
				champ: '---'
			})
		} else if (match === '3A') {
			this.setState({
				round4A: team,
				champ: '---'
			})
		} else if (match === '3B') {
			this.setState({
				round4B: team,
				champ: '---'
			})
		} else if (match === '4A') {
			this.setState({
				champ: team
			})
		}
	}

	render() {
		if (!this.props.participants.length) {
			return null;
		}

		let teams = this.props.groupWinners;

		return (
			<div className="bracket-page">
				<h3>Make your picks and then click the save button</h3>
				<div>
					<label>Select your name:</label>
					<select onChange={this.selectName}>
						<option>  </option>
						{this.props.participants.map((user, i) => {
							return <option key={i} value={user.name}>{user.name}</option>
						})}
					</select>
				</div>
				<div className="point-values">
					<p><span className="points1">10pts</span><span className="points2"></span>20pts<span className="points2">40pts</span><span className="points2">80pts</span></p>
				</div>
				<div className="bracket">
					<div className="round-one">
						<div className="team1" onClick={this.selectTeam}>{teams['A'].winner}</div>
						<div className="team2" onClick={this.selectTeam}><span>{teams['B'].second}</span></div>
						<div className="team1" onClick={this.selectTeam}>{teams['C'].winner}</div>
						<div className="team2" onClick={this.selectTeam}><span>{teams['D'].second}</span></div>
						<div className="team1" onClick={this.selectTeam}>{teams['E'].winner}</div>
						<div className="team2" onClick={this.selectTeam}><span>{teams['F'].second}</span></div>
						<div className="team1" onClick={this.selectTeam}>{teams['G'].winner}</div>
						<div className="team2" onClick={this.selectTeam}><span>{teams['H'].second}</span></div>
						<div className="team1" onClick={this.selectTeam}>{teams['B'].winner}</div>
						<div className="team2" onClick={this.selectTeam}><span>{teams['A'].second}</span></div>
						<div className="team1" onClick={this.selectTeam}>{teams['D'].winner}</div>
						<div className="team2" onClick={this.selectTeam}><span>{teams['C'].second}</span></div>
						<div className="team1" onClick={this.selectTeam}>{teams['F'].winner}</div>
						<div className="team2" onClick={this.selectTeam}><span>{teams['E'].second}</span></div>
						<div className="team1" onClick={this.selectTeam}>{teams['H'].winner}</div>
						<div className="team2" onClick={this.selectTeam}><span>{teams['G'].second}</span></div>												
					</div>
					<div className="round-two">
						<div className="2A team1 top-team" onClick={this.selectRound2}>{this.state.round2A}</div>
						<div className="2A team2" onClick={this.selectRound2}><span>{this.state.round2B}</span></div>
						<div className="2B team1" onClick={this.selectRound2}>{this.state.round2C}</div>
						<div className="2B team2" onClick={this.selectRound2}><span>{this.state.round2D}</span></div>
						<div className="2C team1" onClick={this.selectRound2}>{this.state.round2E}</div>
						<div className="2C team2" onClick={this.selectRound2}><span>{this.state.round2F}</span></div>
						<div className="2D team1" onClick={this.selectRound2}>{this.state.round2G}</div>
						<div className="2D team2" onClick={this.selectRound2}><span>{this.state.round2H}</span></div>
					</div>
					<div className="round-three">
						<div className="3A team1 top-team" onClick={this.selectRound2}>{this.state.round3A}</div>
						<div className="3A team2" onClick={this.selectRound2}><span>{this.state.round3B}</span></div>
						<div className="3B team1" onClick={this.selectRound2}>{this.state.round3C}</div>
						<div className="3B team2" onClick={this.selectRound2}><span>{this.state.round3D}</span></div>
					</div>
					<div className="round-four">
						<div className="4A team1 top-team" onClick={this.selectRound2}>{this.state.round4A}</div>
						<div className="4A team2" onClick={this.selectRound2}><span>{this.state.round4B}</span></div>
					</div>
					<div className="champ">
						<div className="team1 top-team">{this.state.champ}</div>
					</div>
				</div>
				<button onClick={this.savePicks}>Save</button>
			</div>
		)
	}
}

export default Bracket;
