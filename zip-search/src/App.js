import React, { Component } from "react";
import "./App.css";
function City(props) {
	return (
		<div className="card">
			<h3>
				{props.data.City}, {props.data.State}
			</h3>
			<ul className="locItem">
				<li>Population: {props.data.EstimatedPopulation}</li>
				<li>
					Location: ({props.data.Lat}, {props.data.Long})
				</li>
				<li>TotalWages: ({props.data.TotalWages})</li>
			</ul>
		</div>
	);
}
function ZipSearchField(props) {
	return (
		<div className="input-field">
			<div className="lable">Zip Code: </div>{" "}
			<input
				type="text"
				onChange={(e) => props.zipChanged(e)}
				value={props.value}
			/>
		</div>
	);
}
class App extends Component {
	state = {
		inputZip: "",
		cityResults: [],
	};
	handleZipChange(e) {
		this.setState({
			inputZip: e.target.value,
		});
		if (e.target.value.length === 5) {
			fetch("https://ctp-zip-api.herokuapp.com/zip/" + e.target.value)
				.then((res) => res.json())
				.then((jsonData) => {
					this.setState({
						cityResults: jsonData,
					});
				})
				.catch((err) => {
					this.setState({ cityResults: [] });
				});
		} else {
			this.setState({ cityResults: [] });
		}
	}
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<h2>Zip Code Search</h2>
				</div>
				<ZipSearchField
					zipChanged={(e) => this.handleZipChange(e)}
					value={this.state.inputZip}
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
