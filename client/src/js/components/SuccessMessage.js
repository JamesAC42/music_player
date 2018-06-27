import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../css/SuccessMessage.css';

const mapStateToProps = (state, props) => ({
    modalVisible: state.view.successModal
});

export class SuccessMessageBind extends Component {
    render() {
        if(!this.props.modalVisible) return null;
        return(
            <div className="success-message">
                <div className="success-message-inner">
                    <img className="success-check" src="./icons/icons8-ok-240.png" alt="" />
                    <span id="success-message-text">Added</span>
                </div>
            </div>
        )
    }
}

const SuccessMessage = connect(
    mapStateToProps
)(SuccessMessageBind);

export { SuccessMessage as default }

