import axios from 'axios';

const Tbk = {
  getSearchList(data = {}) {
    const params = Object.assign({
      pagenumber: 1,
      pagesize: 20,
      q: '女装',
    }, data);
    console.log('查询', params);
    return axios.get('/tbk/search', { params });
  },
  convertTklLink(data = {}) {
    const params = Object.assign({
      link: '',
      pic: '',
    }, data);
    return axios.get('/tbk/converttkl', { params });
  },
};

export default Tbk;

