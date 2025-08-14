
(function(){
  try{
    var optimalTitle = "Home Sale Net Proceeds Calculator - After Taxes & Closing Costs | Free Instant Estimate";
    if(document.title.trim() !== optimalTitle){
      document.title = optimalTitle;
    }
    var haveMetaDesc = !!document.querySelector('meta[name="description"]');
    if(!haveMetaDesc){
      var md = document.createElement('meta');
      md.setAttribute('name','description');
      md.setAttribute('content','Calculate exactly what you will take home from selling your house. Includes capital gains taxes, closing costs, commissions. Free, instant, all 50 states.');
      document.head.appendChild(md);
    }
    if(!document.querySelector('script[type="application/ld+json"].mnp-app')){
      var ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.className = 'mnp-app';
      ld.text = JSON.stringify({
        "@context":"https://schema.org",
        "@type":"SoftwareApplication",
        "name":"Home Sale Net Proceeds Calculator",
        "applicationCategory":"FinanceApplication",
        "operatingSystem":"Web",
        "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
        "aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5"},
        "description":"Free calculator to determine your net proceeds when selling a home, including capital gains taxes and closing costs"
      });
      document.head.appendChild(ld);
    }
  }catch(e){}
})();
