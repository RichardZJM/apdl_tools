function solveAL(lines: number[][]) {
  //Setup the undirected graph

  const connections: Map<number, { point: number; line: number }[]> = new Map();
  const points: Set<number> = new Set();

  for (let i = 0; i < lines.length; i++) {
    const ele = lines[i];
    if (!connections.has(ele[0]))
      connections.set(ele[0], [{ point: ele[1], line: i }]);
    else connections.get(ele[0])?.push({ point: ele[1], line: i });

    if (!connections.has(ele[1])) {
      connections.set(ele[1], [{ point: ele[0], line: i }]);
    } else connections.get(ele[1])?.push({ point: ele[0], line: i });

    points.add(ele[0]);
    points.add(ele[1]);
  }

  const visited: Set<number> = new Set();
  const areas: Map<string, number[]> = new Map();

  function dfs(
    point: number,
    pointPath: number[] = [],
    linePath: number[] = []
  ) {
    if (visited.has(point)) return;
    if (pointPath.length === 4) {
      if (point === pointPath[0] && !areas.has(linePath.reverse().toString()))
        areas.set(linePath.reverse().toString(), linePath);
      return;
    }

    const nextPoints = connections.get(point);
    if (!nextPoints) return;
    for (const nextPoint of nextPoints) {
      if (pointPath && nextPoint.point === pointPath.at(-1)) continue;
      dfs(
        nextPoint.point,
        pointPath.concat(point),
        linePath.concat(nextPoint.line + 1)
      );
    }
  }

  for (const point of points) {
    dfs(point);
    visited.add(point);
  }
  //   console.log(areas.keys());
  // console.log(Array.from(areas.keys()).length);
  return {
    commands: Array.from(areas.keys()).map((ele) => "AL," + ele.slice(0, -1)),
    areas: Array.from(areas.values()),
  };
}
export default solveAL;
