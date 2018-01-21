import { actions } from 'mirrorx';

export default {
    name: "IndexPage",
    initialState: {
        hello: 'world!!',
        bannerURL: []
    },
    reducers: {
        save(state, data) {
            return { ...state, ...data }
        },
    },
    effects: {
        
    },
}