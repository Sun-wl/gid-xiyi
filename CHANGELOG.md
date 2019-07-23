gedit /home/test.pyChangelog
=========


1.2.0
-------------

### Features
* 分离APP和微信的页面
* 增加优惠券列表页
* 增加微信增加优惠券券导航
* 增加全局的调转函数 `window.gPush(path, {...})`
* Added `npm run wx` script 本地运行微信功能页面
* Added `npm run app` script 本地运行APP功能页面
* 增加微信支付mock实现  启动微信 mock服务 `npm run wx:mock`
* 增加APP的调用的mock实现 启动APP mock服务 `npm run app:mock`



1.1.0
-------------

### Features
* 增加优惠券功能
* Added `npm run dev:nw` script
* Added `npm run dev` script
* 增加 redux-cli blueprints
* 增加 toastr 实现


### Improvements
* js 文件（模块）按需加载
* Upgrades all React dependencies to v15.0.2
* Upgrade koa version to 2.0.0
* 国际化资源文件按需加载

1.0.0
-------------

### Features
* 微信下单
* 国际化支持
* 微信支付
* 高德地图支持
* 订单列表页
* 订单详情页
* init Project
