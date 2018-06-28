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
			sortedScores: [],
			scoringTableData: [
				{ label: 'Group Winner', points: 10},
				{ label: 'Group Runner-up', points: 10},
				{ label: 'Initial Champion Pick', points: 100},
				{ label: 'Player with most goals', points: 40},
				{ label: 'Round 1', points: 20},
				{ label: 'Round 2', points: 40},
				{ label: 'Round 3', points: 70},
				{ label: 'Championship', points: 100}
			]
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
					points += 100;
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
						bracketPoints += 20;
					} else if (/3/.test(key)) {
						bracketPoints += 40;
					} else if (/4/.test(key)) {
						bracketPoints += 70;
					} else if (/champ/.test(key)) {
						bracketPoints += 100;
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

	renderScoringTable(row, i) {
		return (
			<tr key={i}>
				<td>{row.label}</td>
				<td>{row.points}</td>
			</tr>
		);

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
										{i + 1}. {user.name}
									</div>
									<div className="points">
										{user.points}
									</div>
								</div>
							)
						})}
					</div>
				</section>
				<section className="scoring-table-container">
					<h2>Point Values</h2>
					<table>
						<tbody>
							{this.state.scoringTableData.map((row, i) => {
								return this.renderScoringTable(row, i);
							})}
						</tbody>
					</table>
				</section>
			</div>
		)
	}
}

export default Standings;