# NB

## Just For Fun

A Node Blog System.

Still Coding...

## 关于文章

post 文章:

| 属性 | 类型 | 名称 |
|---|---|---|
| _id | String | 唯一 id |
| title | String　| 标题 |
| date | Object | 日期 |
| content| Object | 内容 |
| tags | Array | 标签 |
| category| String | 类别 |
| views | Number | 浏览量 |
| isDraft | Boolean | 是否为草稿 |

文章的 date 属性：

| 属性 | 类型 | 说明 |
|---|---|---|
| publish | Date | 发布时间 |
| update | Date | 更新时间 |

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

## URL 设计 :

| 用途 | URL |
|---|---|
| 获取首页 | / |
| 获取文章页 | /post/?article={article_id} |
| 获取分页　| /page/?num={page_num} |
| 获取归档页 | /archive |
| 获取类别页 | /category/?name={category_name} |
| 获取归档页 | /tag/?name={tag_name} |

> **注**： 如果需要返回 json 数据，在相应 url 的 query 上加入 `json=true` 即可
>
> 例如： 
> - `/?json=true` 将获取首页的相关 json 数据
> - `/post/?article=helloworld&json=true`  将获取具体文章页的相关 json 数据

以上仅供参考，any problem, show me on the [issue](https://github.com/huangxutao/NB/issues).
