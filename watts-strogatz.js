
// export function test() {
//   return d3.selectAll('div').size();
// }

export function wattsStrogatz(numNodes, kDegrees, beta) {
  // 1. Build ring lattice
  const nodes = [...Array(numNodes).keys()].map(d => ({ id: d }));

  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    // for (let j = -kDegrees/2; j <= kDegrees/2; j++) {
    for (let j = 0; j <= kDegrees/2; j++) {
      if (j === 0) continue; // No self-edge
      edges.push({
        source: i + j % numNodes,
        target: i
      });
    }
  }


  // 2. Rewrite edges
  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];
    if (edge.source > edge.target) {
      if (Math.random() < beta) {
        let newSource = -1;
        while(true) {
          newSource = Math.floor(Math.random() * numNodes);
          if (newSource < (edge.target - kDegrees / 2) || newSource > (edge.target + kDegrees / 2)) {
            break;
          }
        }
        edge.source = newSource;
      }
    }
  }
  return { nodes, edges };
}
