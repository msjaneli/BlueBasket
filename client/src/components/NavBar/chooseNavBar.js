import React from 'react';
import NavBarStandard from './NavBarStandard';
import NavBarUser from './NavBarUser';
import { connect } from 'react-redux';

const chooseNavbar = (user, authenticated, type) => {
    if (!authenticated) {
        return(<NavBarStandard/>);
    } else if (type === "USER") {
        return(<NavBarUser name = {user.name.split(" ")[0]}/>);
    } else {
        // Need restaurant nav bar
        return(<div></div>);
    }
}

export default chooseNavbar;
