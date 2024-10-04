# TreeGraphBuilder.Js

![Screenshot 2024-10-04 170213](https://github.com/user-attachments/assets/b2f5ce8d-46ef-4cb4-bed9-66187451b88f)


**TreeGraph Builder** is an interactive visualization tool that uses Javascript for creating hierarchical tree structures from CSV data. It uses `vis.js` for rendering and `PapaParse` for parsing CSV files, enabling users to upload CSV data and visualize the relationships between parent-child nodes in an easily customizable hierarchical layout.

---

### Key Features
- **CSV Parsing**: Load and parse CSV files containing parent-child relationships and weights to automatically generate hierarchical trees.
- **Customizable Layout**: Dynamically update layout properties such as node spacing, level separation, and tree direction through the UI.
- **Node Highlighting**: Visually distinguish between root nodes and other nodes using customizable color schemes.
- **Interactive UI**: Provides real-time updates to the tree when layout properties are adjusted through sliders and radio buttons.
- **Supports Edge Weights**: Edges between nodes can have weights (defined in the CSV) displayed as labels on the graph.

---
### CSV Format
The application expects a CSV file that contains all the necessary information about the edges of the graph, defining the relationships between parent and child nodes. Each row in the CSV represents an edge in the tree, connecting a parent node to a child node. The required columns are as follows:

- **`parent_id`**: A unique identifier for the parent node.
- **`child_id`**: A unique identifier for the child node.
- **`parent_name`**: The display name of the parent node (appears in the visualization).
- **`child_name`**: The display name of the child node (appears in the visualization).
- (**optional**) **`weight`** : A value representing the relationship or connection weight between the parent and child nodes. This weight is displayed as a label on the edge connecting the two nodes.

Each edge in the tree is thus defined by a unique `parent_id` and `child_id` pair, along with their respective names and the weight of the connection between them.

Example CSV:
```csv
parent_id,child_id,parent_name,child_name,weight
1,2,Root,NodeA,10
1,3,Root,NodeB,5
2,4,NodeA,NodeC,2
3,5,NodeB,NodeD,3
```

---

### Installation and Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/MatteoPapa/TreeGraphBuilder.Js.git
   cd TreeGraph-Builder
   ```

2. Open `index.html` in your browser and start using TreeGraph Builder.

---

### How to Use

1. **Load Data**: 
   - Either upload your own CSV file using the file input field or load the example CSV.
   
2. **Customize Layout**:
   - Use the UI controls to adjust the following tree properties:
     - **Node Spacing**: Adjust the distance between nodes at the same level.
     - **Level Separation**: Adjust the distance between different levels in the tree.
     - **Tree Direction**: Change the layout direction (`LR` for left-to-right, `TB` for top-to-bottom, etc.).

3. **Interactivity**: 
   - Click over nodes to see highlight effects, and view edge weights displayed as labels on the edges.

---

### Configuration

#### Color Scheme
The color scheme for nodes, edges, and highlights can be easily adjusted in the `colors` object in the JavaScript code:
```js
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
```

---

### Future Improvements
- **Node Search**: Implement a search feature to locate and highlight specific nodes.
- **Edge Customization**: Provide UI controls to customize the appearance of edges (color, style, arrow direction).
- **Save Tree Layout**: Add functionality to export the generated tree as an image or save the layout state for later use.

---

### Dependencies

This project relies on the following external libraries:

- **[PapaParse](https://www.papaparse.com/)**: A powerful CSV parser for JavaScript. Used to parse CSV files into usable data for building the tree structure.
  
  - Official website: [https://www.papaparse.com/](https://www.papaparse.com/)
  - GitHub repository: [https://github.com/mholt/PapaParse](https://github.com/mholt/PapaParse)

- **[vis.js](https://visjs.org/)**: A dynamic, browser-based visualization library for data visualization, used here to create and display hierarchical trees.

  - Official website: [https://visjs.org/](https://visjs.org/)
  - GitHub repository: [https://github.com/visjs/vis-network](https://github.com/visjs/vis-network)

Both libraries are included via CDN in the project.

---

### License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

