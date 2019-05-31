<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="getData">点击</button>
    <div>
      <ul>
        <p>所在地：</p>
        <li v-for="item in $store.state.sectionList">
          <span v-text="item.sectionName"></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },

  async created() {
    try {
      //const result = await this.$http.get("/api/sectionData");
      this.$store.commit("setSectionList", this);
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async getData() {
      this.$store.commit("setCompanyList", []);
    }
  }
};
</script>

