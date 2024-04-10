const grafo = {
    'A': ['B', 'C'],
    'B': ['A', 'E', 'D'],
    'C': ['A', 'F', 'G'],
    'D': ['B', 'H'],
    'E': ['B'],
    'F': ['C'],
    'G': ['C'],
    'H': ['D']
};

class Pilha {
    constructor() {
        this.itens = [];
    }

    empilhar(item) {
        this.itens.push(item);
    }

    desempilhar() {
        return this.itens.pop();
    }

    estaVazia() {
        return this.itens.length === 0;
    }
}

function dfs(grafo, inicio, objetivo) {
    // Pilha para armazenar os nós a serem visitados
    const pilha = new Pilha();
    // Conjunto para armazenar os nós já visitados
    const visitados = new Set();
    // Lista para armazenar o caminho
    const caminho = [];

    // Adicionando o nó inicial à pilha e marcando como visitado
    pilha.empilhar(inicio);
    visitados.add(inicio);

    while (!pilha.estaVazia()) {
        const noAtual = pilha.desempilhar();
        caminho.push(noAtual);

        if (noAtual === objetivo) {
            return caminho;
        }

        // Iterando sobre os vizinhos do nó atual
        for (const vizinho of grafo[noAtual]) {
            if (!visitados.has(vizinho)) {
                visitados.add(vizinho);
                pilha.empilhar(vizinho);
            }
        }
    }

    return null;
}

const noInicio = 'A';
const noObjetivo = 'H';
const caminhoDFS = dfs(grafo, noInicio, noObjetivo);

if (caminhoDFS) {
    console.log("Caminho encontrado de", noInicio, "até", noObjetivo, "usando busca em profundidade:");
    console.log(caminhoDFS.join(" -> "));
} else {
    console.log("Não foi encontrado um caminho de", noInicio, "até", noObjetivo, "usando busca em profundidade.");
}
