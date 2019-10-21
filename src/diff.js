function diff (oldTree, newTree) {
    // patches用来存放补丁对象
    let patches = {};
    // 第一次比较应该是树的第0索引
    let index = 0;
    // 递归树 比较后的结果放到补丁里
    walk(oldTree, newTree, index, patches);

    return patches;
}

function walk(oldNode, newNode, index, patches) {
    // 每一个元素都有一个补丁
    let current = [];

    if (!newNode) {
        current.push({ type: "REMOVE", index });
    } else if (isString(oldNode) && isString(newNode)) {
        // 判断文本是否一致
        if (oldNode !== newNode) {
            current.push({ type: "TEXT", text: newNode });
        }
    } else if (oldNode.tag === newNode.tag) {
        // 比较属性是否有更改
        let attr = diffAttr(oldNode.attr, newNode.attr);
        if (Object.keys(attr).length > 0) {
            current.push({ type: "ATTR", attr });
        }
        // 如果有子节点，遍历子节点
        diffChildren(oldNode.children, newNode.children, patches);
    } else {
        // 节点被替换
        current.push({ type: "REPLACE", newNode });
    }

    // 当前元素确实有补丁存在
    if (current.length) {
        // 将元素和补丁对应起来，放到大补丁包中
        patches[index] = current;
    }
}

function isString(obj) {
    return typeof obj === "string";
}

function diffAttr(oldAttrs, newAttrs) {
    let patch = {};
    // 判断老的属性中和和新的属性的关系
    for (let key in oldAttrs) {
        if (oldAttrs.hasOwnProperty(key)) {
            if (oldAttrs[key] !== newAttrs[key]) {
                patch[key] = newAttrs[key]; // 有可能还是undefined
            }
        }
    }

    // 老节点没有新节点的属性
    for (let key in newAttrs) {
        if (!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key];
        }
    }

    return patch;
}

// 所有都基于一个序号来实现
let num = 0;

function diffChildren(oldChildren, newChildren, patches) {
    // 比较老的和新的
    oldChildren.forEach((child, index) => {
        walk(child, newChildren[index], ++num, patches);
    });
}

export default diff;