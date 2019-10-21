// 虚拟DOM元素的类，构建实例对象，用来描述DOM
class Element {
    constructor(tag, attr, children) {
        this.tag = tag;
        this.attr = attr;
        this.children = children;
    }
}

// 创建虚拟DOM，返回虚拟节点（object）
function createElement(tag, attr, children) {
    return new Element(tag, attr, children);
}

// render方法将虚拟DOM转化成真是DOM
function render(domObj) {
    // 1、根据tag类型来创建对应的元素
    let el = document.createElement(domObj.tag);

    // 2、遍历attr的属性对象，然后给创建的元素el设置属性
    for (let key in domObj.attr) {
        if (domObj.attr.hasOwnProperty(key)) {
            setAttr(el, key, domObj.attr[key]);
        }
    }

    /**
     * 3、遍历子节点，如果是虚拟DOM，就继续递归渲染
     * 不是就代表文本节点，直接创建
     */
    domObj.children.forEach(child => {
        child = (child instanceof Element) ? render(child) : document.createTextNode(child);
        // 添加到对应的元素中
        el.appendChild(child);
    });

    return el;
}

// 设置元素属性
function setAttr(node, key, value) {
    switch (key) {
        case "value":
            if (node.tagName.toLowerCase() === "input" ||
                node.tagName.toLowerCase() === "textarea") {
                node.value = value;
            } else {
                node.setAttribute(key, value);
            }
            break;
        case "style":
            // 直接赋值行内样式
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(key, value);
            break;
    }
}

// 将元素插入到页面中
function renderDOM(el, target) {
    target.appendChild(el);
}

export { Element, createElement, render, setAttr, renderDOM }