import React from 'react';

class MakePicksForm extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			champion: 'Argentina',
			mostgoals: 'A Griezmann',
			groupAwinner: 'Egypt',
			groupAsecond: 'Egypt',
			groupBwinner: 'Iran',
			groupBsecond: 'Iran',
			groupCwinner: 'Australia',
			groupCsecond: 'Australia',
			groupDwinner: 'Argentina',
			groupDsecond: 'Argentina',
			groupEwinner: 'Brazil',
			groupEsecond: 'Brazil',
			groupFwinner: 'Germany',
			groupFsecond: 'Germany',
			groupGwinner: 'Belgium',
			groupGsecond: 'Belgium',
			groupHwinner: 'Colombia',
			groupHsecond: 'Colombia'
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	checkForDuplicates() {
		let group = 'group';
		const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
		for (var i = 0; i < groups.length; i++) {
			var winner = group + groups[i] + 'winner';
			var second = group + groups[i] + 'second';
			if (this.state[winner] === this.state[second]) {
				alert('The winner of group ' + groups[i] + ' and the runner up of group ' + groups[i] + ' must be different.');
				return;
			}
		}
		this.props.submitPicks(this.state);
	}

	handleChange(e) {
		let target = e.target;
		let value = target.value;
		let name = target.name;
		this.setState({ [name]: target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		for (var key in this.state) {
			if (!this.state[key]) {
				alert('You didn\'t complete the form. Please finish the form before clicking submit.');
				return;

			}
		}
		this.checkForDuplicates();
	}

	render() {
		return (
			<section className="make-picks">
				<h2>Make your 2018 World Cup picks below</h2>
				<form onSubmit={this.handleSubmit}>
					<div className="form-items">
						<label>Name:</label>
						<input type="text"
							   name="name"
							   placeholder="please enter a name"
							   value={this.state.name}
							   onChange={this.handleChange}
							   required
						/>
					</div>
					<br />
					<div className="form-items">
						<label>200 points - Who will be the World Cup champion?</label>
						<select name="champion" onChange={this.handleChange}>
							<option value="Argentina">Argentina</option>
							<option value="Australia">Australia</option>
							<option value="Belgium">Belgium</option>
							<option value="Brazil">Brazil</option>
							<option value="Columbia">Columbia</option>
							<option value="Costa Rica">Costa Rica</option>
							<option value="Croatia">Croatia</option>
							<option value="Denmark">Denmark</option>
							<option value="Egypt">Egypt</option>
							<option value="England">England</option>
							<option value="France">France</option>
							<option value="Germany">Germany</option>
							<option value="Iceland">Iceland</option>
							<option value="Iran">Iran</option>
							<option value="Japan">Japan</option>
							<option value="South Korea">South Korea</option>
							<option value="Mexico">Mexico</option>
							<option value="Morocco">Morocco</option>
							<option value="Nigeria">Nigeria</option>
							<option value="Panama">Panama</option>
							<option value="Peru">Peru</option>
							<option value="Poland">Poland</option>
							<option value="Portugal">Portugal</option>
							<option value="Russia">Russia</option>
							<option value="Saudi Arabia">Saudi Arabia</option>
							<option value="Senegal">Senegal</option>
							<option value="Serbia">Serbia</option>
							<option value="Spain">Spain</option>
							<option value="Sweden">Sweden</option>
							<option value="Switzerland">Switzerland</option>
							<option value="Tunisia">Tunisia</option>
							<option value="Uruguay">Uruguay</option>
						</select>
					</div>
					<br />
					<div className="form-items">
						<label>40 points - Who will score the most goals?</label>
						<select name="mostgoals" onChange={this.handleChange}>
							<option value="A Griezmann">A Griezmann</option>
							<option value="C Ronaldo">C Ronaldo</option>
							<option value="D Costa">D Costa</option>
							<option value="G Jesus">G Jesus</option>
							<option value="H Cane">H Cane</option>
							<option value="J Rodriguez">J Rodriguez</option>
							<option value="K Mbappe">K Mbappe</option>
							<option value="L Messi">L Messi</option>
							<option value="L Suarez">L Suarez</option>
							<option value="M Salah">M Salah</option>
							<option value="Neymar">Neymar</option>
							<option value="R Lewandowski">R Lewandowski</option>
							<option value="R Lukaku">R Lukaku</option>
							<option value="S Aguerro">S Aguerro</option>
							<option value="T Muller">T Muller</option>
							<option value="T Werner">T Werner</option>
							<option value="Any other">Any other</option>
						</select>
					</div>
					<br />
					<div className="group-picks">
						<div>
							<label>10 points - Who will win Group A?</label>
							<select name="groupAwinner" onChange={this.handleChange} size="4">
								<option value="Egypt">Egypt</option>
								<option value="Russia">Russia</option>
								<option value="Saudi Arabia">Saudi Arabia</option>
								<option value="Uruguay">Uruguay</option>
							</select>
						</div>
						<div>
							<label>10 points - Who will be runner up?</label>
							<select name="groupAsecond" onChange={this.handleChange} size="4">
								<option value="Egypt">Egypt</option>
								<option value="Russia">Russia</option>
								<option value="Saudi Arabia">Saudi Arabia</option>
								<option value="Uruguay">Uruguay</option>
							</select>
						</div>
					</div>
					<br />
					<div className="group-picks">
						<div>
							<label>10 points - Who will win Group B?</label>
							<select size="4" name="groupBwinner" onChange={this.handleChange}>
								<option value="Iran">Iran</option>
								<option value="Morocco">Morocco</option>
								<option value="Portugal">Portugal</option>
								<option value="Spain">Spain</option>
							</select>
						</div>
						<div>
							<label>10 points - Who will be runner up?</label>
							<select size="4" name="groupBsecond" onChange={this.handleChange}>
								<option value="Iran">Iran</option>
								<option value="Morocco">Morocco</option>
								<option value="Portugal">Portugal</option>
								<option value="Spain">Spain</option>
							</select>
						</div>
					</div>
					<br />
					<div className="group-picks">
						<div>
							<label>10 points - Who will win Group C?</label>
							<select size="4" name="groupCwinner" onChange={this.handleChange}>
								<option value="Australia">Australia</option>
								<option value="Denmark">Denmark</option>
								<option value="France">France</option>
								<option value="Peru">Peru</option>
							</select>
						</div>
						<div>
							<label>10 points - Who will be runner up?</label>
							<select size="4" name="groupCsecond" onChange={this.handleChange}>
								<option value="Australia">Australia</option>
								<option value="Denmark">Denmark</option>
								<option value="France">France</option>
								<option value="Peru">Peru</option>
							</select>
						</div>
					</div>
					<br />
					<div className="group-picks">
						<div>
							<label>10 points - Who will win Group D?</label>
							<select size="4" name="groupDwinner" onChange={this.handleChange}>
								<option value="Argentina">Argentina</option>
								<option value="Croatia">Croatia</option>
								<option value="Iceland">Iceland</option>
								<option value="Nigeria">Nigeria</option>
							</select>
						</div>
						<div>
							<label>10 points - Who will be runner up?</label>
							<select size="4" name="groupDsecond" onChange={this.handleChange}>
								<option value="Argentina">Argentina</option>
								<option value="Croatia">Croatia</option>
								<option value="Iceland">Iceland</option>
								<option value="Nigeria">Nigeria</option>
							</select>
						</div>
					</div>
					<br />
					<div className="group-picks">
						<div>
							<label>10 points - Who will win Group E?</label>
							<select size="4" name="groupEwinner" onChange={this.handleChange}>
								<option value="Brazil">Brazil</option>
								<option value="Costa Rica">Costa Rica</option>
								<option value="Serbia">Serbia</option>
								<option value="Switzerland">Switzerland</option>
							</select>
						</div>
						<div>
							<label>10 points - Who will be runner up?</label>
							<select size="4" name="groupEsecond" onChange={this.handleChange}>
								<option value="Brazil">Brazil</option>
								<option value="Costa Rica">Costa Rica</option>
								<option value="Serbia">Serbia</option>
								<option value="Switzerland">Switzerland</option>
							</select>
						</div>
					</div>
					<br />
					<div className="group-picks">
						<div>
							<label>10 points - Who will win Group F?</label>
							<select size="4" name="groupFwinner" onChange={this.handleChange}>
								<option value="Germany">Germany</option>
								<option value="Mexico">Mexico</option>
								<option value="South Korea">South Korea</option>
								<option value="Sweden">Sweden</option>
							</select>
						</div>
						<div>
							<label>10 points - Who will be runner up?</label>
							<select size="4" name="groupFsecond" onChange={this.handleChange}>
								<option value="Germany">Germany</option>
								<option value="Mexico">Mexico</option>
								<option value="South Korea">South Korea</option>
								<option value="Sweden">Sweden</option>
							</select>
						</div>
					</div>
					<br />
					<div className="group-picks">
						<div>
							<label>10 points - Who will win Group G?</label>
							<select size="4" name="groupGwinner" onChange={this.handleChange}>
								<option value="Belgium">Belgium</option>
								<option value="England">England</option>
								<option value="Panama">Panama</option>
								<option value="Tunisia">Tunisia</option>
							</select>
						</div>
						<div>
							<label>10 points - Who will be runner up?</label>
							<select size="4" name="groupGsecond" onChange={this.handleChange}>
								<option value="Belgium">Belgium</option>
								<option value="England">England</option>
								<option value="Panama">Panama</option>
								<option value="Tunisia">Tunisia</option>
							</select>
						</div>
					</div>
					<br />
					<div className="group-picks">
						<div>
							<label>10 points - Who will win Group H?</label>
							<select size="4" name="groupHwinner" onChange={this.handleChange}>
								<option value="Colombia">Colombia</option>
								<option value="Japan">Japan</option>
								<option value="Poland">Poland</option>
								<option value="Senegal">Senegal</option>
							</select>
						</div>
						<div>
							<label>10 points - Who will be runner up?</label>
							<select size="4" name="groupHsecond" onChange={this.handleChange}>
								<option value="Colombia">Colombia</option>
								<option value="Japan">Japan</option>
								<option value="Poland">Poland</option>
								<option value="Senegal">Senegal</option>
							</select>
						</div>
					</div>
					<br />
					<button type="submit">Submit Picks</button>
				</form>
			</section>
		)
	}
}

export default MakePicksForm;
