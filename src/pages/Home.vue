<template>
  <div class="container">
    <div class="header">
      <mt-header fixed title="淘淘淘"></mt-header>
    </div>
    <div class="search">
      <mt-field  style="margin: 0% 10% 0% 10%;" placeholder="请在此粘贴你要分享的宝贝链接" v-model="searchValue" @blur.native.capture="checkSearchLink"></mt-field>
    </div>
    <div class="list-container"
          v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
      <div class="list">
        <div class="product" data-clipboard-text="copyValue" @click="handleProduct(item)" v-for="item in list" v-bind:key="item.pict_url">
          <div class="pic">
            <img :src="item.pict_url" alt="">
          </div>
          <div class="desc">
            <div class="title">{{ item.title }}</div>
            <div class="coupon-info">
              <div class="price redTitle">
                <div>{{`￥${item.zk_final_price}`}}</div>
                <div class="coupon-title">{{item.coupon_info}}</div>
              </div>
              <div class="coupon-number">
                  <div class="coupon-remain">
                      <div>券还剩</div>
                      <span class="coupon-red">{{item.coupon_remain_count}}</span>
                      <div>张</div>
                  </div>
                  <div class="coupon-total">
                      <span>共</span>
                      <span class="coupon-gay">{{item.coupon_total_count}}</span>
                      <span>张</span>
                  </div>
              </div>
              <div class="coupon-valitime redTitle">
                {{`有效期:${item.coupon_end_time}`}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="loadmore" v-show="loading">加载更多</div>
    </div>
  </div>
</template>

<script>

import TbkApi from '@/api/tbk';
import Clipboard from 'clipboard';

export default {
  data() {
    return {
      pageNumber: 0,
      loading: false,
      searchValue: '',
      copyValue: '',
      list: [],
    };
  },
  methods: {
    async loadList() {
      this.loading = true;
      const params = {
        pageNumber: this.pageNumber,
        pageSize: 20,
      };
      const res = await TbkApi.getRecommendList(params);
      this.loading = false;
      const tmpList = res.tbk_dg_item_coupon_get_response.results.tbk_coupon;
      if (tmpList && tmpList.length) {
        this.list = this.list.concat(tmpList);
      }
    },
    loadMore() {
      this.pageNumber = this.pageNumber + 1;
      this.loadList();
    },
    checkSearchLink() {
      console.log('搜索的内容是', this.searchValue);
    },
    handleProduct(item) {
      this.copyValue = item.coupon_click_url;
      const clipboard = new Clipboard('.product', {
        text: trigger => this.copyValue,
      });
      clipboard.on('success', (e) => {
        window.location.href = this.copyValue;
        clipboard.destroy();
      });
      clipboard.on('error', (e) => {
        alert('该浏览器不支持自动复制');
        window.location.href = this.copyValue;
        clipboard.destroy();
      });
    },
  },
  beforeMount() {
    // this.loadList();
  },
};
</script>

<style scoped>

  .redTitle {
    color: red;
  }

  .container {
    height: 100%;
  }

  .header {
    height: 40px;
  }

  .search {
    width: 100%;
    height: 48px;
  }

  .list-container {
    height: calc(100% - 40px - 48px);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
  .loadmore {
    text-align: center;
  }
  .product {
    width: 50%;
    /* height: calc(50vw * 1.7); */
    border: 2px solid #eee;
    box-sizing: border-box;
  }

  .product .pic {
    width: 100%;
    height: 200px;
    overflow: hidden;
  }
  .product .pic img {
    width: 100%;
    height: 100%;
  }

  .desc {
    font-size: 11px;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .desc .title {
    font-size: 13px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .coupon-info {
    display: flex;
    flex-direction: column;
  }

  .price {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .coupon-number {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .coupon-remain, .coupon-total {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .coupon-gay {
    /* font-size: 15px; */
    /* font-weight: bold;
    font-style: italic; */
    color: gray;
  }
  /* .coupon {
    display: flex;
    flex-direction: column;
    font-size: 11px;
  }

  .coupon .coupon-title {
    color: orange;
  }

  .coupon .coupon-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .coupon-info .coupon-total {
    color: darkgray;
  }

  .coupon .coupon-special {
    display: flex;
    flex-direction: row;
  }

  .coupon .coupon-number {
    font-size: 15px;
    font-weight: bold;
    font-style: italic;
    color: red;
  } */
</style>

