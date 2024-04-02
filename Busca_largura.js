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

class Fila {
    constructor() {
        this.itens = [];
    }

    enfileirar(item) {
        this.itens.push(item);
    }

    desenfileirar() {
        return this.itens.shift();
    }

    estaVazia() {
        return this.itens.length === 0;
    }
}

function bfs(grafo, inicio, objetivo) {
    // Fila para armazenar os nós a serem visitados
    const fila = new Fila();
    // Conjunto para armazenar os nós já visitados
    const visitados = new Set();
    // Array para armazenar o caminho
    const caminho = [];

    fila.enfileirar(inicio);
    visitados.add(inicio);

    while (!fila.estaVazia()) {
        const noAtual = fila.desenfileirar();
        caminho.push(noAtual);

        if (noAtual === objetivo) {
            return caminho;
        }

        for (const vizinho of grafo[noAtual]) {
            if (!visitados.has(vizinho)) {
                visitados.add(vizinho);
                fila.enfileirar(vizinho);
            }
        }
    }

    return null;
}

const noInicio = 'A';
const noObjetivo = 'F';
const caminhoBFS = bfs(grafo, noInicio, noObjetivo);

if (caminhoBFS) {
    console.log("Caminho encontrado de", noInicio, "até", noObjetivo, "usando busca em largura:");
    console.log(caminhoBFS.join(" -> "));
} else {
    console.log("Não foi encontrado um caminho de", noInicio, "até", noObjetivo, "usando busca em largura.");
}
