import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        userNotification: {
            status: '',
            title: '',
            message: '',
        },
        userFormVisible: true,
        users: [],
        totalUsers: 0,
        username: null,
        changed: false,
    },
    reducers: {
        showUserNotification(state, action){
            state.userNotification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            };
        },
        // hideUserNotification(state){
        //     state.userNotification = null;
        // },
        hideUserForm(state) {
            state.userFormVisible = false;
        },
        addUser(state, action){
            const newUser = action.payload;
            const usernames = [];
            [...state.users].map((user) => {
                return usernames.push(user.username)
            })
            const existingUser = usernames.includes(newUser.username);
            if(existingUser){
                state.userNotification = {
                    status: 'Error',
                    title: 'Username unavailable',
                    message: 'Username is already taken. Try another one.',
                };
            } else {
                state.users = [...state.users, {
                        username: newUser.username,
                        password: newUser.password,
                        time: newUser.time,
                        }
                ]
                state.userNotification = {
                    status: 'Success',
                    title: 'Registration successful',
                    message: 'Account has been created.',
                };
                state.totalUsers++;
                state.changed = true;
                state.username = newUser.username;
            }
        },
        loginUser(state, action){
            const loggingUser = action.payload;
            if (state.users.length === 0) {
                state.userNotification = {
                    status: 'Error',
                    title: 'Logging failed',
                    message: 'Wrong username or password, try again...',
                };
            }
            for(const user of state.users) {
                if (user.username === loggingUser.username && user.password === loggingUser.password) {
                    state.userNotification = {
                        status: 'Success',
                        title: 'Logging successful',
                        message: 'Welcome back Player!',
                    };
                    state.username = loggingUser.username;
                    break;
                } else {
                    state.userNotification = {
                        status: 'Error',
                        title: 'Logging failed',
                        message: 'Wrong username or password, try again...',
                    };
                }
            }
        },
        saveScore(state, action) {
            const username = action.payload.username;
            const time = action.payload.time;
            state.users.map((user) => {
                if (user.username === username) {
                    if (user.time > time || !user.time) {
                        user.time = time;
                        state.changed = true;
                    }
                }
            });
        },
        sortUsers(state){
            state.users.sort((a,b) => a.time - b.time );
        },
        replaceUsers(state, action){
            state.totalUsers = action.payload.totalUsers;
            state.users = action.payload.users;
        },
    }
})

export const userActions = userSlice.actions;

export default userSlice;