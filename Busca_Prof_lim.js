class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        return this.items.pop();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

function dfsLimited(graph, start, goal, maxDepth) {
    const stack = new Stack();
    const visited = new Set();
    const path = [];
    const depth = {}; // Dicionário para armazenar a profundidade de cada nó

    stack.push(start);
    visited.add(start);
    depth[start] = 0;

    while (!stack.isEmpty()) {
        const current_node = stack.pop();
        const current_depth = depth[current_node];
        path.push(current_node);

        if (current_node === goal) {
            return path;
        }

        if (current_depth < maxDepth) {
            const neighbors = graph[current_node];
            for (let i = neighbors.length - 1; i >= 0; i--) {
                const neighbor = neighbors[i];
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    stack.push(neighbor);
                    depth[neighbor] = current_depth + 1;
                }
            }
        }
    }

    return null;
}

// Definição da árvore
const graph = {
    'A': ['B', 'C'],
    'B': ['A', 'E', 'D'],
    'C': ['A', 'F', 'G'],
    'D': ['B', 'H'],
    'E': ['B'],
    'F': ['C'],
    'G': ['C'],
    'H': ['D']
};

// Executando a busca em profundidade limitada
const startNode = 'A';
const goalNode = 'H';
const maxDepth = 3;
const pathLimitedDFS = dfsLimited(graph, startNode, goalNode, maxDepth);

if (pathLimitedDFS) {
    console.log("Caminho encontrado de", startNode, "até", goalNode, "usando busca em profundidade limitada:");
    console.log(pathLimitedDFS.join(" -> "));
} else {
    console.log("Não foi encontrado um caminho de", startNode, "até", goalNode, "usando busca em profundidade limitada.");
}
