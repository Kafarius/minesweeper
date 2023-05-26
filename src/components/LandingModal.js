import React from 'react';
import ReactDOM from "react-dom/client";
import {createPortal} from "react-dom";
import Backdrop from "./Backdrop";
import Landing from "./Landing";


const LandingModal = () => {
    return (
        <React.Fragment>
            {createPortal(
                <Backdrop />,
                document.getElementById('backdrop-root')
            )}
            {createPortal(
                <Landing />,
                document.getElementById('landing-root')
            )}
        </React.Fragment>
    );
};

export default LandingModal;