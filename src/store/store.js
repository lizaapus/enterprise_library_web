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
    async setModeList(state,ref){
      const result = await ref.$http.get('/api/modeData');
      state.modeList = result.Data;
    },

    async setCompanyList(state, ref) {
      try {
        state.selectedSection = '';
        state.selectedMode = '';
        this.commit('setData',ref);
      } catch (err) {
        alert(err);
      }

    },
    async setCompanySectionList(state, data) {
      state.selectedSection = data.sectionName;
      state.selectedMode = '';
      this.commit('setData',data.ref);
    },
    setCompanyModeList(state, data) {
      state.selectedSection = '';
      state.selectedMode = data.modeName;
      this.commit('setData',data.ref);
    },

    async setData(state,ref){
      const numb = await ref.$http.get('/api/getCompanyListTotalNumb', {
        params: {
          sectionName: state.selectedSection,
          modeName: state.selectedMode,
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
          startIndex: state.startIndex,
          endIndex: state.endIndex
        }
      });
      state.companyList = result.Data;
    },
    //改变pagesize
   async handleSizeChange(state, data) {
      //alert(data.val);
      state.pageSize = data.val;
      state.startIndex = (state.currentPage - 1) * state.pageSize;
      state.endIndex = state.currentPage * state.pageSize;
      
      const result = await data.ref.$http.get("/api/getCompanyList", {
        params: {
          sectionName: state.selectedSection,
          modeName: state.selectedMode,
          startIndex: state.startIndex,
          endIndex: state.endIndex
        }
      });
      state.companyList = result.Data;
    },
    //翻页
   async handleCurrentChange(state, data) {
      //alert(data.val);
      state.items = [];
      state.currentPage = data.val;
      let index = data.val*state.pageSize;
      state.startIndex = (data.val - 1) * state.pageSize;
      state.endIndex =index>state.totalItemNum?state.totalItemNum:index;
      
      // alert(state.startIndex);
      // alert(state.endIndex);

      const result = await data.ref.$http.get("/api/getCompanyList", {
        params: {
          sectionName: state.selectedSection,
          modeName: state.selectedMode,
          startIndex: state.startIndex,
          endIndex: state.endIndex
        }
      });
      state.companyList = result.Data;
    },
  },
  actions: {}
})