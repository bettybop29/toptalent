import { createStore } from "vuex";

export const store = createStore({
    state(){
        return{
            email:""
        }
    },
    mutations:{
        setEmail(state, value){
            state.email = value
        }
    }
});