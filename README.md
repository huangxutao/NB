# NB

## Just For Fun


## API:

| 用途 | URL |
|---|---|
| 获取首页 | / |
| 获取文章页 | /post?article={article_id} |
| 获取归档页 | /archive |


A Node Blog System.

Still Coding...



## 关于文章

post 文章:

| 属性 | 类型 | 名称 |
|---|---|---|
| _id | String | 唯一 id |
| title | String　| 标题 |
| tags | Array | 标签 |
| category| String | 类别 |
| date | Object | 日期 |
| content| Object | 内容 |
| isDraft | Boolean | 是否为草稿 |

文章的 date 属性：

| 属性 | 类型 | 说明 |
|---|---|---|
| publish | Date | 发布时间 |
| publish | Date | 更新时间 |

文章的 content 属性：

| 属性 | 类型 | 说明 |
|---|---|---|
| html | String | 带 html 标签 |
| markdown | String | markdown 文稿 |
| summary | Object | 摘要 |

content 的 summary 属性：

| 属性 | 类型 | 说明 |
|---|---|---|
| html | Date | 带 html 标签 |
| text | Date | 纯文本 |

## GET :

| 用途 | URL |
|---|---|
| 获取首页 | / |
| 获取分页　| /?page={page_num} |
| 获取文章页 | /post?article={article_id} |
| 获取归档页 | /archive |

## POST :

采用 json 数据来实现前后端交互

### 基本列表
| 用途 | URL |
|---|---|
| 获取分页 | /get-page |
| 获取文章 | /get-post |
| 获取归档 | /get-archive |

### 示例

以下仅供参考，any problem, show me on the [issue](https://github.com/huangxutao/NB/issues).

#### 获取分页

> 获取分页 `/get-page`
>
> 发送的数据：
>
> - post_num　选填，文章篇数，默认一个分页有８篇文章, 可以设置该值来调整
> - page_num　必填，具体获取的页码
>
> 返回的数据：
>
> ```javascript
  [
    {
      _id: String,
      title: String,
      tags: String,
      category: String,
      date: {
        publish: Date
      },
      content: {
        summary: String
      }
    },
    {},
    {},
    // ...
  ]
  ```

```javascript
// 假设你已经封装了 ajax 方法

ajax({
  type: 'POST',
  url: '/get-page',
  data: {
    post_num: 10,
    page_num: 5
  },
  success: yourFun  // 请求成功后服务器会返回一条 json 数据
});
```

#### 获取文章

> 获取文章 `/get-post`
>
> 发送的数据：
> - article_id　必填，具体获取的文章 id 
>
> 返回的数据：
>
> ```javascript
  {
    title: String,
    tags: String,
    category: String,
    date: {
      publish: Date
    },
    content: {
      html: String
    }
  }
  ```
  

```javascript
// 假设你已经封装了 ajax 方法

ajax({
  type: 'POST',
  url: '/get-post',
  data: {
    post_id: '1e9908ad&coeaaxq*ad'
  },
  success: yourFun  // 请求成功后服务器会返回一条 json 数据
});
```

#### 获取归档

> 获取文章 `/get-archive`

```javascript
// 假设你已经封装了 ajax 方法

ajax({
  type: 'POST',
  url: '/get-post',
  data: {},
  success: yourFun  // 请求成功后服务器会返回一条 json 数据
});
```
