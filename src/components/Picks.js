import React from 'react';
import axios from 'axios';

class Picks extends React.Component {
	constructor() {
		super();
		this.state = {
			picks: [],
			groups: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
			groupWinners: {},
			prevLocation: '/',
			bracketPicks: {},
			bracketWinners: {}
		}
		this.checkIfCorrectBracketPick = this.checkIfCorrectBracketPick.bind(this);
	}

	componentDidMount() {
		this.getPicks();
	}

	componentDidUpdate() {
		if (this.state.prevLocation === this.props.match.params.username) {
			return;
		}
		this.getPicks();
	}

	calculatePoints() {
		let points = 0;
		let winnerKey = '';
		let secondKey = '';
		let { groupWinners, groups, picks } = this.state;
		if (!Object.keys(groupWinners).length) {
			return 0;
		}
		for (var i = 0; i < groups.length; i++) {
			winnerKey = 'group' + groups[i] + 'winner';
			secondKey = 'group' + groups[i] + 'second';
			if (groupWinners[groups[i]].winner === picks[0][winnerKey]) {
				points += 10;
			}
			if (groupWinners[groups[i]].second === picks[0][secondKey]) {
				points += 10;
			}
		}
		points += this.calculateBracketPoints();
		if (this.state.bracketWinners && this.state.picks.length) {
			if (this.state.bracketWinners.champ === this.state.picks[0].champion) {
				points += 200;
			}
		}
		return points;
	}

	calculateBracketPoints() {
		const { bracketPicks, bracketWinners } = this.state;
		let points = 0;
		for (var key in bracketWinners) {
			if (bracketWinners[key] === bracketPicks[key]) {
				if (/2/.test(key)) {
					points += 10;
				} else if (/3/.test(key)) {
					points += 20;
				} else if (/4/.test(key)) {
					points += 30;
				} else if (/champ/.test(key)) {
					points += 50;
				}
			}
		}
		return points;
	}

	getPicks() {
		const username = this.props.match.params.username;
		axios.get(`/api/picks?name=${username}`)
			.then((response) => {
				if (response.data.userPicks.length) {
					let bracket = response.data.bracketPicks.length ? response.data.bracketPicks[0] : {};
					this.setState({
						picks: response.data.userPicks,
						groupWinners: response.data.groupWinners,
						prevLocation: this.props.match.params.username,
						bracketPicks: bracket,
						bracketWinners: response.data.bracketWinners
					});
				}
			});
	}

	printPicks(group, i) {
		const winnerKey = 'group' + group + 'winner';
		const secondKey = 'group' + group + 'second';
		const groupWinners = this.state.groupWinners;
		var winnerClassname, secondClassname;
		if (groupWinners[group].winner === '---') {
			winnerClassname = '';
		} else if (this.state.picks[0][winnerKey] === groupWinners[group].winner) {
			winnerClassname = 'correct';
		} else {
			winnerClassname = 'incorrect';
		}
		if (groupWinners[group].second === '---') {
			secondClassname = '';
		} else if (this.state.picks[0][secondKey] === groupWinners[group].second) {
			secondClassname = 'correct';
		} else {
			secondClassname = 'incorrect';
		}
		return (
			<tr key={i}>
				<td>Group {group}</td>
				<td className={winnerClassname}>{this.state.picks[0][winnerKey]}</td>
				<td className={secondClassname}>{this.state.picks[0][secondKey]}</td>
			</tr>
		)
	}

	checkIfCorrectBracketPick(pick, classname, key) {
		let newclass = '';
		if (this.state.bracketWinners[key] === '') {

		} else if (this.state.bracketWinners[key] === pick) {
			newclass = ' correct';
		} else {
			newclass = ' incorrect';
		}

		let targetClass = classname.split(' ')[1];
		if (targetClass === 'team1' || targetClass === 'top-team') {
			return (<div className={classname}><span className={newclass}>{pick}</span></div>);
		} else {
			return (<div className={classname}><span className={newclass}>{pick}</span></div>);
		}
	}

	render() {
		if (!Object.keys(this.props.groupWinners).length) {
			return null;
		}
		let teams = this.props.groupWinners;

		if (this.state.picks.length) {
			const picks = this.state.picks[0];
			return (
				<div className="picks">
				    <h3>{picks.name}'s Picks</h3>
				    <h5>{this.calculatePoints()} Points</h5>
				    <div className="flex-picks">
				    	<p>Champion: <span className={this.state.bracketWinners && this.state.bracketWinners.champ === '' ? '' : this.state.bracketWinners.champ === picks.champion ? 'correct' : 'incorrect'}>{picks.champion}</span></p>
				    	<p>Most Goals: {picks.mostgoals}</p>
				    </div>
				    <table>
				    	<tbody>
				    		<tr>
				    			<th>   </th>
				    			<th>1st</th>
				    			<th>2nd</th>
				    		</tr>
						    {this.state.groups.map((group, i) => {
						    	return this.printPicks(group, i)
						    })}
						</tbody>
					</table>
					{Object.keys(this.state.bracketPicks).length ?
						<div className="bracket">
							<div className="round-one">
								<div className="team1">{teams['A'].winner}</div>
								<div className="team2"><span>{teams['B'].second}</span></div>
								<div className="team1">{teams['C'].winner}</div>
								<div className="team2"><span>{teams['D'].second}</span></div>
								<div className="team1">{teams['E'].winner}</div>
								<div className="team2"><span>{teams['F'].second}</span></div>
								<div className="team1">{teams['G'].winner}</div>
								<div className="team2"><span>{teams['H'].second}</span></div>
								<div className="team1">{teams['B'].winner}</div>
								<div className="team2"><span>{teams['A'].second}</span></div>
								<div className="team1">{teams['D'].winner}</div>
								<div className="team2"><span>{teams['C'].second}</span></div>
								<div className="team1">{teams['F'].winner}</div>
								<div className="team2"><span>{teams['E'].second}</span></div>
								<div className="team1">{teams['H'].winner}</div>
								<div className="team2"><span>{teams['G'].second}</span></div>												
							</div>
							<div className="round-two">
								{this.checkIfCorrectBracketPick(this.state.bracketPicks.round2A, '2A team1 top-team', 'round2A')}
								{this.checkIfCorrectBracketPick(this.state.bracketPicks.round2B, '2A team2', 'round2B')}
								{this.checkIfCorrectBracketPick(this.state.bracketPicks.round2C, '2B team1', 'round2C')}
								{this.checkIfCorrectBracketPick(this.state.bracketPicks.round2D, '2B team2', 'round2D')}
								{this.checkIfCorrectBracketPick(this.state.bracketPicks.round2E, '2C team1', 'round2E')}
								{this.checkIfCorrectBracketPick(this.state.bracketPicks.round2F, '2C team2', 'round2F')}
								{this.checkIfCorrectBracketPick(this.state.bracketPicks.round2G, '2D team1', 'round2G')}
								{this.checkIfCorrectBracketPick(this.state.bracketPicks.round2H, '2D team2', 'round2H')}
							</div>
							<div className="round-three">
								{this.checkIfCorrectBracketPick(this.state.bracketPicks.round3A, '3A team1 top-team', 'round3A')}
								{this.checkIfCorrectBracketPick(this.state.bracketPicks.round3B, '3A team2', 'round3B')}
								{this.checkIfCorrectBracketPick(this.state.bracketPicks.round3C, '3B team1', 'round3C')}
								{this.checkIfCorrectBracketPick(this.state.bracketPicks.round3D, '3B team2', 'round3D')}
							</div>
							<div className="round-four">
								{this.checkIfCorrectBracketPick(this.state.bracketPicks.round4A, '4A team1 top-team', 'round4A')}
								{this.checkIfCorrectBracketPick(this.state.bracketPicks.round4B, '4A team2', 'round4B')}
							</div>
							<div className="champ">
								{this.checkIfCorrectBracketPick(this.state.bracketPicks.champ, 'team1 top-team', 'champ')}
							</div>
						</div>
						:
						<div className="bracket">
							<div className="round-one">
								<div className="team1">{teams['A'].winner}</div>
								<div className="team2"><span>{teams['B'].second}</span></div>
								<div className="team1">{teams['C'].winner}</div>
								<div className="team2"><span>{teams['D'].second}</span></div>
								<div className="team1">{teams['E'].winner}</div>
								<div className="team2"><span>{teams['F'].second}</span></div>
								<div className="team1">{teams['G'].winner}</div>
								<div className="team2"><span>{teams['H'].second}</span></div>
								<div className="team1">{teams['B'].winner}</div>
								<div className="team2"><span>{teams['A'].second}</span></div>
								<div className="team1">{teams['D'].winner}</div>
								<div className="team2"><span>{teams['C'].second}</span></div>
								<div className="team1">{teams['F'].winner}</div>
								<div className="team2"><span>{teams['E'].second}</span></div>
								<div className="team1">{teams['H'].winner}</div>
								<div className="team2"><span>{teams['G'].second}</span></div>												
							</div>
							<div className="round-two">
								<div className="2A team1 top-team">---</div>
								<div className="2A team2"><span>---</span></div>
								<div className="2B team1">---</div>
								<div className="2B team2"><span>---</span></div>
								<div className="2C team1">---</div>
								<div className="2C team2"><span>---</span></div>
								<div className="2D team1">---</div>
								<div className="2D team2"><span>---</span></div>
							</div>
							<div className="round-three">
								<div className="3A team1 top-team">---</div>
								<div className="3A team2"><span>---</span></div>
								<div className="3B team1">---</div>
								<div className="3B team2"><span>---</span></div>
							</div>
							<div className="round-four">
								<div className="4A team1 top-team">---</div>
								<div className="4A team2"><span>---</span></div>
							</div>
							<div className="champ">
								<div className="team1 top-team">---</div>
							</div>
						</div>
						}
				</div>
			)
		}
		return null;
	}
}

export default Picks;
