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
      results: [],
      bank: 10000
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    let max = 36
    let min = 0
    let result = Math.floor(Math.random()*(max-min+1)+min);
  }

  render() {
    return <div>
      <button></button>
      <div>
        <div>
          result:

        </div>
        <div>
          bank:
        </div>
      </div>
    </div>
  }
}

// const mapStateToProps = state => ({})

// const mapDispatchToProps = {}

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Board)
