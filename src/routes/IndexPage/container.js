import mirror from 'mirrorx';

const container = mirror.model({
    name: "IndexPage",
    initialState: {
        hello:'world!!',
        bannerURL:[
            "http://via.placeholder.com/2000x500",
            "http://via.placeholder.com/2000x500",
            "http://via.placeholder.com/2000x500",
            "http://via.placeholder.com/2000x500",
        ]
    },
    reducers: {},
    effects: {},
});

export default container;