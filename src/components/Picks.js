import React from 'react';
import axios from 'axios';

class Picks extends React.Component {
	constructor() {
		super();
		this.state = {
			picks: [],
			groups: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
		}
	}

	componentDidMount() {
		console.log('componentDidMount');
		this.getPicks();
	}

	componentDidUpdate() {
		console.log('componentDidUpdate')
		this.getPicks();
	}

	getPicks() {
		console.log('f invoked')
		const username = this.props.match.params.username;
		axios.get(`/api/picks?name=${username}`)
			.then((response) => {
				if (response.data.userPicks.length) {
					this.setState({ picks: response.data.userPicks });
				}
			});
	}

	printPicks(group, i) {
		let winnerKey = 'group' + group + 'winner';
		let secondKey = 'group' + group + 'second';
		return (
			<tr key={i}>
				<td>Group {group}</td>
				<td>{this.state.picks[0][winnerKey]}</td>
				<td>{this.state.picks[0][secondKey]}</td>
			</tr>
		)
	}

	render() {
		if (this.state.picks.length) {
			const picks = this.state.picks[0];
			return (
				<div className="picks">
				    <h3>{picks.name}'s Picks</h3>
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
