// import { connect } from 'react-redux'
import React, { Component } from 'react'
import BarChart from './BarChart'
import Graphs from './Graphs'
import Scatter from './Scatter'

export class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bank: 400,
      bet: 1,
      initialBet: 1,
      loops: 1000,
      low: 400,
      high: 400,
      movingBank: [400],
      result: 0,
      results: [0],
      streak: 0,
      streaks: [],
      win: true,
      winNumber: 13
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.loopClicks = this.loopClicks.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: Number(e.target.value)
    })
  }

  handleClick() {
    const max = 36
    const min = 0
    const result = Number(Math.floor(Math.random() * (max - min + 1) + min))
    let win = result < this.state.winNumber ? false : true
    const streak =
      (!win && !this.state.win) || (win && this.state.win)
        ? this.state.streak + 1
        : 1
    let updateStreaks = this.state.streaks
    win !== this.state.win && updateStreaks.push(this.state.streak)
    const newResult = this.state.results.slice(0)
    newResult.push(result)
    const newBank = !win
      ? this.state.bank - this.state.bet
      : this.state.bank + this.state.bet * 1
    const newMovingBank = this.state.movingBank.slice(0)

    newMovingBank.push(newBank)
    this.setState({
      result: result,
      results: newResult,
      bank: newBank,
      movingBank: newMovingBank,
      bet: !win ? this.state.bet * 2 : this.state.initialBet,
      low: newMovingBank.slice(0).sort(function(a, b) {
        return a - b
      })[0],
      high: newMovingBank.slice(0).sort(function(a, b) {
        return b - a
      })[0],
      win: win,
      streak: streak,
      streaks: updateStreaks,
      longestStreak: updateStreaks.slice(0).sort(function(a, b) {
        return b - a
      })[0]
    })
  }

  loopClicks() {
    const loops = this.state.loops
    const max = 36
    const min = 0
    let results = this.state.results.slice(0)
    let bank = this.state.bank
    let movingBank = this.state.movingBank.slice(0)
    let bet = this.state.bet
    let result = 0
    let streak = this.state.streak
    let updateStreaks = this.state.streaks
    let win = this.state.win
    let perviousWin = this.state.win
    for (let i = 0; i < loops; i++) {
      result = Math.floor(Math.random() * (max - min + 1) + min)
      results.push(result)
      bank = result < this.state.winNumber ? bank - bet : bank + bet * 1
      movingBank.push(bank)
      bet = result < this.state.winNumber ? bet * 2 : this.state.initialBet
      let previousStreak = streak
      streak =
        (result < this.state.winNumber && !win) || (result > 24 && win)
          ? streak + 1
          : 1
      win = result < this.state.winNumber ? false : true
      win !== perviousWin && updateStreaks.push(previousStreak)
      perviousWin = win
      bet = streak > 4 ? this.state.initialBet : bet
    }
    this.setState({
      result: result,
      results: results,
      bank: bank,
      movingBank: movingBank,
      bet: bet,
      low: movingBank.slice(0).sort(function(a, b) {
        return a - b
      })[0],
      high: movingBank.slice(0).sort(function(a, b) {
        return b - a
      })[0],
      win: win,
      streak: streak,
      streaks: updateStreaks,
      longestStreak: updateStreaks.slice(0).sort(function(a, b) {
        return b - a
      })[0]
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click Me</button>
        <button onClick={this.loopClicks}>{this.state.loops} Loops</button>
        <input
          type="number"
          placeholder="Enter number of loops"
          name="loops"
          onChange={this.handleChange}
        />
        <div>Bet: {this.state.bet}</div>
        <div>You {this.state.win ? 'Won!' : 'Lost'}</div>
        <div>High: {this.state.high}</div>
        <div>Low: {this.state.low}</div>
        <div>Streak: {this.state.streak}</div>
        <div>
          longestStreak: {this.state.longestStreak}
          {/* , odds:
          {Math.pow(0.66, this.state.longestStreak) * 100} */}
        </div>
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
        <BarChart data={this.state.movingBank} size={[5000, 500]} />
        {/* <Graphs data={this.state.movingBank} size={[500, 500]} /> */}
        {/* <Scatter data={this.state} size={[500, 500]} /> */}
        <div style={{ marginBottom: '100px' }} />
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
