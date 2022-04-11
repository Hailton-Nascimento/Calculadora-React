import React, { Component } from "react";
import Button from "../componentes/Button";
import Display from "../componentes/Display";

import "./Calculator.css";
const initialState = {
	displayValue: "0",
	clearDisplay: false,
	operation: null,
	values: [0, 0],
	current: 0,
};
export default class Calculator extends Component {
	constructor(props) {
		super(props);
		this.addDigit = this.addDigit.bind(this);
		this.setOpeation = this.setOpeation.bind(this);
		this.clearMemory = this.clearMemory.bind(this);
	}

	state = { ...initialState };

	clearMemory() {
		this.setState({ ...initialState });
	}

	setOpeation(operation) {
		if (this.state.displayValue === "0") {
			return;
		}
		if (this.state.current === 0) {
			this.setState({ operation, current: 1, clearDisplay: true });
		} else {
            console.log(operation);
			const equals = operation === '=';
			const currentOperation = this.state.operation;
			const values = [...this.state.values];
         
			try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
			} catch (error) {
				values[0] = this.state.values[0];
			}
            console.log(values[0])
			values[1] = 0;


			this.setState({
				displayValue: values[0],
				operation: equals ? null : operation,
				current: equals ? 0 : 1,
				clearDisplay: !equals,
				values,
			});
		}
	}

	addDigit(digit) {
		if (digit === "." && this.state.displayValue.includes(".")) {
			return;
		}
		const clearDisplay =
			this.state.displayValue === "0" || this.state.clearDisplay;
		const currentValue = clearDisplay ? "" : this.state.displayValue;
		const displayValue = currentValue + digit;
		this.setState({ displayValue, clearDisplay: false });

		if (digit !== ".") {
			const indexCurrent = this.state.current;
			const newValue = parseFloat(displayValue);
			const values = [...this.state.values];
			values[indexCurrent] = newValue;
			this.setState({ values });
			console.log(values);
		}
	}

	render() {
		return (
			<div className="calculator">
				<Display value={this.state.displayValue} />
				<Button
					click={this.clearMemory}
					seletores={["button", "triple"]}
					label="AC"
				/>
				<Button
					click={this.setOpeation}
					seletores={["button", "operacao"]}
					label="/"
				/>
				<Button click={this.addDigit} seletores={["button"]} label="7" />
				<Button click={this.addDigit} seletores={["button"]} label="8" />
				<Button click={this.addDigit} seletores={["button"]} label="9" />
				<Button
					click={this.setOpeation}
					seletores={["button", "operacao"]}
					label="*"
				/>
				<Button click={this.addDigit} seletores={["button"]} label="4" />
				<Button click={this.addDigit} seletores={["button"]} label="5" />
				<Button click={this.addDigit} seletores={["button"]} label="6" />
				<Button
					click={this.setOpeation}
					seletores={["button", "operacao"]}
					label="-"
				/>
				<Button click={this.addDigit} seletores={["button"]} label="1" />
				<Button click={this.addDigit} seletores={["button"]} label="2" />
				<Button click={this.addDigit} seletores={["button"]} label="3" />
				<Button
					click={this.setOpeation}
					seletores={["button", "operacao"]}
					label="+"
				/>
				<Button
					click={this.addDigit}
					seletores={["button", "doble"]}
					label="0"
				/>
				<Button click={this.addDigit} seletores={["button"]} label="." />
				<Button click={this.setOpeation} seletores={["button"]} label="=" />
			</div>
		);
	}
}
