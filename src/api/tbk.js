import axios from 'axios';

const Tbk = {
  getSearchList(data = {}) {
    const params = Object.assign({
      pagenumber: 1,
      pagesize: 20,
      q: '女装',
    }, data);
    console.log('查询', params);
    if (!params.type) {
      return axios.get('/tbk/search', { params });
    } else {
      return axios.get('/wx/searchGoods/echo', { params });
    }
  },
  convertTklLink(data = {}) {
    const params = Object.assign({
      link: '',
      pic: '',
      couponinfo: '暂无优惠券',
    }, data);
    if (!params.type) {
      return axios.get('/tbk/converttkl', { params });
    } else {
      return axios.get('/wx/convertktl/echo', { params });
    }
  },
};

export default Tbk;

