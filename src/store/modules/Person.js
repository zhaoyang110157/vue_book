const state ={
    isManager : false,
    isLogin :false,
    users: [
        {
            account: 'zhao',
            password: '123',
            allowed: true,
            role: 'manager'
        },
        {
            account: '123',
            password: '123',
            allowed: true,
            role:'custom'
        },
        {
            account: 'dump',
            password: '123',
            allowed: false,
            role:'custom'
        },
    ],
};

const mutations = {
    changeManager (state,is) {
        state.isManager = is;
    },
    changeLogin (state) {
        state.isLogin = !state.isLogin
    },
    addUser (state, user) {
        state.users.push(user)
    },
    changeAllow (state, index) {
        state.users[index].allowed = !state.users[index].allowed
    }
};

export default {
    namespaced: true,
    state,
    mutations
}