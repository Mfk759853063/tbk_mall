<template>
  <div class="container">
    <div class="header">
      <mt-header fixed title="为您推荐"></mt-header>
    </div>
    <!-- <div class="search">
      <mt-field  style="margin: 0% 10% 0% 10%;" placeholder="请在此粘贴你要分享的宝贝链接" v-model="searchValue" @blur.native.capture="checkSearchLink"></mt-field>
    </div> -->
    <div class="list-container"
          v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
      <div class="list">
        <div class="product" @click="handleProduct(item)" v-for="item in list" v-bind:key="item.pict_url">
          <div class="pic">
            <img :src="item.pict_url" alt="">
          </div>
          <div class="desc">
            <div class="title">{{ item.title }}</div>
            <div class="coupon-info">
              <div class="price redTitle">
                <div>{{`券后￥${item.zk_final_price}`}}</div>
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
                <div class="time">
                  {{`有效期:${item.coupon_end_time}`}}
                </div>
                <div class="sales">
                  {{`销量:${item.volume}`}}
                </div>
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

export default {
  data() {
    return {
      pageNumber: 0,
      loading: false,
      searchValue: '',
      list: [],
    };
  },
  methods: {
    async loadMore() {
      this.loading = true;
      this.pageNumber = this.pageNumber + 1;
      const params = {
        pagenumber: this.pageNumber,
        pagesize: 20,
      };
      if (this.$route.query.q) {
        params.q = this.$route.query.q;
      }
      if (this.$route.query.type) {
        params.type = this.$route.query.type;
      }
      const res = await TbkApi.getSearchList(params);
      console.log(res);
      const tmpList = res.tbk_dg_item_coupon_get_response.results.tbk_coupon;
      if (tmpList && tmpList.length) {
        this.list = this.list.concat(tmpList);
      }
      this.loading = false;
    },
    checkSearchLink() {
      console.log('搜索的内容是', this.searchValue);
    },
    handleProduct(item) {
      window.location.href = item.coupon_click_url;
    },
  },
  beforeMount() {
    console.log('参数', this.$route.query.q);
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

  .coupon-valitime {
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
</style>
