import { userActions } from "./user-slice";

export const fetchUsersData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'https://minesweeper-e6b6c-default-rtdb.europe-west1.firebasedatabase.app/users.json'
            );
            if(!response.ok){throw new Error('Fetching data failed!')}
            const data = await response.json();
            // console.log(data)
            return data;
        }
        try {
            const usersData = await fetchData();
            if(!usersData.users){
                usersData.users = [];
            }
            // if(usersData.users === undefined){
            //     usersData.users = [];
            // }
            dispatch(userActions.replaceUsers(usersData));
        } catch (error) {
            console.log(error.message);
            // some scoreboard notification will appear here in the future...
            // dispatch(
            //     uiActions.showNotification({
            //         status: "error",
            //         title: "Error!",
            //         message: "Fetching cart data failed!",
            //     })
        }
    }
}
export const sendUsersData = (users) => {
    return async (dispatch) => {
        // dispatch(
        //     uiActions.showNotification({
        //         status: 'pending',
        //         title: 'Sending...',
        //         message: 'Sending cart data!',
        //     })
        // );
        console.log('sending users data...');
        const sendRequest = async () => {
            const response  = await fetch('https://minesweeper-e6b6c-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
                method: 'PUT',
                body: JSON.stringify(users),
            })
            if(!response.ok){
                throw new Error('Sending users data failed!');
            }
        }
        try {
            await sendRequest();
            console.log('Data users was sent successfully!')
            // dispatch(
            //     uiActions.showNotification({
            //         status: "success",
            //         title: "Success!",
            //         message: "Data cart was sent successfully!",
            //     })
            // );
        } catch (error) {
            console.log('Sending users data failed!')
            // dispatch(
            //     uiActions.showNotification({
            //         status: "error",
            //         title: "Error!",
            //         message: "Sending cart data failed!",
            //     })
            // )};
        }
    }

};