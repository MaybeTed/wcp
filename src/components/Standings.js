import React from 'react';
import axios from 'axios';

class Standings extends React.Component {
	constructor() {
		super();
		this.state = {
			groups: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
			userPicks: [],
			bracketPicks: [],
			groupWinners: {},
			bracketWinners: {},
			goalsWinner: '',
			sortedScores: []
		}
	}

	componentDidMount() {
		axios.get('/api/picks')
			.then((response) => {
				this.setState({
					userPicks: response.data.userPicks,
					bracketPicks: response.data.bracketPicks,
					groupWinners: response.data.groupWinners,
					bracketWinners: response.data.bracketWinners,
					goalsWinner: response.data.goalsWinner
				}, () => this.calcScores())
			})
	}

	calcScores() {
		let { userPicks, groups, groupWinners, bracketPicks, bracketWinners, goalsWinner } = this.state;
		let userScores = {};
		let sortedScores = [];
		for (var picks of userPicks) {
			let points = 0;
			let winnerKey = '';
			let secondKey = '';
			for (var i = 0; i < groups.length; i++) {
				winnerKey = 'group' + groups[i] + 'winner';
				secondKey = 'group' + groups[i] + 'second';
				if (groupWinners[groups[i]].winner === picks[winnerKey]) {
					points += 10;
				}
				if (groupWinners[groups[i]].second === picks[secondKey]) {
					points += 10;
				}
			}

			if (bracketWinners && bracketWinners.champ) {
				if (bracketWinners.champ === picks.champion) {
					points += 200;
				}
			}
			if (goalsWinner) {
				if (goalsWinner === picks.mostgoals) {
					points += 40;
				}
			}
			userScores[picks.name] = points;
		}

		for (var userBracket of bracketPicks) {
			let bracketPoints = 0;
			let name = userBracket.name;
			for (var key in bracketWinners) {
				if (bracketWinners[key] === userBracket[key]) {
					if (/2/.test(key)) {
						bracketPoints += 10;
					} else if (/3/.test(key)) {
						bracketPoints += 20;
					} else if (/4/.test(key)) {
						bracketPoints += 40;
					} else if (/champ/.test(key)) {
						bracketPoints += 80;
					}
				}
			}
			userScores[name] += bracketPoints;
		}
		for (var user in userScores) {
			sortedScores.push({ name: user, points: userScores[user] });
		}
		sortedScores = sortedScores.sort((a, b) => {
			if (a.points > b.points) {
				return -1;
			}
			return 1;
		});
		this.setState({ sortedScores });
	}

	render() {
		if (!this.state.sortedScores) {
			return null;
		}
		return (
			<div className="standings-page">
				<section className="standings-container">
					<h2>Leaderboard</h2>
					<div className="standings">
						{this.state.sortedScores.map((user, i) => {
							return (
								<div className="row" key={i}>
									<div className="names">
										{user.name}
									</div>
									<div className="points">
										{user.points}
									</div>
								</div>
							)
						})}
					</div>
				</section>
			</div>
		)
	}
}

export default Standings;