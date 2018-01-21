import mirror, { actions, connect } from 'mirrorx';

const container = mirror.model({
    name: "IndexPage",
    initialState: {
        hello: 'world!!',
        isLoading:true,
        bannerURL: []
    },
    reducers: {
        save(state, data) {
            return { ...state, ...data }
        },
       
    },
    effects: {
        async getBannerURL(){
            actions.IndexPage.save({
                bannerURL: ["http://via.placeholder.com/2000x500",
                "http://via.placeholder.com/2000x500",
                "http://via.placeholder.com/2000x500",
                "http://via.placeholder.com/2000x500"]
            })
            actions.IndexPage.save({isLoading:false})
        }
    },
});


mirror.hook((action, getState) => {

    const { routing: { location } } = getState()

    if (action.type === "@@router/LOCATION_CHANGE" && location.pathname === '/') {
        console.log("进入首页")
        actions.IndexPage.getBannerURL()
    }
})


export default container;