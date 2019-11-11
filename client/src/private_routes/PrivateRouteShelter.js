import React from 'react';
import { Route, Redirect } from 'react-router';

const PrivateRouteUser = ({ component, exact = false, path, authenticated, type }) => {

    const authenticatedUser = authenticated && type === 'SHELTER';

    return (<Route
        exact = {exact}
        path = {path}
        render = {props => (
            authenticatedUser ? (
                React.createElement(component, props)
            ) : (
                <Redirect to = {{
                    pathname:'/login/shelter',
                    state: {from: props.location},
                }}/>
            )
        )}
    />);
};

export default PrivateRouteUser;
