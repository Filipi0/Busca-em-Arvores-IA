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

function dfsLimitedIterative(graph, start, goal, maxDepth) {
    const stack = new Stack();
    const visited = new Set();
    const path = [];
    const depth = {}; // Dicionário para armazenar a profundidade de cada nó

    stack.push({ node: start, depth: 0 });

    while (!stack.isEmpty()) {
        const { node, depth: currentDepth } = stack.pop();

        // Verifica se alcançou o objetivo
        if (node === goal) {
            path.push(node);
            return path;
        }

        // Verifica se a profundidade atual excede o limite
        if (currentDepth >= maxDepth) {
            continue; // Passa para o próximo nó
        }

        // Adiciona o nó à pilha e marca como visitado
        if (!visited.has(node)) {
            visited.add(node);
            path.push(node);

            const neighbors = graph[node];
            for (let i = neighbors.length - 1; i >= 0; i--) {
                const neighbor = neighbors[i];
                if (!visited.has(neighbor)) {
                    stack.push({ node: neighbor, depth: currentDepth + 1 });
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

// Executando a busca em profundidade limitada iterativa de A até F com limite de profundidade 2
const startNode = 'A';
const goalNode = 'B';
const maxDepth = 2;
const pathLimitedDFSIterative = dfsLimitedIterative(graph, startNode, goalNode, maxDepth);

if (pathLimitedDFSIterative) {
    console.log("Caminho encontrado de", startNode, "até", goalNode, "usando busca em profundidade limitada iterativa:");
    console.log(pathLimitedDFSIterative.join(" -> "));
    console.log("Profundidade:", pathLimitedDFSIterative.length - 1);
} else {
    console.log("Não foi encontrado um caminho de", startNode, "até", goalNode, "usando busca em profundidade limitada iterativa.");
}
