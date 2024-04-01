
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

class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

function bfs(graph, start, goal) {
    // Fila para armazenar os nós a serem visitados
    const queue = new Queue();
    // Conjunto para armazenar os nós já visitados
    const visited = new Set();
    // Array para armazenar o caminho
    const path = [];

    queue.enqueue(start);
    visited.add(start);

    while (!queue.isEmpty()) {
        const current_node = queue.dequeue();
        path.push(current_node);

        if (current_node === goal) {
            return path;
        }

        for (const neighbor of graph[current_node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.enqueue(neighbor);
            }
        }
    }

    return null;
}

const startNode = 'A';
const goalNode = 'F';
const pathBFS = bfs(graph, startNode, goalNode);

if (pathBFS) {
    console.log("Caminho encontrado de", startNode, "até", goalNode, "usando busca em largura:");
    console.log(pathBFS.join(" -> "));
} else {
    console.log("Não foi encontrado um caminho de", startNode, "até", goalNode, "usando busca em largura.");
}
