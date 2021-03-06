import { action, makeAutoObservable } from "mobx";

class Tree {
  tree = {
    label: null,
    id: null,
    parentId: null,
    children: []
  };

  selectedNode = this.tree;

  constructor(url) {
    makeAutoObservable(this, {
      fetchTree: action,
      deleteNode: action,
      chooseNode: action
    }, { deep: true });
    if (url) this.fetchTree(url);
    this.URL = url;
  }

  set setTree(newTree) {
    this.tree = newTree;
  }

  addBranch(newBranch) {
    this.tree.children.push(newBranch);
  }

  deleteNode(targetNode) {
    this.chooseNode();
    this.traversal((node) => {
      node.children = node.children.filter(child => child.id !== targetNode.id);
    });
  }

  chooseNode(node = this.tree) {
    this.selectedNode = node;
  }

  traversal(callback, nested = -1, tree = this.tree) {
    callback(tree, nested);
    if (!tree.children.length) return;

    nested++;
    for (let i = tree.children.length - 1; i >= 0; i--) {
      this.traversal(callback, nested, tree.children[i]);
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

  async fetchTree(url = this.URL) {
    const response = await fetch(url);
    const object = await response.json();
    const entityes = JSON.parse(object.files["view.json"].content).entityLabelPages[0]; // some like it deep
    const newTree = this.parseEntityes(entityes);
    this.setTree = newTree;
  }

  async sendTree(tree = this.tree) {
    console.log(tree);
  }
}

export default new Tree("https://api.github.com/gists/e1702c1ef26cddd006da989aa47d4f62");