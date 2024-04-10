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

function dfsLimitadaIterativa(grafo, inicio, objetivo, profundidadeMaxima) {
    const pilha = new Pilha();
    const visitados = new Set();
    const caminho = [];
    const profundidade = {};

    pilha.empilhar({ no: inicio, profundidade: 0 });

    while (!pilha.estaVazia()) {
        const { no, profundidadeAtual } = pilha.desempilhar();

        // Verifica se alcançou o objetivo
        if (no === objetivo) {
            caminho.push(no);
            return caminho;
        }

        // Verifica se a profundidade atual excede o limite
        if (profundidadeAtual >= profundidadeMaxima) {
            continue;
        }

        // Adiciona o nó à pilha e marca como visitado
        if (!visitados.has(no)) {
            visitados.add(no);
            caminho.push(no);

            const vizinhos = grafo[no];
            for (let i = vizinhos.length - 1; i >= 0; i--) {
                const vizinho = vizinhos[i];
                if (!visitados.has(vizinho)) {
                    pilha.empilhar({ no: vizinho, profundidade: profundidadeAtual + 1 });
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
const noObjetivo = 'B';
const profundidadeMaxima = 2;
const caminhoDFSIterativoLimitado = dfsLimitadaIterativa(grafo, noInicio, noObjetivo, profundidadeMaxima);

if (caminhoDFSIterativoLimitado) {
    console.log("Caminho encontrado de", noInicio, "até", noObjetivo, "usando busca em profundidade limitada iterativa:");
    console.log(caminhoDFSIterativoLimitado.join(" -> "));
    console.log("Profundidade:", caminhoDFSIterativoLimitado.length - 1);
} else {
    console.log("Não foi encontrado um caminho de", noInicio, "até", noObjetivo, "usando busca em profundidade limitada iterativa.");
}
