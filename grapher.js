// Define color schemes for nodes and edges
const colors = {
  root: {
    background: "orange",
    border: "darkred",
    highlight: { background: "yellow", border: "orange" },
  },
  node: {
    background: "white",
    border: "black",
    highlight: { background: "yellow", border: "orange" },
    hover: { background: "lightred", border: "darkred" },
  },
  edge: {
    color: "white",
    highlight: "yellow",
  },
};

// Load CSV and build the tree
function loadCSVAndBuildTree(csvFile) {
  Papa.parse(csvFile, {
    header: true,
    complete: function (results) {
      const requiredColumns = [
        "parent_id",
        "child_id",
        "parent_name",
        "child_name"
      ];

      // Validate the CSV columns
      if (!requiredColumns.every((col) => col in results.data[0])) {
        alert("CSV must contain columns: parent_id, child_id, parent_name, child_name");
        return;
      }

      const nodeMap = {};
      const edges = [];

      // Process CSV data
      results.data.forEach((row) => {
        if (!row.parent_id || !row.child_id || !row.parent_name || !row.child_name) {
          return;
        }

        const parentId = parseInt(row.parent_id, 10);
        const childId = parseInt(row.child_id, 10);

        // Add parent node if not present
        if (!nodeMap[parentId]) {
          nodeMap[parentId] = createNode(parentId, row.parent_name, false);
        }

        // Add child node if not present
        if (!nodeMap[childId]) {
          nodeMap[childId] = createNode(childId, row.child_name, true);
        } else {
          nodeMap[childId].hasParent = true;
        }

        edges.push({
          from: parentId,
          to: childId,
          ...(row.weight ? { label: row.weight } : {}),
        });

      });

      // Detect root nodes (nodes without parents) and assign levels
      assignNodeLevels(nodeMap, edges);

      const nodes = Object.values(nodeMap);
      createVisTree(nodes, edges);
    },
  });
}

// Helper function to create a node object
function createNode(id, label, hasParent) {
  return {
    id: id,
    label: label,
    color: colors.node,
    shape: "box",
    hasParent: hasParent,
    level: null, // Level will be assigned later
  };
}

// Function to detect root nodes and assign levels to all nodes
function assignNodeLevels(nodeMap, edges) {
  const rootNodes = [];

  // Identify root nodes (nodes without parents)
  Object.values(nodeMap).forEach((node) => {
    if (!node.hasParent) {
      rootNodes.push(node);
      // Assign root color to root nodes
      node.color = colors.root;
    }
  });

  // Assign levels recursively or iteratively starting from root nodes
  rootNodes.forEach((rootNode) => {
    assignLevelToChildren(rootNode, 0, edges, nodeMap);
  });
}

// Recursive function to assign levels to children
function assignLevelToChildren(parentNode, parentLevel, edges, nodeMap) {
  // Assign the level to the parent node
  parentNode.level = parentLevel;

  // Find all child nodes of this parent
  edges.forEach((edge) => {
    if (edge.from === parentNode.id) {
      const childNode = nodeMap[edge.to];
      if (childNode && childNode.level === null) { // Prevent circular references
        assignLevelToChildren(childNode, parentLevel + 1, edges, nodeMap);
      }
    }
  });
}

// Create and display the vis.js tree
function createVisTree(nodes, edges) {
  const container = document.getElementById("mytree");

  const options = {
    layout: {
      hierarchical: {
        direction: getSelectedOption("direction"),
        nodeSpacing: parseInt(document.getElementById("nodeSpacing").value),
        levelSeparation: parseInt(document.getElementById("levelSeparation").value),
      },
    },
    edges: {
      smooth: false,
      arrows: { to: true },
      physics: false,
      color: colors.edge,
    }
  };

  const data = { nodes, edges };
  myTree = new vis.Network(container, data, options);
}

// Utility function to get the selected radio button value
function getSelectedOption(name) {
  return document.querySelector(`input[name="${name}"]:checked`).value;
}

// Handle file input event
document.getElementById("file").addEventListener("change", function () {
  const file = document.getElementById("file").files[0];
  if (file && (file.type === "text/csv" || file.name.endsWith(".csv"))) {
    const reader = new FileReader();
    reader.onload = function (event) {
      loadCSVAndBuildTree(event.target.result);
    };
    reader.readAsText(file);
  } else {
    alert("Please select a CSV file.");
  }
});

// Event listeners for UI controls to update the tree layout dynamically
const uiElements = {
  nodeSpacing: "input",
  levelSeparation: "input",
  direction: "change",
};

Object.keys(uiElements).forEach((id) => {
  document.querySelectorAll(`input[name="${id}"]`).forEach((elem) => {
    elem.addEventListener(uiElements[id], function () {
      const option = {};
      if (id === "nodeSpacing" || id === "levelSeparation") {
        option[id] = parseInt(document.getElementById(id).value);
      } else {
        option[id] = getSelectedOption(id);
      }
      updateTreeOptions(option);
    });
  });
});

// Update the vis.js tree layout options dynamically
function updateTreeOptions(newOptions) {
  const options = {
    layout: {
      hierarchical: {
        ...newOptions,
      },
    },
  };
  myTree.setOptions(options);
}
