import React from 'react'
import ReactDOM from 'react-dom'
import AppStore from '../stores/AppStore'
import AppActions from '../actions/AppActions'

function getListState() {
    return {
        allLists: AppStore.getAll(),
        alertMsg: '我是弹窗'
    };
}

export default React.createClass({
    getInitialState() {
        return getListState();
    },

    handleClick() {
        this.setState({userInput:''})
        AppActions.addItem(this.refs.textInput.value);
    },

    handleChange(e) {
        this.setState({userInput:e.target.value})
    },

    _onChange() {
        this.setState(getListState);
    },

    handleItemClick(e) {
        console.log(e.target.innerHTML)

    },

    handleClickAlert(e) {
        this.setState({alertMsg: this.refs.textInput.value})
    },
    componentDidMount() {
        AppStore.addChangeListener(this._onChange);
    },
    render() {
        var lists = this.state.allLists
        var listHtml = lists.map((listItem, i) => {
            return <li key = {i} onClick={this.handleItemClick}>
                { listItem }
            </li>
        })
        return (
            <div className="main">
                <input type="text" ref="textInput" value={this.state.userInput} onChange={this.handleChange}/>
                <button onClick={this.handleClick}>点击</button>
                <button onClick={this.handleClickAlert}>弹窗</button>
                <div>{listHtml}</div>

                <div className="alert-box">
                    <div className="alert-box-inner"><span>{this.state.alertMsg}</span></div>
                </div>
            </div>
        )
    },


})