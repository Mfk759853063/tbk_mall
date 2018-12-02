import axios from 'axios';

const Tbk = {
  getRecommendList(data = {}) {
    const params = Object.assign({
      pageNumber: 1,
      pageSize: 20,
    }, data);
    return axios.get('tbk/recommends', { params });
  },
};

export default Tbk;

