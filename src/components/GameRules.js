import React from 'react';
import classes from '../css/GameRules.module.css'
import mouseLeft from '../img/mouse_left.png'

const GameRules = () => {
    return (
        <div className={classes.main}>
            <h3>Game Rules</h3>
            <p>Welcome to Minesweeper, game where you must be as fast as faultless.</p>
            <p>Please read the following rules of the game carefully.</p>
            <ol>
                <li><p>Your Goal: Finishing game, by marking all bombs positions (15) and revealing all tiles, as fast as you can.</p></li>
                <li>
                    <p>
                        Each tile has a number, which describes how many bombs is in it's nearest area - 1 tile range.
                        You will see the number after revealing the tile with left mouse button
                        <img className={classes.mouseimg} src={require('../img/mouse_left.png')}/>
                    </p>

                    <p>
                        Unless it's a bomb (X), then you are dead and game is over...
                    </p>
                </li>
                <li><p>When you suspect that tile is a bomb, mark it with right mouse button
                    <img className={classes.mouseimg} src={require('../img/mouse_right.png')}/></p></li>
                <li><p>Remember that you can always unmark a tile, it's not a shame to change your mind. If so, press right mouse button on marked tile.</p></li>
                <li><p>And remember, time is running since first reveal! :) </p></li>
            </ol>
            <p className={classes.gl}>Good Luck!</p>

        </div>
    );
};

export default GameRules;