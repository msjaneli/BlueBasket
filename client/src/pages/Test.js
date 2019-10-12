import React, { Component } from 'react';
import { connect } from 'react-redux';

import { testAction } from '../actions/testAction';

const mapStateToProps = state => ({
    storeState: state,
})

const mapDispatchToProps = dispatch => ({
    testAction: () => dispatch(testAction())
})

class Test extends Component {

    testAction = () => {
        this.props.testAction('result_of_test_action');
    }

    render () {
        return (
            <div>
                <pre>
                    {
                        JSON.stringify(this.props.storeState)
                    }
                </pre>
                <h1>
                    BLUE BASKET HELLO!!!!
                    TEST!
                </h1>
                <button onClick={this.props.testAction}>Test redux action</button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)
