// Global state
let STATE_DATA = {};
let GA_ID = 'G-BL8VF8VB5D'; // already embedded in HTML head

function fmt(n, d=0){ return isNaN(n)?'—':n.toLocaleString(undefined,{maximumFractionDigits:d}); }

async function fetchStateData(){
  const res = await fetch('/data/state_data.json'); STATE_DATA = await res.json();
}

function cgtRate(income, filing){
  const S=[0,47025,518900], M=[0,94050,583750];
  const b = filing==='Married filing jointly'?M:S;
  if(income<=b[1])return 0; if(income<=b[2])return .15; return .20;
}

async function getAVMEstimate({ address, zip, state, sqft, conditionFactor }){
  try{
    const res = await fetch('/.netlify/functions/estimate', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ address, zip, state, sqft, conditionFactor }) });
    if(!res.ok) throw new Error('AVM unavailable');
    const data = await res.json();
    return data.estimate || 0;
  }catch(e){ return 0; }
}

async function computeAutoEstimate(){
  const st = document.getElementById('state').value;
  const sqft = parseFloat(document.getElementById('sqft').value)||0;
  const cond = parseFloat(document.getElementById('condition').value)||0;
  const pps = STATE_DATA[st]?.pps||250;
  const address = document.getElementById('addr').value.trim();
  const zip = document.getElementById('zip').value.trim();
  let estimate=0, badge='Heuristic';
  if(address && zip){
    const avm = await getAVMEstimate({ address, zip, state: st.substr(0,2).toUpperCase(), sqft, conditionFactor: cond });
    if(avm>0){ estimate=avm; badge='AVM (beta)'; }
  }
  if(!estimate && sqft>0){ estimate = pps * sqft * (1+cond); }
  const low = estimate*0.92, high=estimate*1.08;
  document.getElementById('pps').innerText = `$${fmt(pps)}/sqft`;
  document.getElementById('cond').innerText = `${(cond*100).toFixed(0)}%`;
  document.getElementById('estBadge').innerText = badge;
  if(estimate>0){
    document.getElementById('estValue').innerHTML = `<span class="pill">Estimate</span> $${fmt(estimate)}`;
    document.getElementById('estRange').innerText = `$${fmt(low)} – $${fmt(high)}`;
  } else {
    document.getElementById('estValue').innerText = 'Enter sqft (and pick a state)';
    document.getElementById('estRange').innerText = '—';
  }
  const cashPct=(parseFloat(document.getElementById('cashPct').value)||80)/100;
  document.getElementById('cashOffer').innerText = estimate? `$${fmt(estimate*cashPct)}` : '—';
  return estimate;
}

function progressUpdate(){
  const ids=['state','sqft','commission','closing','mortgage','ptype','filing','income'];
  const filled = ids.reduce((acc,id)=> acc + (!!document.getElementById(id)?.value ? 1 : 0), 0);
  const pct = Math.round((filled/ids.length)*100);
  document.querySelector('.progress>span').style.width = pct+'%';
}

async function calc(){
  progressUpdate();
  const manual = parseFloat(document.getElementById('homeValue').value);
  const auto = await computeAutoEstimate();
  const salePrice = (manual>0? manual : auto) || 0;

  const commission = salePrice * ((parseFloat(document.getElementById('commission').value)||0)/100);
  const closing = salePrice * ((parseFloat(document.getElementById('closing').value)||0)/100);
  const mortgage = parseFloat(document.getElementById('mortgage').value)||0;
  const repairs = parseFloat(document.getElementById('repairs').value)||0;
  const ptype = document.getElementById('ptype').value;
  const filing = document.getElementById('filing').value;
  const purchase = parseFloat(document.getElementById('purchase').value)||0;
  const income = parseFloat(document.getElementById('income').value)||0;
  const twoOfFive = document.getElementById('twoOfFive').checked;
  const stateKey = document.getElementById('state').value;
  const stTax = (STATE_DATA[stateKey]?.tax||0)/100;
  const stOverride = parseFloat(document.getElementById('stateTaxOverride').value);
  const improve = parseFloat(document.getElementById('improve').value)||0;
  let gain = Math.max(salePrice - (purchase + improve), 0);
  const yearsRented = parseFloat(document.getElementById('yearsRented').value)||0;
  const landPct = parseFloat(document.getElementById('landPct').value)||20;
  let depr = parseFloat(document.getElementById('depr').value);
  if(ptype!=='Primary residence'){
    if(isNaN(depr)||depr<=0){ const depreciable = Math.max(purchase * (1 - landPct/100), 0); depr = (depreciable/27.5) * Math.max(yearsRented,0); }
  } else { depr = 0; }
  const recapture = depr>0 ? depr*0.25 : 0;
  let exclusion = 0; if(ptype==='Primary residence' && twoOfFive){ exclusion = filing==='Married filing jointly'?500000:250000; }
  const taxableGain = Math.max(gain - exclusion - (depr||0), 0);
  const fed = taxableGain * cgtRate(income, filing);
  const statePct = isNaN(stOverride)? stTax : (stOverride/100);
  const stateTax = taxableGain * statePct;
  const taxes = fed + stateTax + recapture;
  const net = salePrice - commission - closing - mortgage - repairs - taxes;
  const netPct = salePrice>0 ? (net/salePrice)*100 : 0;

  document.getElementById('netOut').innerText = `$${fmt(Math.max(net,0))}`;
  document.getElementById('netPct').innerText = salePrice>0 ? `${netPct.toFixed(1)}% of sale price` : '';
  document.getElementById('stickyNet').innerText = `$${fmt(Math.max(net,0))}`;

  const rows = [
    ['Sale price', salePrice],
    ['Commission', -commission],
    ['Other closing', -closing],
    ['Repairs / prep', -repairs],
    ['Mortgage payoff', -mortgage],
    ['Depreciation recapture (est.)', -recapture],
    ['Federal capital gains (est.)', -fed],
    ['State tax (est.)', -stateTax],
    ['Net proceeds', net]
  ];
  document.getElementById('breakdown').innerHTML = rows.map(([label,val],i)=>{
    const isNet = i===rows.length-1;
    const sign = val<0? ' style="color:#dc2626"' : (isNet? ' style="color:#16a34a"' : '');
    return `<div class="row"><div>${label}</div><div style="text-align:right"${sign}>$${fmt(Math.abs(val))}</div></div>`;
  }).join('');
}

function bind(){
  const ids=['addr','zip','homeValue','state','sqft','condition','commission','closing','mortgage','repairs','improve','ptype','filing','purchase','years','yearsRented','landPct','depr','income','stateTaxOverride','twoOfFive','cashPct'];
  ids.forEach(id=>{ const el=document.getElementById(id); if(el){ el.addEventListener('input', ()=>{ calc(); }); }});
  document.getElementById('calcBtn').addEventListener('click', e=>{e.preventDefault(); calc(); scrollTo({top:0,behavior:'smooth'});});
  document.getElementById('calcBtn2').addEventListener('click', e=>{e.preventDefault(); calc();});
  document.getElementById('pdfBtn').addEventListener('click', ()=>{
    const orig = document.title; const addr = document.getElementById('addr').value.trim();
    if(addr) document.title = `Home-Estimate-and-Net-Proceeds-${addr.replace(/\s+/g,'-')}`; window.print(); setTimeout(()=>{ document.title = orig; }, 500);
  });
  document.getElementById('shareBtn').addEventListener('click', async ()=>{ try{ await navigator.clipboard.writeText(location.href); alert('Link copied to clipboard'); } catch{ alert('Copy this page URL to share your results.'); }});
  document.getElementById('emailForm').addEventListener('submit', (e)=>{
    // Netlify Forms handles submission; show a friendly message
    setTimeout(()=>{ alert('Thanks! We’ll email your PDF shortly.'); }, 200);
  });
}

async function init(){
  await fetchStateData();
  const sel = document.getElementById('state');
  sel.innerHTML = Object.keys(STATE_DATA).map(s=>`<option value="${s}">${s.replace(/-/g,' ')}</option>`).join('');
  sel.value = 'california'; bind(); calc();
}

document.addEventListener('DOMContentLoaded', init);