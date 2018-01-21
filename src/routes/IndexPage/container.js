import mirror, { actions } from 'mirrorx';
import { loadBanner } from '../../services/indexPage';
import _ from "lodash";

const container = mirror.model({
    name: "IndexPage",
    initialState: {
        hello: 'world!!',
        isLoading: true,
        bannerURL: []
    },
    reducers: {
        save(state, data) {
            return { ...state, ...data }
        },

    },
    effects: {
        async getBannerURL() {
            let { data: { results } } = await loadBanner();
            results = _.groupBy(results, "name");
            let bannerURL = [];
            _.forEach(results,(elements)=>{
                elements = _.maxBy(elements, item => item.createdAt);
                bannerURL.push(elements.picture.url);
            })
            actions.IndexPage.save({
                bannerURL: bannerURL,
                isLoading: false
            });
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