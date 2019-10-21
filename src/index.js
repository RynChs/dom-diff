import './index.css';
import * as serviceWorker from './serviceWorker';
import { createElement, render, renderDOM } from "./element";

let virtualDom = createElement("ul", { class: "list" }, [
    createElement("li", { class: "item" }, ["张三"]),
    createElement("li", { class: "item" }, ["李四"]),
    createElement("li", { class: "item" }, ["王五"])
])
console.log(virtualDom);

// 渲染虚拟DOM得到真实的DOM结构
let el = render(virtualDom);
console.log(el);
// 直接将DOM添加到页面内
renderDOM(el, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
