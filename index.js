'use strict';

const fs = require('fs');
const PDFDocument = require('./pdfkit-tables');
const doc = new PDFDocument();
const inputs = require('./values.json');
const headers = ['apptDate', 'name', 'service', 'product', 'discount', 'additional', 'totalAmount'];
const headersDesc = ['Date', 'Name', 'Service', 'Poduct', 'Discount', 'Extra', 'Total'];
const sumOutput = [0, 0, 0, 0, 0, 0, 0];
const output = [];

inputs.results.forEach(input => {
    // console.log(i['description'].split('\n'));
    const obj = []
    for (let i = 0; i< headers.length; i++) {
        const temp = headers[i];
        const value = input.doc[temp];        
        if (!isNaN(value)) sumOutput[i]+= value;
        obj.push(value);
    }    
    console.log(obj);
    output.push(obj);
});

output.push(sumOutput);

const a = headersDesc;
const b = output;

doc.pipe(fs.createWriteStream('example.pdf'));

console.log(a);
console.log(b);

const table0 = {
    headers: a,
    rows: b
};


doc.table(table0, {
    prepareHeader: () => doc.font('Helvetica-Bold'),
    prepareRow: (row, i) => doc.font('Helvetica').fontSize(10)
});

doc.end();
