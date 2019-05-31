import Vue from 'vue'
import Vuex from 'vuex'
import {
  stat
} from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modeList: [],
    sectionList: [],

    companyList: [],
    selectedSection: '',
    selectedMode: '',
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
    async setCompanyList(state, ref) {
      try {
        const numb = await ref.$http.get('/api/getCompanyListTotalNumb', {
          params: {
            sectionName: '',
            modeName: ''
          }
        });

        state.totalItemNum = numb.length;
        state.startIndex = 0;
        state.endIndex = state.totalItemNum < state.pageSize ? state.totalItemNum : state.pageSize;

        const result = await ref.$http.get("/api/getCompanyList", {
          params: {
            startIndex: state.startIndex,
            endIndex: state.endIndex
          }
        });

        state.companyList = result.Data;
        state.totalItemNum = result.totalNumb;
        state.currentPage = 1;
      } catch (err) {
        alert(err);
      }

    },
    async setCompanySectionList(state, data) {
      state.selectedSection = data;
      state.selectedMode = '';
      state.currentPage = 1;
      const result = await this.$http.get("/api/getCompanyListBySection", {
        sectionName: data
      });
      state.sectionList = result.Data;
      state.totalItemNum = totalNumb;
    },
    setCompanyModeList(state, modeName) {
      state.selectedSection = modeName;
      state.selectedMode = '';
      state.currentPage = 1;
      const result = this.$http.get("/api/getCompanyList", {
        sectionName: data,
        modeName: '',
        startIndex: 1,
        endIndex: state.pageSize
      });
      state.sectionList = result.Data;


      state.modeList = data;
    },
    //改变pagesize
    handleSizeChange(state, val) {
      state.pageSize = val;
      state.companyList = [];
      state.startIndex = (state.currentPage - 1) * state.pageSize;
      state.endIndex = state.currentPage * state.pageSize;
      //   const result = await this.$http.get("/api/getCompanyListBySection",{sectionName:data,modeName:'',
      //   startIndex:1,
      //   endIndex:state.pageSize});
      // state.sectionList = result;
      // if (endIndex > this.totalItemNum) endIndex = this.totalItemNum;
      // for (var i = startIndex; i < endIndex; i++) {
      //   this.items.push(this.Totalitems[i]);
      // }
    },
    //翻页
    handleCurrentChange(state, val) {
      state.items = [];
      state.startIndex = (val - 1) * this.pageSize;
      state.endIndex = val * this.pageSize;
      if (state.endIndex > this.totalItemNum)
        state.endIndex = state.totalItemNum;
      // for (var i = state.startIndex; i < state.endIndex; i++) {
      //   this.items.push(this.Totalitems[i]);
      // }
      state.currentPage = val;
    },
  },
  actions: {}
})