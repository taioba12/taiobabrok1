import { isNotDefined, isDefined } from "react-stockcharts/lib/utils";

export function saveInteractiveNode(chartId) {
    return node => {
        this[`node_${chartId}`] = node;
    };
}

export function handleSelection(type, chartId) {
    return selectionArray => {
        const key = `${type}_${chartId}`;
        const interactive = this.state[key].map((each, idx) => {
            return {
                ...each,
                selected: selectionArray[idx]
            };
        });
        // Adicionando condição de saída para evitar atualizações de estado infinitas
        if (JSON.stringify(this.state[key]) !== JSON.stringify(interactive)) {
            this.setState({
                [key]: interactive
            });
        }
    };
}

export function saveInteractiveNodes(type, chartId) {
    return node => {
        if (isNotDefined(this.interactiveNodes)) {
            this.interactiveNodes = {};
        }
        const key = `${type}_${chartId}`;
        if (isDefined(node) || isDefined(this.interactiveNodes[key])) {
            this.interactiveNodes = {
                ...this.interactiveNodes,
                [key]: { type, chartId, node },
            };
        }
    };
}

export function getInteractiveNodes() {
    return this.interactiveNodes;
}
