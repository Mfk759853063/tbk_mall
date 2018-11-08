<template>
  <div class="container">
    <div class="header">
      <mt-header fixed title="淘淘淘"></mt-header>
    </div>
    <div class="list-container">
      <div class="list">
        <div class="product" v-for="item in list" v-bind:key="item.num_iid">
          <div class="pic">
            <img :src="item.pict_url" alt="">
          </div>
          <div class="desc">
            <div class="title">{{ item.title }}</div>
            <div class="coupon-info">
              <div class="coupon-title">{{item.coupon_info}}</div>
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
              <div class="coupon-valitime">
                {{`有效期:${item.coupon_end_time}`}}
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

export default {
  data() {
    return {
      pageNumber: 1,
      loading: false,
      searchValue: '',
      list: [],
    };
  },
  methods: {
    async loadList() {
      this.loading = true;
      const params = {
        pageNubmer: this.pageNubmer,
        pageSize: 10,
      };
      const res = await TbkApi.getRecommendList(params);
      const tmpList = res.tbk_dg_item_coupon_get_response.results.tbk_coupon;
      if (tmpList && tmpList.length) {
        this.list = tmpList;
      }
      this.loading = false;
    },
  },
  beforeMount() {
    this.loadList();
  },
};
</script>

<style scoped>

  .container {
    height: 100%;
  }

  .header {
    height: 40px;
  }

  .list-container {
    height: calc(100% - 40px);
    overflow: auto;
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
    height: calc(50vw * 1.5);
    border: 2px solid #eee;
    box-sizing: border-box;
  }

  .product .pic {
    width: 100%;
    height: 70%;
    overflow: hidden;
  }
  .product .pic img {
    width: 100%;
  }

  .desc {
    font-size: 11px;
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

  .coupon-number {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .coupon-remain, .coupon-total {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .coupon-red {
    font-size: 15px;
    font-weight: bold;
    font-style: italic;
    color: red;
  }

  .coupon-gay {
    font-size: 15px;
    font-weight: bold;
    font-style: italic;
    color: gray;
  }
  .coupon-valitime {
    color: red;
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
