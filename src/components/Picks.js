import React from 'react';
import axios from 'axios';

class Picks extends React.Component {
	constructor() {
		super();
		this.state = {
			picks: [],
			groups: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
			groupWinners: {},
			prevLocation: '/'
		}
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
		return points;
	}

	getPicks() {
		const username = this.props.match.params.username;
		axios.get(`/api/picks?name=${username}`)
			.then((response) => {
				if (response.data.userPicks.length) {
					this.setState({
						picks: response.data.userPicks,
						groupWinners: response.data.groupWinners,
						prevLocation: this.props.match.params.username
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

	render() {
		if (this.state.picks.length) {
			const picks = this.state.picks[0];
			return (
				<div className="picks">
				    <h3>{picks.name}'s Picks</h3>
				    <h5>{this.calculatePoints()} Points</h5>
				    <div className="flex-picks">
				    	<p>Champion: {picks.champion}</p>
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
				</div>
			)
		}
		return null;
	}
}

export default Picks;
