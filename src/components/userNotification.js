import classes from '../css/UserNotification.module.css';
import {useSelector} from "react-redux";

const UserNotification = (props) => {
    const notification = useSelector((state) => state.user.userNotification);
    const status = notification.status
    let statusClass = '';

    if (status === 'Error') {
        statusClass = classes.error;
    }
    if (status === 'Success') {
        statusClass = classes.success;
    }
    // if (props.status === 'pending') {
    //     statusClass = classes.pending;
    // }

    const cssClasses = `${classes.userNotification} ${statusClass}`;

    return (
        <section className={cssClasses}>
            <h5>{notification.title}</h5>
            <p>{notification.message}</p>
        </section>
    )
};

export default UserNotification;