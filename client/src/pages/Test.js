import React, { Component } from 'react';
import { connect } from 'react-redux';

import { testAction } from '../actions/testAction';

const mapStateToProps = state => ({
    test: state.test,
})

const mapDispatchToProps = dispatch => ({
    testAction: (payload) => dispatch(testAction(payload))
})

class Test extends Component {

    render () {
        return (
            <div>
                <pre>
                    {
                        JSON.stringify(this.props.test)
                    }
                </pre>
                <h1>
                    BLUE BASKET HELLO!!!!
                    TEST!
                </h1>
                <button onClick={() => this.props.testAction('result_of_test_action')}>Test redux action</button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)
