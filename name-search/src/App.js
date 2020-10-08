import React, { Component } from "react";
import "./App.css";
function City(props) {
	return (
		<div className="card">
			<ul className="locItem">
				<li>{props.data}</li>
			</ul>
		</div>
	);
}
function NameField(props) {
	return (
		<div className="input-field">
			<div className="lable">City Name: </div>{" "}
			<input
				type="text"
				onChange={(e) => props.cityChanged(e)}
				value={props.value}
			/>
		</div>
	);
}
class App extends Component {
	state = {
		inputCity: "",
		cityResults: [],
	};
	handleNameChange = async (e) => {
		this.setState({
			inputCity: e.target.value,
		});

		const res = await fetch(
			"https://ctp-zip-api.herokuapp.com/city/" + e.target.value.toUpperCase()
		);
		const jsonData = await res.json();
		this.setState({
			cityResults: jsonData,
		});
	};
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<h2>Zip Code Search</h2>
				</div>
				<NameField
					cityChanged={this.handleNameChange}
					value={this.state.inputCity}
				/>
				<div>
					{this.state.cityResults.map((item, index) => {
						return <City data={item} key={index} />;
					})}
				</div>
			</div>
		);
	}
}
export default App;
