import React, { Component } from 'react'
import CalculatorDisplay from './CalculatorDisplay'
import Button from './Button'

const evaluate = function(accum, current, operation) {
  [current, accum] = [parseFloat(current), parseFloat(accum)]
  let result

  if (operation === '+') {
    result = accum + current
  } else if (operation === '-') {
    result = accum - current
  } else if (operation === 'X') {
    result = accum * current
  } else if (operation === '/') {
    result = accum / current
  }

  return String(result)
}

class Calculator extends Component {
  state = {
    current: '0',
    accum: '',
    lastOperator: '',
    acceptsNewNumber: true
  }

  handleClear = () => {
    this.setState({
      current: '0',
      accum: '',
      lastOperator: '',
      acceptsNewNumber: true
    })
  }

  handleNumberInput = numberString => {
    if (this.state.acceptsNewNumber) {
      this.setState({
        current: numberString,
        acceptsNewNumber: false
      })
    } else {
      this.setState(prevState => ({
        current: prevState.current + numberString
      }))
    }
  }

  handleOperatorInput = operator => {
    this.setState(prevState => {
      const { accum, current, lastOperator } = prevState
      return {
        current: lastOperator ? evaluate(accum, current, lastOperator) : current,
        accum: current,
        lastOperator: operator,
        acceptsNewNumber: true
      }
    })
  }

  handleEquation = () => {
    this.setState(prevState => {
      const { accum, current, lastOperator } = prevState
      return {
        current: evaluate(accum, current, lastOperator),
        accum: '',
        lastOperator: '',
        acceptsNewNumber: true
      }
    })
  }

  handlePercentage = () => {
    this.setState(prevState => ({
      current: `${parseFloat(prevState.current) / 100}`
    }))
  }

  handleInvert = () => {
    this.setState(prevState => ({
      current: `${-(parseFloat(prevState.current))}`
    }))
  }

  render() {
    return (
      <div className="calculator">
        <CalculatorDisplay number={this.state.current} />
        <div className="buttons">
          <div className='buttons-top'>
            <Button onClick={this.handleClear} value={'C'} />
            <Button onClick={this.handleInvert} value={'+/-'} />
            <Button onClick={this.handlePercentage} value={'%'} />
            <Button onClick={this.handleOperatorInput} value={'/'} />
            <Button onClick={this.handleNumberInput} value={"7"} />
            <Button onClick={this.handleNumberInput} value={"8"} />
            <Button onClick={this.handleNumberInput} value={"9"} />
            <Button onClick={this.handleOperatorInput} value={'X'} />
            <Button onClick={this.handleNumberInput} value={"4"} />
            <Button onClick={this.handleNumberInput} value={"5"} />
            <Button onClick={this.handleNumberInput} value={"6"} />
            <Button onClick={this.handleOperatorInput} value={'-'} />
            <Button onClick={this.handleNumberInput} value={"1"} />
            <Button onClick={this.handleNumberInput} value={"2"} />
            <Button onClick={this.handleNumberInput} value={"3"} />
            <Button onClick={this.handleOperatorInput} value={'+'} />
          </div>
          <div className="buttons-bottom">
            <Button onClick={this.handleNumberInput} value={"0"} />
            <Button onClick={this.handleNumberInput} value={"."} />
            <Button onClick={this.handleEquation} value={'='} />
          </div>
        </div>
      </div>
    )
  }
}

export default Calculator