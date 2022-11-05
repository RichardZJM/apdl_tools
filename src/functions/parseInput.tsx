// const testCase: string = `
// !Mech 465
// !Zijian Meng 20114000

// RES = 4

// /PREP7

// ET,1,SOLID185,,2
// MP,EX,1,210E9
// MP,PRXY,1,0.3

// TYPE,1
// MAT,1

// K,1,0,0,0
// K,2,0,0,0.1
// K,3,0,0.2,0.1
// K,4,0,0.2,0

// K,11,1,0,0
// K,12,1,0,0.1
// K,13,1,0.2,0.1
// K,14,1,0.2,0

// K,21,3,0,0
// K,22,3,0,0.1
// K,23,3,0.2,0.1
// K,24,3,0.2,0

// L,1,2
// L,2,3
// L,3,4
// L,4,1

// L,1,11
// L,2,12
// L,3,13
// L,4,14

// L,11,12
// L,12,13
// L,13,14
// L,14,11

// L,11,21
// L,12,22
// L,13,23
// L,14,24

// L,21,22
// L,22,23
// L,23,24
// L,24,21

// LESIZE,1,,,RES
// LESIZE,2,,,RES
// LESIZE,3,,,RES
// LESIZE,4,,,RES
// LESIZE,5,,,RES*2
// LESIZE,6,,,RES*2
// LESIZE,7,,,RES*2
// LESIZE,8,,,RES*2
// LESIZE,9,,,RES
// LESIZE,10,,,RES
// LESIZE,11,,,RES
// LESIZE,12,,,RES
// LESIZE,13,,,RES*4
// LESIZE,14,,,RES*4
// LESIZE,15,,,RES*4
// LESIZE,16,,,RES*4
// LESIZE,17,,,RES
// LESIZE,18,,,RES
// LESIZE,19,,,RES
// LESIZE,20,,,RES

// AL,1,2,3,4

// AL,1,5,9,6
// AL,2,6,10,7
// AL,3,7,11,8
// AL,4,8,12,5

// AL,9,10,11,12

// AL,9,13,17,14
// AL,10,14,18,15
// AL,11,15,19,16
// AL,12,16,20,13

// AL,17,18,19,20

// VA,1,2,3,4,5,6
// VA,6,7,8,9,10,11

// VMESH,1
// VMESH,2

// NSEL,S,LOC,X,0
// D,ALL,ALL,0

// NSEL,S,LOC,Y,0
// NSEL,R,LOC,X,1
// NSEL,R,LOC,Z,0
// F,ALL,FY,-200

// NSEL,S,LOC,Y,0
// NSEL,R,LOC,X,1
// NSEL,R,LOC,Z,0.1
// F,ALL,FY,-200

// NSEL,S,LOC,Y,0
// NSEL,R,LOC,X,3
// NSEL,R,LOC,Z,0
// F,ALL,FY,-100

// NSEL,S,LOC,Y,0
// NSEL,R,LOC,X,3
// NSEL,R,LOC,Z,0.1
// F,ALL,FY,-100

// NSEL,ALL

// FINI

// /SOLU
// SOLVE
// FINI

// /POST1
// NSEL,S,LOC,Y,0
// NSEL,R,LOC,X,2
// NSEL,R,LOC,Z,0

// KSEL,S,,,1
// KSEL,A,,,11
// KSEL,A,,,21

// NSLK,A

// NSORT,U,Y,0
// PRNSOL,U,Y

// `;

function parseInput(apdl: string) {
  // apdl = testCase;
  apdl = apdl.replace(/ /g, "").toLowerCase();

  // eslint-disable-next-line
  const regexpLine: RegExp = /\nl\,\d*\,\d*/g;
  const lineCommands = [...apdl.matchAll(regexpLine)];
  const regexpPoint: RegExp = /\d\d*/g;
  const lines = lineCommands.map((ele) =>
    [...ele[0].matchAll(regexpPoint)].map((ele2) => +ele2[0])
  );
  const points = new Set();

  lines.forEach((ele) => {
    points.add(ele[0]);
    points.add(ele[1]);
  });

  console.log(lines);
  console.log(points);
  return { lines, points };
}

export default parseInput;
