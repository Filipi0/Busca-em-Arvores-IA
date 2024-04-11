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

function buscaAStar(grafo, inicio, objetivo, heuristica) {
    const fila = new FilaPrioridade();
    const visitados = new Set();
    const caminho = {};
    const custoReal = {};

    fila.enfileirar(inicio, 0);
    visitados.add(inicio);
    custoReal[inicio] = 0;
    caminho[inicio] = null;

    while (!fila.estaVazia()) {
        const noAtual = fila.desenfileirar();

        if (noAtual === objetivo) {
            return obterCaminho(inicio, objetivo, caminho);
        }

        const vizinhos = Object.keys(grafo[noAtual]);
        for (const vizinho of vizinhos) {
            const novoCusto = custoReal[noAtual] + grafo[noAtual][vizinho];
            if (!visitados.has(vizinho) || novoCusto < custoReal[vizinho]) {
                visitados.add(vizinho);
                custoReal[vizinho] = novoCusto;
                const prioridade = novoCusto + heuristica[vizinho];
                caminho[vizinho] = noAtual;
                fila.enfileirar(vizinho, prioridade);
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

// Definição do grafo da Romênia
const grafo = {
    'Arad': { 'Zerind': 75, 'Sibiu': 140, 'Timisoara': 118 },
    'Zerind': { 'Arad': 75, 'Oradea': 71 },
    'Oradea': { 'Zerind': 71, 'Sibiu': 151 },
    'Sibiu': { 'Arad': 140, 'Oradea': 151, 'Fagaras': 99, 'Rimnicu Vilcea': 80 },
    'Timisoara': { 'Arad': 118, 'Lugoj': 111 },
    'Lugoj': { 'Timisoara': 111, 'Mehadia': 70 },
    'Mehadia': { 'Lugoj': 70, 'Drobeta': 75 },
    'Drobeta': { 'Mehadia': 75, 'Craiova': 120 },
    'Craiova': { 'Drobeta': 120, 'Rimnicu Vilcea': 146, 'Pitesti': 138 },
    'Rimnicu Vilcea': { 'Sibiu': 80, 'Craiova': 146, 'Pitesti': 97 },
    'Fagaras': { 'Sibiu': 99, 'Bucharest': 211 },
    'Pitesti': { 'Rimnicu Vilcea': 97, 'Craiova': 138, 'Bucharest': 101 },
    'Bucharest': { 'Fagaras': 211, 'Pitesti': 101 }
};

// Heurísticas para cada cidade
const heuristica = {
    'Arad': 366,
    'Zerind': 374,
    'Oradea': 380,
    'Sibiu': 253,
    'Timisoara': 329,
    'Lugoj': 244,
    'Mehadia': 241,
    'Drobeta': 242,
    'Craiova': 160,
    'Rimnicu Vilcea': 193,
    'Fagaras': 176,
    'Pitesti': 100,
    'Bucharest': 0
};

// Executando a busca A*
const inicio = 'Arad';
const objetivo = 'Bucharest';
const caminhoAStar = buscaAStar(grafo, inicio, objetivo, heuristica);

if (caminhoAStar) {
    console.log("Caminho encontrado de", inicio, "até", objetivo, "usando A*:");
    console.log(caminhoAStar.join(" -> "));
    console.log("Custo total:", caminhoAStar.reduce((total, cidade, i) => i > 0 ? total + grafo[caminhoAStar[i - 1]][cidade] : 0, 0));
} else {
    console.log("Não foi encontrado um caminho de", inicio, "até", objetivo, "usando A*.");
}


// Infelizmente só consegui implementar a busca A* para o grafo da Romênia, pois não consegui entender como implementar a heurística para o grafo do exemplo da busca não informada.