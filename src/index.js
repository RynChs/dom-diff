import './index.css';
import { createElement, render, renderDOM } from "./element";
import diff from "./diff";
import patch from "./patch";

let virtualDom = createElement("div", {}, [
    createElement("div", { class: "tip" }, ["五秒后内容变更"]),
    createElement("ul", { class: "list" }, [
        createElement("li", { class: "item" }, ["张三"]),
        createElement("li", { class: "item" }, ["李四"]),
        createElement("li", { class: "item" }, ["王五"])
    ])
])

console.log(virtualDom);

// 渲染虚拟DOM得到真实的DOM结构
let el = render(virtualDom);
console.log(el);
// 直接将DOM添加到页面内
renderDOM(el, document.getElementById('root'));

// 变更内容
setTimeout(() => {
    let virtualDom2 = createElement("div", {}, [
        createElement("div", { class: "tip" }, ["内容已变更"]),
        createElement("ul", { class: "list-group" }, [
            createElement("li", { class: "item active" }, ["张三三"]),
            createElement("li", { class: "item" }, ["李四四"]),
            createElement("li", { class: "item" }, ["王五五"])
        ])
    ])
    // diff 一下两个不同的虚拟DOM
    let patches = diff(virtualDom, virtualDom2);
    console.log(patches);
    // 将变化打补丁，更新到el
    patch(el, patches);
}, 5000);
