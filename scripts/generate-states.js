// Generate state landing pages for SEO (optional)
const fs = require('fs'); const path = require('path');
const states = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','state_data.json'),'utf8'));
const outDir = path.join(__dirname,'..','states'); if(!fs.existsSync(outDir)) fs.mkdirSync(outDir);
const template = (code)=>`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Net Proceeds Calculator — ${code}</title>
<link rel="canonical" href="/">
<style>body{font-family:Arial,Helvetica,sans-serif;max-width:860px;margin:20px auto;padding:0 16px;line-height:1.6}</style></head>
<body><h1>Net Proceeds Calculator — ${code}</h1>
<p>Use the main calculator to estimate your take-home when selling a home in ${code}. Defaults on this page reflect typical averages for ${code}.</p>
<p><a href="/">Back to calculator</a></p></body></html>`;
for(const code of Object.keys(states)){
  fs.writeFileSync(path.join(outDir,`${code}.html`), template(code));
}
console.log('Generated state pages in /states');