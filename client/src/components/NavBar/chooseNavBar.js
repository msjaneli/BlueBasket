import React from 'react';

// Components
import NavBarStandard from './NavBarStandard';
import NavBarUser from './NavBarUser';

const chooseNavbar = (user, authenticated) => {
    if (!authenticated) {
        return(<NavBarStandard/>);
    } else if (user.type === "USER") {
        return(<NavBarUser name = {user.name.split(" ")[0]}/>);
    } else {
        // Need restaurant nav bar
        return(<div></div>);
    }
}

export default chooseNavbar;
