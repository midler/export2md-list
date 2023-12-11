figma.showUI(__html__, { width: 150, height: 100 });
function processNode(node: SceneNode, depth = 0): string {
  let markdownText = "";
  console.log(node)

  // Обработка текстового узла
  if (node.type === "TEXT") {
    markdownText += `${'  '.repeat(depth)}- ${(node as TextNode).characters}\n`;
  }
  else if (node.type === "STICKY" || node.type === "SHAPE_WITH_TEXT") {
    markdownText += `${'  '.repeat(depth)}- ${(node.name)}\n`;
  }
  // Обработка узлов, которые могут содержать дочерние элементы
  else if ("children" in node) {
    // Добавление маркера раздела, если это Section
    if (node.type === "SECTION") {
      markdownText += `${'  '.repeat(depth)}- ${node.name}\n`;
    }
    else if (node.type === "GROUP") {
      markdownText += `${'  '.repeat(depth)}- ${node.name}\n`;
    }


    // Рекурсивный вызов для каждого дочернего узла
    for (const child of node.children) {
      markdownText += processNode(child, depth + 1);
    }
  }

  return markdownText;
}



figma.ui.onmessage = msg => {
  if (msg.type === 'generate-markdown') {
    const nodes = figma.currentPage.selection;
    let markdownText = "";

    for (let node of nodes) {
      markdownText += processNode(node);
    }

    figma.ui.postMessage({ type: 'markdown-generated', markdown: markdownText });
  }
};
