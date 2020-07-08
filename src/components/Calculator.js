import React, { Component } from 'react'
import CalculatorDislpay from './CalculatorDisplay'
import Button from './Button'

const evaluate = function(accum, current, operation) {
  [current, accum] = [parseFloat(current), parseFloat(accum)]
  if (operation === '+') {
    return accum + current
  } else if (operation === '-') {
    return accum - current
  } else if (operation === 'X') {
    return accum * current
  } else if (operation === '/') {
    return accum / current
  }
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
    const { accum, current, lastOperator } = this.state
    this.setState({
      current: evaluate(accum, current, lastOperator),
      accum: '',
      lastOperator: '',
      acceptsNewNumber: true
    })
  }

  render() {
    return (
      <div className="calculator">
        <CalculatorDislpay number={this.state.current} />
        <div className="buttons">
          <div className='buttons-top'>
            <Button onClick={this.handleClear} value={'C'} />
            <Button onClick={this.handleClear} value={'+/-'} />
            <Button onClick={this.handleClear} value={'%'} />
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