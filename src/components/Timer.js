import { useState } from 'react';
import classes from '../css/Timer.module.css';

const Timer = (props) => {
    

    return (
        <div className={classes.timer}>
            
            Your Time - {props.time} s
        </div>
    )
};
export default Timer;