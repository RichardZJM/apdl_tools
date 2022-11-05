import React from "react";

function parseInput(apdl: string) {
  apdl = `
  Testing 
  K,1,  2,  3
  `;
  apdl = apdl.replace(/ /g, "");

  console.log(apdl);
  return [];
}

export default parseInput;
