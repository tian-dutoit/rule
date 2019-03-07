// import { connect } from 'react-redux'
import React, { Component } from 'react'

export class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: 0,
      results: [0],
      bank: 10000,
      movingBank: [1000],
      bet: 5,
      counter: 2
    }
    this.handleClick = this.handleClick.bind(this)
    this.loopClicks = this.loopClicks.bind(this)
  }

  handleClick() {
    const max = 36
    const min = 0
    const result = Number(Math.floor(Math.random() * (max - min + 1) + min))
    const newResult = this.state.results.slice(0)
    newResult.push(result)
    const newBank =
      result < 25
        ? this.state.bank - this.state.bet
        : this.state.bank + this.state.bet * 3
    const newMovingBank = this.state.movingBank.slice(0)
    newMovingBank.push(newBank)
    this.setState({
      result: result,
      results: newResult,
      bank: newBank,
      movingBank: newMovingBank,
      bet: result < 25 ? this.state.bet * 2 : 5,
      counter: this.state.counter - 1
    })
  }

  loopClicks() {
    if (this.state.counter > 0) {
      const max = 36
      const min = 0
      const result = Number(Math.floor(Math.random() * (max - min + 1) + min))
      const newResult = this.state.results.slice(0)
      newResult.push(result)
      const newBank =
        result < 25
          ? this.state.bank - this.state.bet
          : this.state.bank + this.state.bet * 3
      const newMovingBank = this.state.movingBank.slice(0)
      newMovingBank.push(newBank)
      this.setState(
        {
          result: result,
          results: newResult,
          bank: newBank,
          movingBank: newMovingBank,
          bet: result < 25 ? this.state.bet * 2 : 5,
          counter: this.state.counter - 1
        },
        this.handleClick()
      )
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click Me</button>
        <button onClick={this.loopClicks}>100 Clicks</button>
        <div>{this.state.bet}</div>
        <div className="table-container">
          <div className="column-container">
            result: {this.state.result}
            <div>
              {this.state.results.slice(-10).map((result, idx) => {
                return <div key={idx}>{result}</div>
              })}
            </div>
          </div>
          <div className="column-container">
            bank: {this.state.bank}
            <div>
              {this.state.movingBank.slice(-10).map((bank, idx) => {
                return <div key={idx}>{bank}</div>
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Board
// const mapStateToProps = state => ({})

// const mapDispatchToProps = {}

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Board)
