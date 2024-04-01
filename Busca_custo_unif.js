class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(item, priority) {
        this.items.push({ item, priority });
        this.items.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift().item;
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

function uniformCostSearch(graph, start, goal) {
    const queue = new PriorityQueue();
    const visited = new Set();
    const path = {};
    const cost = {};

    queue.enqueue(start, 0);
    visited.add(start);
    path[start] = null;
    cost[start] = 0;

    while (!queue.isEmpty()) {
        const current_node = queue.dequeue();

        if (current_node === goal) {
            return getPath(start, goal, path);
        }

        const neighbors = Object.keys(graph[current_node]);
        for (const neighbor of neighbors) {
            const new_cost = cost[current_node] + graph[current_node][neighbor];
            if (!visited.has(neighbor) || new_cost < cost[neighbor]) {
                visited.add(neighbor);
                path[neighbor] = current_node;
                cost[neighbor] = new_cost;
                queue.enqueue(neighbor, new_cost);
            }
        }
    }

    return null;
}

function getPath(start, goal, path) {
    const result = [];
    let current_node = goal;
    while (current_node !== null) {
        result.unshift(current_node);
        current_node = path[current_node];
    }
    return result;
}

// Definição do grafo com valores de arestas
const graph = {
    'A': { 'B': 1, 'C': 5 },
    'B': { 'A': 1, 'C': 3, 'D': 6, 'E': 1, 'H': 5 },
    'C': { 'A': 5, 'B': 3, 'D': 2, 'E': 3, 'F': 2, 'G': 4 },
    'D': { 'B': 6, 'C': 2, 'H': 3 },
    'E': { 'B': 1, 'C': 3 },
    'F': { 'C': 2 },
    'G': { 'C': 4 },
    'H': { 'B': 5, 'D': 3 }
};

// Executando a busca de custo uniforme de A até E
const startNode = 'A';
const goalNode = 'G';
const pathUCS = uniformCostSearch(graph, startNode, goalNode);

if (pathUCS) {
    console.log("Caminho encontrado de", startNode, "até", goalNode, "usando busca de custo uniforme:");
    console.log(pathUCS.join(" -> "));
    console.log("Custo total:", pathUCS.reduce((acc, node, i) => i > 0 ? acc + graph[pathUCS[i - 1]][node] : 0, 0));
} else {
    console.log("Não foi encontrado um caminho de", startNode, "até", goalNode, "usando busca de custo uniforme.");
}
