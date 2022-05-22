import { makeAutoObservable } from "mobx";

export class Tree {
  tree = {
    label: null,
    id: null,
    parentId: null,
    children: []
  };

  constructor() {
    makeAutoObservable(this);
  }

  addBranch(newBranch) {
    this.tree.children.push(newBranch);
  }

  traversal(callback, tree = this.tree) {
    callback(tree);
    if (!tree.children.length) return;

    for (let i = tree.children.length - 1; i >= 0; i--) {
      this.traversal(callback, tree.children[i]);
    }
  }

  findNodeById(id, tree = this.branchList) {
    if (tree.id === id) {
      return tree;
    }
    if (tree.children.length === 0) return;

    for (let i = tree.children.length - 1; i >= 0; i--) {
      const node = this.findNodeById(id, tree.children[i]);
      if (node) return node;
    }
  }

  setNodeToParent(node, tree) {
    const parentNode = this.findNodeById(node.parentId, tree);
    if (!parentNode) {
      return false;
    } else {
      parentNode.children.push(node);
      return true;
    }
  }

  findHome(homelessNodes, tree) {
    let node = homelessNodes.pop();
    const remains = [];
    while (node) {
      if (!this.setNodeToParent(node, tree)) {
        remains.push(node);
      }
      node = homelessNodes.pop();
    }
    if (remains.length) {
      this.findHome(remains, tree);
    }
  }

  parseEntityes(entityes) {
    const newTree = {
      label: null,
      id: null,
      parentId: null,
      children: []
    };
    const homelessNodes = [];
    for (let i = entityes.labels.length - 1; i >= 0; i--) {
      const newNode = {
        label: entityes.labels[i],
        id: entityes.entityLongIds[i],
        parentId: entityes.parentEntityLongIds[i],
        children: []
      };
      if (newNode.parentId !== -1) {
        if (!this.setNodeToParent(newNode, newTree))
          homelessNodes.push(newNode);
      } else {
        newTree.children.push(newNode);
      }
    }
    this.findHome(homelessNodes, newTree);
    return newTree;
  }

  async getTree(url) {
    const response = await fetch(url);
    const object = await response.json();
    const entityes = JSON.parse(object.files["view.json"].content).entityLabelPages[0]; // some like it deep
    const newTree = this.parseEntityes(entityes);
    console.dir(newTree);
    this.tree = newTree;
  }
}