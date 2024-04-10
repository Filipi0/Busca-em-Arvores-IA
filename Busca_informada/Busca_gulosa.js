class FilaPrioridade {
    constructor() {
        this.itens = [];
    }

    enfileirar(item, prioridade) {
        this.itens.push({ item, prioridade });
        this.itens.sort((a, b) => a.prioridade - b.prioridade);
    }

    desenfileirar() {
        if (this.estaVazia()) {
            return null;
        }
        return this.itens.shift().item;
    }

    estaVazia() {
        return this.itens.length === 0;
    }
}

function buscaGulosa(grafo, inicio, objetivo, heuristica) {
    const fila = new FilaPrioridade();
    const visitados = new Set();
    const caminho = {};

    fila.enfileirar(inicio, heuristica[inicio]);
    visitados.add(inicio);
    caminho[inicio] = null;

    while (!fila.estaVazia()) {
        const noAtual = fila.desenfileirar();

        if (noAtual === objetivo) {
            return obterCaminho(inicio, objetivo, caminho);
        }

        const vizinhos = Object.keys(grafo[noAtual]);
        for (const vizinho of vizinhos) {
            if (!visitados.has(vizinho)) {
                visitados.add(vizinho);
                caminho[vizinho] = noAtual;
                fila.enfileirar(vizinho, heuristica[vizinho]);
            }
        }
    }

    return null;
}

function obterCaminho(inicio, objetivo, caminho) {
    const resultado = [];
    let noAtual = objetivo;
    while (noAtual !== null) {
        resultado.unshift(noAtual);
        noAtual = caminho[noAtual];
    }
    return resultado;
}


const grafo = {
    'A': { 'B': 1, 'C': 5 },
    'B': { 'A': 1, 'C': 3, 'D': 6, 'E': 1, 'H': 5 },
    'C': { 'A': 5, 'B': 3, 'D': 2, 'E': 3, 'F': 2, 'G': 4 },
    'D': { 'B': 6, 'C': 2, 'H': 3 },
    'E': { 'B': 1, 'C': 3 },
    'F': { 'C': 2 },
    'G': { 'C': 4 },
    'H': { 'B': 5, 'D': 3 }
};

// Como no exemplo de bucarest, no grafo da romenia, H é como se fosse bucarest
const heuristica = {
    'A': 10, //estimativa para o nó A
    'B': 8,  //estimativa para o nó B
    'C': 6,  //estimativa para o nó C
    'D': 7,  //estimativa para o nó D
    'E': 5,  //estimativa para o nó E
    'F': 4,  //estimativa para o nó F
    'G': 3,  //estimativa para o nó G
    'H': 0   //estimativa para o nó H
}
//teste de busca gulosa de A até H
const noInicio = 'A';
const noObjetivo = 'H';
const caminhoGuloso = buscaGulosa(grafo, noInicio, noObjetivo, heuristica);

if (caminhoGuloso) {
    console.log("Caminho encontrado de", noInicio, "até", noObjetivo, "usando busca gulosa:");
    console.log(caminhoGuloso.join(" -> "));
    console.log("Custo total:", caminhoGuloso.reduce((total, no, i) => i > 0 ? total + grafo[caminhoGuloso[i - 1]][no] : 0, 0));
} else {
    console.log("Não foi encontrado um caminho de", noInicio, "até", noObjetivo, "usando busca gulosa.");
}
