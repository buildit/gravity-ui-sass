const Color = require('color');
const kebabCase = require('lodash.kebabcase');
const { colorSchemes } = require('@buildit/gravity-particles');



function wcagRating(contrastRatio) {
  if (contrastRatio > 7) {
    return 'AAA';
  }
  if (contrastRatio > 4.5) {
    return 'AA';
  }
  if (contrastRatio > 3) {
    return 'A';
  }
  return 'Fail';
}

function gravityCssCustomPropName(group, colorName) {
  return `--grav-co-grp-${group}-${kebabCase(colorName)}`;
}


function generateColorSchemeTableData(colorScheme) {
  const groupAColorNames = Object.keys(colorScheme.groupA);
  const groupBColorNames = Object.keys(colorScheme.groupB);

  const tableData = [];
  const headerRow = [null].concat(groupAColorNames.map((name) => gravityCssCustomPropName('a', name))); // top-left cell is empty
  tableData.push(headerRow);

  // Loop "down" the rows of the table, one for each group B color
  for (let groupBColorName of groupBColorNames) {
    const row = [gravityCssCustomPropName('b', groupBColorName)]; // left-most cell has color name

    // Loop "across" the current row, adding one cell for each group A color
    for (let groupAColorName of groupAColorNames) {
      const colorPair = {
        colorA: colorScheme.groupA[groupAColorName],
        colorB: colorScheme.groupB[groupBColorName]
      };

      const colorA = new Color(colorPair.colorA);
      const colorB = new Color(colorPair.colorB);

      colorPair.contrastRatio = colorA.contrast(colorB);
      colorPair.wcagRating = wcagRating(colorPair.contrastRatio);

      row.push(colorPair);
    }

    tableData.push(row);
  }

  return tableData;
}


const colorSchemeTables = {};
Object.keys(colorSchemes).forEach(colorSchemeName => {
  const colorScheme = colorSchemes[colorSchemeName];
  colorSchemeTables[colorSchemeName] = generateColorSchemeTableData(colorScheme);
});

module.exports = colorSchemeTables;
