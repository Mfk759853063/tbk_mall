import axios from 'axios';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

const Http = {
  init() {
    /**
     * 显示错误提示
     */
    let noticeMessage;
    function showError(desc) {
      if (noticeMessage) { // 控制ajax错误提示信息只显示一个
        return;
      }
      noticeMessage = desc;
      MintUI.Toast({
        message: desc,
        position: 'bottom',
        duration: 2000,
      });
    }

    // request interceptor
    axios.interceptors.request.use((config) => {
      // 解决ajax缓存
      const delimiter = config.url.indexOf('?') !== -1 ? '&' : '?';
      config.url += `${delimiter}_d=${Date.now()}`;
      return config;
    }, (error) => {
      showError('请求失败，网络状况不佳');
      return Promise.reject(error);
    });

    // response interceptor
    axios.interceptors.response.use((response) => {
      response.data.status = parseInt(response.data.status, 10);

      if (response.status === 200) {
        return response.data; // 正常返回数据
      }
      return null;
    }, (error) => {
      const status = error.response.status;
      showError(status === 500 ? '服务处理请求失败！' : '请求失败，网络状况不佳');
      return Promise.reject(error);
    });
  },
};

export default Http;
