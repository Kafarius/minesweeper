import React, {useEffect} from 'react';
import classes from "../css/Scores.module.css";
import {useSelector} from "react-redux";

const Scores = () => {
    const users = useSelector((state) => state.user.users);
    const username = useSelector((state) => state.user.users);
    const sortedUsers = [...users].sort((a, b) => a.time - b.time );


    return (
        <div className={classes.scores}>
            <h3>Scoreboard:</h3>
            {
                sortedUsers.map((user) => (
                    <div key={user.username} className={ classes.score}>
                        {user.username} - {user.time ? user.time + ' s' : 'not played yet'}
                    </div>
                ))
            }
        </div>
    );
};

export default Scores;