const fs = require('fs');
const { execSync } = require('child_process');

const names = fs.readFileSync(`${process.cwd()}/names.csv`).toString().split('\r\n');
const template = fs.readFileSync(`${process.cwd()}/template.svg`).toString();

const SVG_OUTDIR = `${process.cwd()}/svgs`;
const PDF_OUTDIR = `${process.cwd()}/pdfs`;
fs.mkdirSync(SVG_OUTDIR, { recursive: true });
fs.mkdirSync(PDF_OUTDIR, { recursive: true });

const firstNameFontSizes = {
  normal: '70',
  small: '61',
  smaller: '54',
  smallest: '50',
  tiny: '42',
};

const lastNameFontSizes = {
  normal: '35',
  small: '31',
};

function generateOutFileSvg({ first, last }) {
  return `${SVG_OUTDIR}/${first.toLowerCase()}-${last.toLowerCase()}.svg`;
}

function generateOutFilePdf({ first, last }) {
  return `${PDF_OUTDIR}/${first.toLowerCase()}-${last.toLowerCase()}.pdf`;
}

function createPdf({ first, last, firstNameFontSize, lastNameFontSize, getSvgName = generateOutFileSvg, getPdfName = generateOutFilePdf }) {
  const namedSvg = template
    .replace('FIRSTNAMEFONTSIZE', firstNameFontSizes[firstNameFontSize || 'normal'])
    .replace('LASTNAMEFONTSIZE', lastNameFontSizes[lastNameFontSize || 'normal'])
    .replace('FIRSTNAME', first)
    .replace('LASTNAME', last);

  const svgOut = getSvgName({ first, last });

  fs.writeFileSync(svgOut, namedSvg);
  console.log(`written ${svgOut}`);

  const pdfOut = getPdfName({ first, last });

  execSync(`cairosvg -f pdf -d 76.2711864407 -o "${pdfOut}" "${svgOut}"`, { cwd: process.cwd() });
  console.log(`written ${pdfOut}`);
}

names.forEach(name => {
  const [first = '', last = '', firstNameFontSize, lastNameFontSize] = name.split(',');
  if (first || last) {
    createPdf({ first, last, firstNameFontSize, lastNameFontSize });
  }
});

createPdf({ first: '', last: '', getSvgName: () => `${SVG_OUTDIR}/blank.svg`, getPdfName: () => 'blank.pdf' });
