(function(){
  function preselect(){
    var el=document.getElementById('state'); if(!el) return;
    var ds=document.documentElement.getAttribute('data-state')||document.body.getAttribute('data-state');
    if(!ds){var m=location.pathname.match(/calculate\/([a-z\-]+)-home-sale-calculator/i); if(m) ds=m[1];}
    if(!ds) return; var norm=ds.toLowerCase();
    for(var i=0;i<el.options.length;i++){
      var opt=el.options[i], v=(opt.value||'').toLowerCase(), t=(opt.text||'').toLowerCase();
      if(v===norm || t.indexOf(norm.replace(/-/g,' '))>-1){ el.selectedIndex=i; el.dispatchEvent(new Event('change',{bubbles:true})); break;}
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', preselect); else preselect();
})();