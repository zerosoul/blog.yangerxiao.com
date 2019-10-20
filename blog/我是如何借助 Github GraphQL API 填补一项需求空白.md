---
slug: "awesome-github-graphql-api"
cover: "/images/github.api.jpg"
date: "2019-10-19 17:31:37"
category: "技术"
tags:
  - github
  - graphql
  - 工具
---

![awesome github api](/images/github.api.jpg)

# 背景

GitHub 目前不能统计查看一个仓库每日新增多少 star，找了几个第三方工具，也没有这样的功能。为了满足我的小需求，这两天做了个小工具，输入仓库地址，就可以方便地以图表方式展现出来，还可以生成并下载图片。

![awesome github image generator](/images/github.star.tool.png)

[体验地址](https://stars.yangerxiao.com/?repo=https://github.com/zerosoul/chinese-colors)

当然，如果 star 数过大，超过 10k，生成最终图表会略慢，因为 github 接口是分页调取的，每次最多只能拉取 100 条数据，而且接口有限额，~~每天有 5k 次调用~~好像很快就能重置回 5k😀。对我个人用，足够了。

# 初衷

这篇文章记录下我在做这个工具过程中遇到的一些问题和注意事项，尤其是 GitHub GraphQL API 的使用问题，网上有关这方面的经验分享比较少，所以写下来，方便感兴趣的开发人员参考。

# 前提&注意

- 工具使用 React 构建，并且大量地，深度地使用了 react hooks，所以对[React.js](https://reactjs.org)有所要求
- 对 GraphQL 有个基本认知，读一遍[官网文档](https://graphql.org)，足够了
- 文章使用[apollo](https://apollographql.com/docs/react/)来实践 GraphQL 操作
- 本文不太适合小白，一些知识点我会列出参考链接，但是不会详细解释

# 分享

## 遇到的坑

### GitHub Token 问题

GitHub 有个非常棒的在线[GraphQL 查询工具](https://developer.github.com/v4/explorer/)，如果自己定制化使用 GitHub API，是需要走 token 认证后，才能正常使用。所以首先，我得[在此生成](https://github.com/settings/tokens)一个 token。由于是第一次使用 GitHub API，所以也读了下[官网文档](https://developer.github.com/v4/guides/forming-calls/#authenticating-with-graphql)，大概知道 token 怎样的一个使用流程。

有了 token，就可以开始愉快地使用 API 了。 一开始为了快速看到效果，我把 token 写死在了代码里，本地开发没问题，可是一旦上传到 GitHub，走部署流程，就发现 token 已经失效了。来回折腾了两三次，一开始我还以为 GitHub 出问题了，虽然我知道 token 肯定不能写死在代码里，这是常识，但我想搞清楚是哪个环节出问题了。查来查去，原来 GitHub 能自动识别代码里有没有 token，有则强制让该 token 失效。所以，还是老老实实地把 token 放在了配置文件里，`.env.development.local`，走 CRA 的打包流程，这个问题算是解决了。

### 分页获取 star

GitHub API V4，也就是 GraphQL 版本，一开始我是寄希望于有能一次性获取代码仓库所有的 star 详细列表数据的接口，找了一番没找到，想想也很正常：如果过一个项目 star 数目过多，一次性的操作就有点重了。分页获取是比较合理的，所以如果想得到所有的 star 详细数据，就得不断去分页调取数据，直至最后一页。

那么问题又来了，GraphQL 如何实现分页依次获取 star 数据。这个在 REST 风格的 API 里可能好实现一些，思路无非就是递归调用分页接口，到最后一页，结束调用。

#### 获取分页数据的 GraphQL 语句

```graphql
query GetStars($name: String!, $owner: String!, $after: String) {
  repository(name: $name, owner: $owner) {
    createdAt
    stargazers(first: 100, after: $after) {
      edges {
        node {
          id
          login
          name
          avatarUrl
        }
        starredAt
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
}
```

GraphQL 如何做递归调用？这种需求还是比较常见的，一般在开发文档里就能找到一些解决的思路。既然使用的是 apollo，就去文档里翻一翻，果然找到了对口的 API：[useLazyQuery](https://www.apollographql.com/docs/react/api/react-hooks/#uselazyquery)。

> The useLazyQuery hook is perfect for executing queries in response to events other than component rendering. This hook acts just like useQuery, with one key exception: when useLazyQuery is called, it does not immediately execute its associated query. Instead, it returns a function in its result tuple that you can call whenever you're ready to execute the query.

大意就是 useLazyQuery 可以通过数组解构方式拿到一个触发 GraphQL 请求的函数，放在合适的时机去调用，非常灵活。有了它，我们就可以实现递归调用了：

```js
  // 方便理解，去掉了无关逻辑，贴出核心代码
  const [loadStars, { called, data: pageData, variables, error }] = useLazyQuery(GetStars);
  // ...
  useEffect(() => {
    const { stargazers } = pageData.repository;
    const { edges, totalCount } = stargazers;
    const { hasNextPage, endCursor } = stargazers.pageInfo;
    // 至此数据拿到了，处理下，然后返回
      return { ...oldData, ...tmpObj, total: totalCount };
    });
    // 还有下一页，继续调用 loadStars
    if (hasNextPage) {
      loadStars({
        variables: {
          ...variables,
          after: endCursor
        }
      });
    } else {
      setFinished(true);
    }
    // ...
  }, [pageData, loadStars, called, variables]);
```

这样就可以使用 GraphQL 的方式，递归调用分页数据，直至拿到一个仓库的所有 star 数据了 😃。

## 工具分享

在开发这个工具中，除了 GitHub GraphQL API 之外，我还使用了一些非常优秀的第三方工具包，也是日常工作中经常用的，在此分享一下：

### [react-apollo](https://apollographql.com/docs/react/)

GraphQL 概念的最佳实践，新版本提供各种 hooks，用起来爽的飞起。也有对应的 server 实现，以前在公司做过一个全栈项目，同样真香推荐。

### [Recharts](http://recharts.org)

一个 react 版本的 SVG 图表类库，可以组合式地使用各种各样的图表类型，我觉得 recharts 把 react 开发理念做到了极致，所有的东西都是组件，而且可以很方便地组合使用，组合大于继承的忠实践行者。

### [styled-components](https://styled-components.com)

[`CSS-IN-JS`](https://mxstbr.com/thoughts/css-in-js/)概念的最佳实践，现在写样式，我基本就依赖这种方式了。

### [antd](https://ant.design)

这个相信很多人都不陌生，虽然我对国内技术产出有所警觉，能不用则不用。但是，阿里出品的这个 UI 类库，必须得真香推荐了。如果想快速高效，同时也不降低 UX 来构建站点界面，antd 是我的首选。

# 经验总结

最近这一个月，林林总总，做了七八个感兴趣的小项目。

- 没啥卵用的[超强密码生成器](https://github.com/zerosoul/strong-password-generator)
- 纯粹拿来练手的[迷你倒计时器](https://github.com/zerosoul/mini-stopwatch)，
- 同样没啥卵用，但还算有点意思的[技术图标连连看](https://github.com/zerosoul/tech-logo-memo-game)
- 出于自己健身需求的[略奇葩的激励 WebApp](https://github.com/zerosoul/oh-my-goal)
- 还有就是这篇文章所记录的真正有点卵用的[GitHub star 统计工具](https://github.com/zerosoul/github-star-stats)
- 后来又随即做了一个[GitHub 分享图在线生成工具](https://github.com/zerosoul/github-social-image-generator)
- 小火了一把的[满满中国风的中国古典颜色手册](https://github.com/zerosoul/chinese-colors)

全部列表都放在了[这儿](https://yangerxiao.com/works)。如果谈经验总结，方方面面，可以专门开辟一篇文章来讲。所以就简单说几句感想，算是为下篇文章做个预告：

- 始于想法，忠于需求，极致体验，JUST FOR FUN。
- 善于利用工具，就能满足 99%的需求，剩下的 1%，只是暂时还未找到合适的工具。
- 要有总结的习惯，不一定是写文章，基础代码库时常加入更好的优化点，不断打磨工具。
- 如果一个产品适合国际化，一开始就做成双语言的。（这点我虽然做了，但还未找到好的推广方式，继续探索）
- 不要限定技术角色，前端还是后端，用到什么，就去学。
- 不断丰富自己的优秀第一手信息来源
- 编程是创造的过程，享受这个过程。
