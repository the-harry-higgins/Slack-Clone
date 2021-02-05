/* Script for processing my dumb import that I could group together.
   Material-UI is the biggest offender
*/

const fs = require('fs');
const path = require('path');


const condense = (lines) => {
  let start = Infinity;
  const removeLines = [];
  let imports = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("'@material-ui/core/") && !lines[i].includes("'@material-ui/core/styles")) {
      if (i < start) {
        start = i;
      }
      removeLines.push(i);
      const words = lines[i].split(/\s+/);
      imports.push(words[1]);
    } else if (lines[i].includes("'@material-ui/core'")) {
      if (i < start) {
        start = i;
      }
      const firstCurly = lines[i].indexOf('{');
      const endCurly = lines[i].indexOf('}');
      let chunk = lines[i].slice(firstCurly + 1, endCurly).trim();
      let subImports = chunk.split(/[ ,]+/);
      
      removeLines.push(i);
      imports = imports.concat(subImports);
    }
  }

  if (removeLines.length > 1) {
    imports.sort();
    
    const newImport = "import { " + imports.join(", ") + " } from '@material-ui/core';";
    
    const newLines = lines.filter((line, i) => {
      return !removeLines.includes(i);
    });
  
    newLines.splice(start, 0, newImport);
  
    return newLines.join("\n");
  }

  return null;

}


const processFile = (relativePath) => {
  const filePath = path.join(__dirname, relativePath);
  console.log(filePath);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    let lines = data.split("\n");

    const newData = condense(lines);

    if (newData) {
      fs.writeFile(filePath, newData, "utf8", err => {
        if (err) {
          console.log(err);
        }
  
        console.log(`done with file ${filePath}`);
      });
    } else {
      console.log(`no change to file ${filePath}`)
    }

  })
}

const args = process.argv.slice(2);
args.forEach(fileName => processFile(fileName));
