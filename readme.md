# Nebulas Scholar
Nebulas Scholar是一款基于区块链的论文文献检索系统，由用户自行上传论文文献到区块链中，也可以从链中检索到需要的论文，上传到链上的论文永久存在，不会被删除。

## 合约说明

### `smart_scholar.js`

#### 合约哈希

`44218c24321c867312c0cfe4ea15d24011457f78ee9a1b78555cf37993a85603`

#### 合约地址

`n1vJKLS8cko7EkWAj4WXs2GCk69rfCJxism`

#### 合约使用
该合约用来上传论文文献

接口如下:
* `upload(md5, title, keywords, abstract, authors, publish, date, link)`
	将一篇论文上传到链上，其中md5为确定论文的唯一key值

* `getMany (keys)`
	给定一系列key值（md5的数组），得到相应的论文

* `getAll(limit)`
	返回limit数量的论文

### `scholar_idx.js`

#### 合约哈希

`00c43909d2b526f06e44b3fca64d4da278007ebae756dbc8ffee40abcdec7a6e`

#### 合约地址

`n1iZeXMqFhdjVH4iQSL1fWhjAcsK2eUVMVx`

#### 合约使用
该合约用来给论文创建索引

接口如下:
* `put(keys, value)`
	keys为论文Title分词之后的数组，value为该论文对应的md5值，该方法将keys里的每一个key与value建立索引

* `get(keys)`
	给定一系列key值（即Title分完词后的数组），返回可能包含的论文的md5值，用来下一步对论文的检索    
           
           