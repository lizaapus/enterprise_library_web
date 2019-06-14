import Vue from 'vue'
import Vuex from 'vuex'
import {
    stat
} from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modeList: new Array(),
        sectionList: new Array(),
        companyList: new Array(),
        companyName: '',
        selectedSection: '',
        selectedMode: '',
        selectedItem: {},
        searchDic: new Array(), //查询条件
        pageSizes: [5, 10, 15, 20],
        pageSize: 5,
        totalItemNum: 0,
        currentPage: 1,
        startIndex: 0,
        endIndex: 0,

    },
    mutations: {
        async setSectionList(state, ref) {
            const result = await ref.$http.get("/api/sectionData");
            state.sectionList = result.Data;
        },
        async setModeList(state, ref) {
            const result = await ref.$http.get('/api/modeData');
            state.modeList = result.Data;
        },

        addSearchDic(state, data) {
            let flag = false;
            for (var key in state.searchDic) {
                if (state.searchDic[key].name == data.key) {
                    state.searchDic[key].value = data.value;
                    flag = true;
                    break;
                }
            }
            if (!flag)
                state.searchDic.push({
                    name: data.key,
                    value: data.value
                });
        },
        delSearchDic(state, data) {
            alert("enter");
            let index = 0;
            for (var key in state.searchDic) {
                if (state.searchDic[key].name == data.data.name) {
                    break;
                }
                index++;
            }

            if (data.data.name == 'modeName')
                state.selectedMode = '';
            if (data.data.name == 'sectionName')
                state.selectedSection = '';
            state.searchDic.splice(index, 1);
            //重新检索数据
            this.commit('setData', data.ref);
        },

        async setCompanyList(state, data) {
            try {
                let path = data.path.replace("/", "");;
                if (path == '') {
                    state.selectedSection = '';
                    state.selectedMode = '';
                } else {
                    if (state.modeList.length == 0) {
                        this.commit('setModeList', data.ref);
                        this.commit('setSectionList', data.ref);
                    }
                    let tempArray = state.modeList.filter(mode => mode.path == path);

                    if (tempArray.length > 0) {
                        state.selectedSection = '';
                        state.selectedMode = tempArray[0].modeName;
                    } else {
                        tempArray = state.sectionList.filter(section => section.path == path);
                        state.selectedSection = tempArray[0].sectionName;
                        state.selectedMode = '';
                    }
                }
                this.commit('setData', data.ref);
            } catch (err) {
                alert(err);
            }
        },

        setSectionlist(state, data) {
            if (state.modeList.length == 0) {
                this.commit('setModeList', data.ref);
                this.commit('setSectionList', data.ref);
            }
            let tempArray = state.modeList.filter(mode => mode.modeName == path);

            if (tempArray.length > 0) {
                state.selectedSection = '';
                state.selectedMode = tempArray[0].modeName;
            } else {
                tempArray = state.sectionList.filter(section => section.sectionName == path);
                state.selectedSection = tempArray[0].sectionName;
                state.selectedMode = '';
            }
        },

        setSelectedItem(state, data) {
            state.selectedItem = data;
        },

        async setCompanySectionList(state, data) {
            state.selectedSection = data.sectionName;
            this.commit('setData', data.ref);
        },
        setCompanyModeList(state, data) {
            state.selectedMode = data.modeName;
            this.commit('setData', data.ref);
        },

        async setData(state, ref) {
            const numb = await ref.$http.get('/api/getCompanyListTotalNumb', {
                params: {
                    sectionName: state.selectedSection,
                    modeName: state.selectedMode,
                    companyName: state.companyName,
                }
            });
            state.totalItemNum = numb.length;
            state.currentPage = 1;
            state.startIndex = 0;
            state.endIndex = state.totalItemNum < state.pageSize ? state.totalItemNum : state.pageSize;
            const result = await ref.$http.get("/api/getCompanyList", {
                params: {
                    sectionName: state.selectedSection,
                    modeName: state.selectedMode,
                    companyName: state.companyName,
                    startIndex: state.startIndex,
                    endIndex: state.endIndex,
                }
            });
            state.companyList = result.Data;
        },
        async setData2(state, ref) {
            const result = await ref.$http.get("/api/getCompanyList", {
                params: {
                    sectionName: state.selectedSection,
                    modeName: state.selectedMode,
                    companyName: state.companyName,
                    startIndex: state.startIndex,
                    endIndex: state.endIndex,
                }
            });

            console.log(result.Data);
            state.companyList = result.Data;
        },


        //改变pagesize
        async handleSizeChange(state, data) {
            state.pageSize = data.val;
            state.startIndex = (state.currentPage - 1) * state.pageSize;
            state.endIndex = state.currentPage * state.pageSize;
            const result = await data.ref.$http.get("/api/getCompanyList", {
                params: {
                    sectionName: state.selectedSection,
                    modeName: state.selectedMode,
                    companyName: state.companyName,
                    startIndex: state.startIndex,
                    endIndex: state.endIndex
                }
            });
            state.companyList = result.Data;
        },
        //翻页
        async handleCurrentChange(state, data) {
            state.items = [];
            state.currentPage = data.val;
            let index = data.val * state.pageSize;
            state.startIndex = (data.val - 1) * state.pageSize;
            state.endIndex = index > state.totalItemNum ? state.totalItemNum : index;

            const result = await data.ref.$http.get("/api/getCompanyList", {
                params: {
                    sectionName: state.selectedSection,
                    modeName: state.selectedMode,
                    companyName: state.companyName,
                    startIndex: state.startIndex,
                    endIndex: state.endIndex
                }
            });
            state.companyList = result.Data;
        },
    },
    actions: {}
})