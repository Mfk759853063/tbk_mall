import axios from 'axios';

const Tbk = {
  getRecommendList(data = {}) {
    const params = Object.assign({
      pageIndex: 1,
      pageSize: 20,
    }, data);
    return axios.get('recommends', { params });
  },
};

export default Tbk;
