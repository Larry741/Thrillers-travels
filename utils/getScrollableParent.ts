const getScrollParent = (node: Node): Node | typeof window => {
  if (node instanceof HTMLElement) {
    const isElement = node instanceof HTMLElement;
    const overflowY = isElement && window.getComputedStyle(node).overflowY;
    const isScrollable = overflowY !== "visible" && overflowY !== "hidden";

    if (!node || node.nodeName === "HTML") {
      return window;
    } else if (isScrollable && node.scrollHeight >= node.clientHeight) {
      return node;
    }

    return getScrollParent(node.parentNode as Node);
  }

  return window;
};

export default getScrollParent;
