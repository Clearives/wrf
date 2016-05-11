import React from 'react'
import ReactDOM from 'react-dom'
import '../../css/main.scss'

export default React.createClass({
    getInitialState() {
      return {
          num: 1
      }
    },
    handleClickAdd() {
        this.setState({
            num: this.state.num + 1
        })
      console.log(this.state.num)
    },
    handleClickCut() {
        this.setState({
            num: this.state.num - 1
        })
        console.log(this.state.num)
    },
    render() {
        return (
            <div>
                <h1> 标题</h1>
                <h2>{this.state.num}</h2>
                <button onClick={this.handleClickAdd}>+</button>
                <button onClick={this.handleClickCut}>-</button>
            </div>
        )
    }
})