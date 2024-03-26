
const graph = {
    'A': ['B', 'C'],
    'B': ['A', 'C', 'D'],
    'C': ['A', 'F', 'G'],
    'D': ['B', 'H'],
    'E': ['B'],
    'F': ['C'],
    'G': ['C'],
    'H': ['D']
};

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

function dfs(graph, start, goal) {
    // Pilha para armazenar os nós a serem visitados
    const stack = new Stack();
    // Conjunto para armazenar os nós já visitados
    const visited = new Set();
    // Lista para armazenar o caminho
    const path = [];

    // Adicionando o nó inicial à pilha e marcando como visitado
    stack.push(start);
    visited.add(start);

    while (!stack.isEmpty()) {
        const current_node = stack.pop();
        path.push(current_node);

        if (current_node === goal) {
            return path;
        }

        // Iterando sobre os vizinhos do nó atual
        for (const neighbor of graph[current_node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                stack.push(neighbor);
            }
        }
    }

    return null;
}

// Executando a busca em profundidade de A até H
const startNode = 'A';
const goalNode = 'H';
const pathDFS = dfs(graph, startNode, goalNode);

if (pathDFS) {
    console.log("Caminho encontrado de", startNode, "até", goalNode, "usando busca em profundidade:");
    console.log(pathDFS.join(" -> "));
} else {
    console.log("Não foi encontrado um caminho de", startNode, "até", goalNode, "usando busca em profundidade.");
}
