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

function dfsLimitada(graph, inicio, objetivo, profundidadeMaxima) {
    const pilha = new Pilha();
    const visitados = new Set();
    const caminho = [];
    const profundidade = {}; // Dicionário para armazenar a profundidade de cada nó

    pilha.empilhar(inicio);
    visitados.add(inicio);
    profundidade[inicio] = 0;

    while (!pilha.estaVazia()) {
        const noAtual = pilha.desempilhar();
        const profundidadeAtual = profundidade[noAtual];
        caminho.push(noAtual);

        if (noAtual === objetivo) {
            return caminho;
        }

        if (profundidadeAtual < profundidadeMaxima) {
            const vizinhos = graph[noAtual];
            for (let i = vizinhos.length - 1; i >= 0; i--) {
                const vizinho = vizinhos[i];
                if (!visitados.has(vizinho)) {
                    visitados.add(vizinho);
                    pilha.empilhar(vizinho);
                    profundidade[vizinho] = profundidadeAtual + 1;
                }
            }
        }
    }

    return null;
}


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

const noInicio = 'A';
const noObjetivo = 'H';
const profundidadeMaxima = 3;
const caminhoDFSLimitada = dfsLimitada(grafo, noInicio, noObjetivo, profundidadeMaxima);

if (caminhoDFSLimitada) {
    console.log("Caminho encontrado de", noInicio, "até", noObjetivo, "usando busca em profundidade limitada:");
    console.log(caminhoDFSLimitada.join(" -> "));
} else {
    console.log("Não foi encontrado um caminho de", noInicio, "até", noObjetivo, "usando busca em profundidade limitada.");
}
