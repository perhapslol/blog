---
title: JavaScript 进阶笔记
date: 2024-01-20 00:00:00
categories: 
  - 学习笔记
tags: 
  - JavaScript
  - 进阶
permalink: /pages/445d53/
---

## 闭包

闭包是指有权访问另一个函数作用域中变量的函数。

```javascript
function outer() {
  let count = 0
  return function inner() {
    count++
    return count
  }
}

const counter = outer()
console.log(counter()) // 1
console.log(counter()) // 2
```

## Promise

Promise 是处理异步操作的对象。

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success!')
  }, 1000)
})

promise.then(result => console.log(result))
```

## async/await

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data')
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
```
