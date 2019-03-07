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
      bet: 5
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const max = 36
    const min = 0
    const result = Number(Math.floor(Math.random() * (max - min + 1) + min))
    const newResult = this.state.results.slice()
    newResult.push(result)
    const newMovingBank = this.state.movingBank.slice()
    newMovingBank.push(
      result < 25
        ? this.state.movingBank - this.state.bet
        : this.state.movingBank + this.state.bet * 3
    )
    this.setState({
      result: result,
      results: newResult,
      bank:
        result < 25
          ? this.state.bank - this.state.bet
          : this.state.bank + this.state.bet * 3,
      movingBank: newMovingBank,
      bet: result < 25 ? 5 : this.state.bet * 2
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click Me</button>
        <div className="table-container">
          <div className="column-container">
            result: {this.state.result}
            <div>
              {this.state.results.map((result, idx) => {
                return <div key={idx}>{result}</div>
              })}
            </div>
          </div>
          <div className="column-container">
            bank:
            <div>
              {this.state.movingBank.map((bank, idx) => {
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
