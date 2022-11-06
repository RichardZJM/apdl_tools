function solveVA(lines: number[][], areas: number[][]) {
  //Generate the ID Map
  const areasToID: Map<string, number> = new Map(
    areas.map((ele, i) => [ele.toString(), i + 1])
  );

  //Generate a dict of which areas are connect to each line
  const lineConnectedTo: Map<number, Set<number>> = new Map(
    lines.map((ele, i) => [i + 1, new Set()])
  );

  for (const area of areas) {
    const areaNumber = areasToID.get(area.toString());
    if (!areaNumber) continue;
    for (const line of area) {
      lineConnectedTo.get(line)?.add(areaNumber);
    }
  }

  //Generate the undirected graph for areas to areas
  const connections: Map<number, Set<number>> = new Map(
    areas.map((ele, i) => [i + 1, new Set()])
  );

  for (const area of areas) {
    const areaNumber = areasToID.get(area.toString());
    if (!areaNumber) continue;
    for (const line of area) {
      const nextAreas = lineConnectedTo.get(line);
      if (!nextAreas) continue;
      for (const nextArea of nextAreas)
        connections.get(areaNumber)?.add(nextArea);
    }
    connections.get(areaNumber)?.delete(areaNumber);
  }

  //DFS algorithim
  const visited: Set<number> = new Set();
  const vols: number[][] = [];

  function searchArea(initial: number) {
    const loops: Map<number, number[]> = new Map();
    const finishedVols: Map<string, number[]> = new Map();

    function dfs(area: number, areaPath: number[] = []) {
      if (visited.has(area)) return;
      if (areaPath.length === 4) {
        if (
          area === initial &&
          !connections.get(areaPath[2])?.has(initial) &&
          !connections.get(areaPath[3])?.has(areaPath[1])
        ) {
          const matchingLoop = loops.get(areaPath[2]);
          if (matchingLoop) {
            const potentialVol = Array.from(
              new Set([...matchingLoop, ...areaPath])
            );
            if (potentialVol.length === 6) {
              //   console.log(potentialVol);
              finishedVols.set(
                [...potentialVol].sort((a, b) => a - b).toString(),
                potentialVol
              );
            }
          }
          loops.set(areaPath[2], areaPath);
        }
        return;
      }

      const nextAreas = connections.get(area);
      if (!nextAreas) return;
      for (const nextArea of nextAreas) {
        if (areaPath && nextArea === areaPath.at(-1)) continue;
        dfs(nextArea, areaPath.concat(area));
      }
    }
    dfs(initial);
    visited.add(initial);
    vols.push(...finishedVols.values());
  }

  for (let i = 1; i < areas.length + 1; ++i) searchArea(i);

  let commands = vols.map((ele) => "VA," + ele.toString());

  //   console.log(areasToID);
  //   console.log(lineConnectedTo);
  //   console.log(connections);
  //   console.log(vols);
  //   console.log(commands);
  return { commands, vols };
}

export default solveVA;
