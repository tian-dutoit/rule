// import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Board extends Component {
  static propTypes = {
    prop: PropTypes
  }
  constructor(props) {
    super(props)
    this.state = {
      result: 0,
      results: [],
      bank: 10000,
      movingBank: [1000],
      bet: 5
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    let winnings = -this.state.bet
    let max = 36
    let min = 0
    let result = Math.floor(Math.random() * (max - min + 1) + min)
    this.setState({
      result: result,
      results: this.state.results.push(result),
      bank:
        result < 25
          ? this.state.bank - this.state.bet
          : this.state.bank + this.state.bet * 3,
      movingBank: this.state.movingBank.push(
        result < 25
          ? this.state.movingBank - this.state.bet
          : this.state.movingBank + this.state.bet * 3
      ),
      bet: result < 25 ? 5 : this.state.bet * 2
    })
  }

  render() {
    return (
      <div>
        {/* <div>
          <div>
            result: {this.state.result}
            <div>
              {this.state.results.map((result, idx) => {
                return <div key={idx}>{result}</div>
              })}
            </div>
          </div>
          <div>
            bank:
            <div>
              {this.state.movingBank.map((bank, idx) => {
                return <div key={idx}>{bank}</div>
              })}
            </div>
          </div>
        </div> */}
      </div>
    )
  }
}

// const mapStateToProps = state => ({})

// const mapDispatchToProps = {}

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Board)
