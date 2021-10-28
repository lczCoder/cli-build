const { default: axios } = require("axios");
const axis = require("axios");

axios.interceptors.response.use((res) => {
  return res.data;
});

// 获取模板
async function getRepoList() {
  return axios.get("https://api.github.com/orgs/zhurong-cli/repos");
}

// 获取版本

async function getTagList(repo) {
  return axios.get(`https://api.github.com/repos/zhurong-cli/${repo}/tags`);
}

module.exports = {
  getRepoList,
  getTagList,
};
