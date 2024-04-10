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

function buscaCustoUniforme(grafo, inicio, objetivo) {
    const fila = new FilaPrioridade();
    const visitados = new Set();
    const caminho = {};
    const custo = {};

    fila.enfileirar(inicio, 0);
    visitados.add(inicio);
    caminho[inicio] = null;
    custo[inicio] = 0;

    while (!fila.estaVazia()) {
        const noAtual = fila.desenfileirar();

        if (noAtual === objetivo) {
            return obterCaminho(inicio, objetivo, caminho);
        }

        const vizinhos = Object.keys(grafo[noAtual]);
        for (const vizinho of vizinhos) {
            const novoCusto = custo[noAtual] + grafo[noAtual][vizinho];
            if (!visitados.has(vizinho) || novoCusto < custo[vizinho]) {
                visitados.add(vizinho);
                caminho[vizinho] = noAtual;
                custo[vizinho] = novoCusto;
                fila.enfileirar(vizinho, novoCusto);
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

const noInicio = 'A';
const noObjetivo = 'G';
const caminhoCustoUniforme = buscaCustoUniforme(grafo, noInicio, noObjetivo);

if (caminhoCustoUniforme) {
    console.log("Caminho encontrado de", noInicio, "até", noObjetivo, "usando busca de custo uniforme:");
    console.log(caminhoCustoUniforme.join(" -> "));
    console.log("Custo total:", caminhoCustoUniforme.reduce((acc, no, i) => i > 0 ? acc + grafo[caminhoCustoUniforme[i - 1]][no] : 0, 0));
} else {
    console.log("Não foi encontrado um caminho de", noInicio, "até", noObjetivo, "usando busca de custo uniforme.");
}
