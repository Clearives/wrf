import React from 'react'
import AppActions from '../actions/AppActions'
import AppStore from '../stores/AppStore'
import '../../css/main.scss'

export default React.createClass({
    handleClick:function(){
        AppActions.addItem('this is the item');
    },
    render:function(){
        return (
            <div className="wrapper">
                <h3 onClick={this.handleClick}>Click this Title, then check console</h3>
                <ul></ul>
            </div>
        )
    }
});

