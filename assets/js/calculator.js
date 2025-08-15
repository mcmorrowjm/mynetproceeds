// calculator.js - Complete implementation with PDF generation and sharing

// State data with average price per square foot
const stateData = {
    'AL': { name: 'Alabama', ppsqft: 125, tax: 0.05 },
    'AK': { name: 'Alaska', ppsqft: 185, tax: 0 },
    'AZ': { name: 'Arizona', ppsqft: 215, tax: 0.049 },
    'AR': { name: 'Arkansas', ppsqft: 115, tax: 0.069 },
    'CA': { name: 'California', ppsqft: 425, tax: 0.133 },
    'CO': { name: 'Colorado', ppsqft: 285, tax: 0.0463 },
    'CT': { name: 'Connecticut', ppsqft: 225, tax: 0.0699 },
    'DE': { name: 'Delaware', ppsqft: 195, tax: 0.066 },
    'FL': { name: 'Florida', ppsqft: 245, tax: 0 },
    'GA': { name: 'Georgia', ppsqft: 165, tax: 0.0575 },
    'HI': { name: 'Hawaii', ppsqft: 615, tax: 0.11 },
    'ID': { name: 'Idaho', ppsqft: 235, tax: 0.06925 },
    'IL': { name: 'Illinois', ppsqft: 165, tax: 0.0495 },
    'IN': { name: 'Indiana', ppsqft: 135, tax: 0.0323 },
    'IA': { name: 'Iowa', ppsqft: 125, tax: 0.0853 },
    'KS': { name: 'Kansas', ppsqft: 135, tax: 0.057 },
    'KY': { name: 'Kentucky', ppsqft: 125, tax: 0.05 },
    'LA': { name: 'Louisiana', ppsqft: 145, tax: 0.06 },
    'ME': { name: 'Maine', ppsqft: 195, tax: 0.0715 },
    'MD': { name: 'Maryland', ppsqft: 245, tax: 0.0575 },
    'MA': { name: 'Massachusetts', ppsqft: 385, tax: 0.05 },
    'MI': { name: 'Michigan', ppsqft: 145, tax: 0.0425 },
    'MN': { name: 'Minnesota', ppsqft: 185, tax: 0.0985 },
    'MS': { name: 'Mississippi', ppsqft: 105, tax: 0.05 },
    'MO': { name: 'Missouri', ppsqft: 135, tax: 0.054 },
    'MT': { name: 'Montana', ppsqft: 245, tax: 0.069 },
    'NE': { name: 'Nebraska', ppsqft: 145, tax: 0.0684 },
    'NV': { name: 'Nevada', ppsqft: 225, tax: 0 },
    'NH': { name: 'New Hampshire', ppsqft: 265, tax: 0.05 },
    'NJ': { name: 'New Jersey', ppsqft: 285, tax: 0.1075 },
    'NM': { name: 'New Mexico', ppsqft: 175, tax: 0.059 },
    'NY': { name: 'New York', ppsqft: 325, tax: 0.109 },
    'NC': { name: 'North Carolina', ppsqft: 175, tax: 0.0525 },
    'ND': { name: 'North Dakota', ppsqft: 165, tax: 0.029 },
    'OH': { name: 'Ohio', ppsqft: 135, tax: 0.04797 },
    'OK': { name: 'Oklahoma', ppsqft: 115, tax: 0.05 },
    'OR': { name: 'Oregon', ppsqft: 285, tax: 0.099 },
    'PA': { name: 'Pennsylvania', ppsqft: 165, tax: 0.0307 },
    'RI': { name: 'Rhode Island', ppsqft: 285, tax: 0.0599 },
    'SC': { name: 'South Carolina', ppsqft: 155, tax: 0.07 },
    'SD': { name: 'South Dakota', ppsqft: 165, tax: 0 },
    'TN': { name: 'Tennessee', ppsqft: 165, tax: 0 },
    'TX': { name: 'Texas', ppsqft: 175, tax: 0 },
    'UT': { name: 'Utah', ppsqft: 275, tax: 0.0495 },
    'VT': { name: 'Vermont', ppsqft: 225, tax: 0.0875 },
    'VA': { name: 'Virginia', ppsqft: 195, tax: 0.0575 },
    'WA': { name: 'Washington', ppsqft: 335, tax: 0.07 },
    'WV': { name: 'West Virginia', ppsqft: 105, tax: 0.065 },
    'WI': { name: 'Wisconsin', ppsqft: 165, tax: 0.0765 },
    'WY': { name: 'Wyoming', ppsqft: 215, tax: 0 }
};

// Global variables for storing calculation results
let calculationResults = null;

// Initialize the calculator when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCalculator();
});

function initializeCalculator() {
    // Populate state dropdown
    const stateSelect = document.getElementById('state');
    if (stateSelect) {
        stateSelect.innerHTML = '<option value="">Select State</option>';
        for (const [code, data] of Object.entries(stateData)) {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = data.name;
            stateSelect.appendChild(option);
        }
        // Set default to California
        stateSelect.value = 'CA';
    }
    
    // Add event listeners
    const calcBtn = document.getElementById('calcBtn');
    if (calcBtn) {
        calcBtn.addEventListener('click', calculateNetProceeds);
    }
    
    const pdfBtn = document.getElementById('pdfBtn');
    if (pdfBtn) {
        pdfBtn.addEventListener('click', generatePDF);
    }
    
    // Add input event listeners for real-time updates
    const inputs = ['sqft', 'homeValue', 'state', 'condition'];
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', updateEstimate);
        }
    });
    
    // Update progress bar
    updateProgressBar();
    
    // Add event listeners for progress tracking
    document.querySelectorAll('input, select').forEach(element => {
        element.addEventListener('change', updateProgressBar);
    });
}

function updateProgressBar() {
    const requiredFields = ['state', 'sqft'];
    const optionalFields = ['homeValue', 'commission', 'closing', 'mortgage', 'repairs'];
    
    let filledRequired = 0;
    let filledOptional = 0;
    
    requiredFields.forEach(id => {
        const element = document.getElementById(id);
        if (element && element.value) filledRequired++;
    });
    
    optionalFields.forEach(id => {
        const element = document.getElementById(id);
        if (element && element.value) filledOptional++;
    });
    
    const progress = ((filledRequired / requiredFields.length) * 50) + 
                    ((filledOptional / optionalFields.length) * 50);
    
    const progressBar = document.querySelector('.progress span');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

function updateEstimate() {
    const stateCode = document.getElementById('state').value;
    const sqft = parseFloat(document.getElementById('sqft').value) || 0;
    const condition = parseFloat(document.getElementById('condition').value) || 0;
    const homeValue = parseFloat(document.getElementById('homeValue').value) || 0;
    
    if (stateCode && sqft > 0) {
        const state = stateData[stateCode];
        const baseValue = sqft * state.ppsqft;
        const adjustedValue = baseValue * (1 + condition);
        
        const estValue = homeValue || adjustedValue;
        const minRange = estValue * 0.9;
        const maxRange = estValue * 1.1;
        
        // Update display
        document.getElementById('estValue').textContent = '$' + estValue.toLocaleString();
        document.getElementById('estRange').textContent = 
            '$' + Math.round(minRange).toLocaleString() + ' - $' + Math.round(maxRange).toLocaleString();
        document.getElementById('pps').textContent = '$' + state.ppsqft;
        document.getElementById('cond').textContent = (condition * 100).toFixed(0) + '%';
        
        // Update cash offer
        const cashPct = parseFloat(document.getElementById('cashPct').value) || 80;
        const cashOffer = estValue * (cashPct / 100);
        document.getElementById('cashOffer').textContent = '$' + Math.round(cashOffer).toLocaleString();
    }
}

function calculateNetProceeds() {
    // Get all input values
    const inputs = {
        state: document.getElementById('state').value,
        sqft: parseFloat(document.getElementById('sqft').value) || 0,
        homeValue: parseFloat(document.getElementById('homeValue').value) || 0,
        condition: parseFloat(document.getElementById('condition').value) || 0,
        commission: parseFloat(document.getElementById('commission').value) || 5.5,
        closing: parseFloat(document.getElementById('closing').value) || 1.5,
        mortgage: parseFloat(document.getElementById('mortgage').value) || 0,
        repairs: parseFloat(document.getElementById('repairs').value) || 0,
        improvements: parseFloat(document.getElementById('improve').value) || 0,
        cashPct: parseFloat(document.getElementById('cashPct').value) || 80,
        propertyType: document.getElementById('ptype').value,
        filingStatus: document.getElementById('filing').value,
        purchasePrice: parseFloat(document.getElementById('purchase').value) || 0,
        yearsOwned: parseFloat(document.getElementById('years').value) || 5,
        yearsRented: parseFloat(document.getElementById('yearsRented').value) || 0,
        landPct: parseFloat(document.getElementById('landPct').value) || 20,
        depreciation: parseFloat(document.getElementById('depr').value) || 0,
        income: parseFloat(document.getElementById('income').value) || 100000,
        stateTaxOverride: parseFloat(document.getElementById('stateTaxOverride').value) || null,
        twoOfFive: document.getElementById('twoOfFive').checked
    };
    
    // Validate required fields
    if (!inputs.state || inputs.sqft === 0) {
        alert('Please fill in the required fields: State and Square Footage');
        return;
    }
    
    // Calculate home value
    const state = stateData[inputs.state];
    const estimatedValue = inputs.sqft * state.ppsqft * (1 + inputs.condition);
    const salePrice = inputs.homeValue || estimatedValue;
    
    // Calculate costs
    const commissionAmount = salePrice * (inputs.commission / 100);
    const closingCosts = salePrice * (inputs.closing / 100);
    const totalCosts = commissionAmount + closingCosts + inputs.mortgage + inputs.repairs;
    
    // Calculate capital gains
    const adjustedBasis = inputs.purchasePrice + inputs.improvements;
    let capitalGains = salePrice - adjustedBasis;
    
    // Handle depreciation for rentals
    let depreciationRecapture = 0;
    if (inputs.propertyType === 'Rental / Investment' && inputs.yearsRented > 0) {
        if (inputs.depreciation === 0) {
            // Auto-calculate depreciation
            const depreciableBasis = inputs.purchasePrice * (1 - inputs.landPct / 100);
            inputs.depreciation = (depreciableBasis / 27.5) * inputs.yearsRented;
        }
        depreciationRecapture = inputs.depreciation * 0.25; // 25% recapture rate
        capitalGains += inputs.depreciation; // Add back depreciation to gains
    }
    
    // Apply primary residence exclusion
    let taxableGains = capitalGains;
    let exclusionAmount = 0;
    if (inputs.propertyType === 'Primary residence' && inputs.twoOfFive) {
        exclusionAmount = inputs.filingStatus === 'Married filing jointly' ? 500000 : 250000;
        taxableGains = Math.max(0, capitalGains - exclusionAmount);
    }
    
    // Calculate federal tax
    let federalTaxRate = 0;
    if (inputs.yearsOwned > 1) {
        // Long-term capital gains rates
        if (inputs.filingStatus === 'Married filing jointly') {
            if (inputs.income < 94050) federalTaxRate = 0;
            else if (inputs.income < 583750) federalTaxRate = 0.15;
            else federalTaxRate = 0.20;
        } else {
            if (inputs.income < 47025) federalTaxRate = 0;
            else if (inputs.income < 518900) federalTaxRate = 0.15;
            else federalTaxRate = 0.20;
        }
    } else {
        // Short-term gains - use ordinary income rates (simplified)
        if (inputs.income < 50000) federalTaxRate = 0.12;
        else if (inputs.income < 100000) federalTaxRate = 0.22;
        else if (inputs.income < 200000) federalTaxRate = 0.24;
        else if (inputs.income < 400000) federalTaxRate = 0.32;
        else federalTaxRate = 0.35;
    }
    
    const federalTax = taxableGains * federalTaxRate;
    
    // Calculate state tax
    const stateTaxRate = inputs.stateTaxOverride !== null ? inputs.stateTaxOverride / 100 : state.tax;
    const stateTax = taxableGains * stateTaxRate;
    
    // Calculate net proceeds
    const totalTaxes = federalTax + stateTax + depreciationRecapture;
    const netProceeds = salePrice - totalCosts - totalTaxes;
    const netPct = (netProceeds / salePrice) * 100;
    
    // Store results for PDF generation
    calculationResults = {
        inputs: inputs,
        salePrice: salePrice,
        commissionAmount: commissionAmount,
        closingCosts: closingCosts,
        totalCosts: totalCosts,
        capitalGains: capitalGains,
        taxableGains: taxableGains,
        exclusionAmount: exclusionAmount,
        federalTax: federalTax,
        stateTax: stateTax,
        depreciationRecapture: depreciationRecapture,
        totalTaxes: totalTaxes,
        netProceeds: netProceeds,
        netPct: netPct,
        cashOffer: salePrice * (inputs.cashPct / 100),
        state: state
    };
    
    // Update display
    displayResults(calculationResults);
    
    // Show share options
    showShareOptions();
}

function displayResults(results) {
    // Update main KPI
    document.getElementById('netOut').textContent = '$' + Math.round(results.netProceeds).toLocaleString();
    document.getElementById('netPct').textContent = results.netPct.toFixed(1) + '% of sale price';
    
    // Update breakdown
    const breakdown = document.getElementById('breakdown');
    breakdown.innerHTML = `
        <div class="row">
            <div>
                <div class="muted">Sale Price</div>
                <div style="font-weight:600">$${results.salePrice.toLocaleString()}</div>
            </div>
            <div>
                <div class="muted">Cash Offer (${results.inputs.cashPct}%)</div>
                <div style="font-weight:600">$${Math.round(results.cashOffer).toLocaleString()}</div>
            </div>
        </div>
        <hr style="border:none;border-top:1px solid #e5e7eb"/>
        <div class="row">
            <div>
                <div class="muted">Commission (${results.inputs.commission}%)</div>
                <div style="color:#dc2626">-$${Math.round(results.commissionAmount).toLocaleString()}</div>
            </div>
            <div>
                <div class="muted">Closing Costs (${results.inputs.closing}%)</div>
                <div style="color:#dc2626">-$${Math.round(results.closingCosts).toLocaleString()}</div>
            </div>
        </div>
        <div class="row">
            <div>
                <div class="muted">Mortgage Payoff</div>
                <div style="color:#dc2626">-$${results.inputs.mortgage.toLocaleString()}</div>
            </div>
            <div>
                <div class="muted">Repairs/Prep</div>
                <div style="color:#dc2626">-$${results.inputs.repairs.toLocaleString()}</div>
            </div>
        </div>
        <hr style="border:none;border-top:1px solid #e5e7eb"/>
        <div class="row">
            <div>
                <div class="muted">Capital Gains</div>
                <div>$${Math.round(results.capitalGains).toLocaleString()}</div>
            </div>
            <div>
                <div class="muted">Exclusion Applied</div>
                <div style="color:#059669">$${results.exclusionAmount.toLocaleString()}</div>
            </div>
        </div>
        <div class="row">
            <div>
                <div class="muted">Federal Tax</div>
                <div style="color:#dc2626">-$${Math.round(results.federalTax).toLocaleString()}</div>
            </div>
            <div>
                <div class="muted">State Tax (${results.state.name})</div>
                <div style="color:#dc2626">-$${Math.round(results.stateTax).toLocaleString()}</div>
            </div>
        </div>
        ${results.depreciationRecapture > 0 ? `
        <div class="row">
            <div>
                <div class="muted">Depreciation Recapture</div>
                <div style="color:#dc2626">-$${Math.round(results.depreciationRecapture).toLocaleString()}</div>
            </div>
        </div>
        ` : ''}
        <hr style="border:none;border-top:1px solid #e5e7eb"/>
        <div class="row">
            <div>
                <div class="muted" style="font-weight:600">NET PROCEEDS</div>
                <div style="font-weight:800;color:#059669;font-size:1.25rem">$${Math.round(results.netProceeds).toLocaleString()}</div>
            </div>
        </div>
    `;
}

function showShareOptions() {
    // Add share buttons if they don't exist
    if (!document.getElementById('shareOptions')) {
        const shareHTML = `
            <div id="shareOptions" style="margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                <h4 style="margin-bottom: 0.5rem;">Share Your Results</h4>
                <div class="row" style="gap: 0.5rem;">
                    <button onclick="emailPDF()" class="btn" style="background: #059669;">
                        📧 Email PDF
                    </button>
                    <button onclick="shareLink()" class="btn" style="background: #3b82f6;">
                        🔗 Share Link
                    </button>
                    <button onclick="copyResults()" class="btn secondary">
                        📋 Copy Results
                    </button>
                </div>
                <div id="shareMessage" style="margin-top: 0.5rem; color: #059669; display: none;"></div>
            </div>
        `;
        
        const calcContainer = document.getElementById('calculator-container');
        calcContainer.insertAdjacentHTML('beforeend', shareHTML);
    }
}

function generatePDF() {
    if (!calculationResults) {
        alert('Please calculate your net proceeds first');
        return;
    }
    
    // Create PDF content
    const pdfContent = `
        <html>
        <head>
            <title>Home Sale Net Proceeds Report</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #2c3e50; }
                .header { background: #f8f9fa; padding: 20px; margin-bottom: 20px; }
                .section { margin: 20px 0; }
                .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
                .total { font-weight: bold; font-size: 1.2em; color: #059669; }
                .negative { color: #dc2626; }
                .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #ddd; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Home Sale Net Proceeds Report</h1>
                <p>Generated: ${new Date().toLocaleDateString()}</p>
                <p>Property: ${calculationResults.inputs.sqft} sq ft in ${calculationResults.state.name}</p>
            </div>
            
            <div class="section">
                <h2>Sale Details</h2>
                <div class="row">
                    <span>Sale Price:</span>
                    <span>$${calculationResults.salePrice.toLocaleString()}</span>
                </div>
                <div class="row">
                    <span>Cash Offer Alternative:</span>
                    <span>$${Math.round(calculationResults.cashOffer).toLocaleString()}</span>
                </div>
            </div>
            
            <div class="section">
                <h2>Costs & Deductions</h2>
                <div class="row">
                    <span>Real Estate Commission:</span>
                    <span class="negative">-$${Math.round(calculationResults.commissionAmount).toLocaleString()}</span>
                </div>
                <div class="row">
                    <span>Closing Costs:</span>
                    <span class="negative">-$${Math.round(calculationResults.closingCosts).toLocaleString()}</span>
                </div>
                <div class="row">
                    <span>Mortgage Payoff:</span>
                    <span class="negative">-$${calculationResults.inputs.mortgage.toLocaleString()}</span>
                </div>
                <div class="row">
                    <span>Repairs/Prep Costs:</span>
                    <span class="negative">-$${calculationResults.inputs.repairs.toLocaleString()}</span>
                </div>
            </div>
            
            <div class="section">
                <h2>Tax Calculations</h2>
                <div class="row">
                    <span>Capital Gains:</span>
                    <span>$${Math.round(calculationResults.capitalGains).toLocaleString()}</span>
                </div>
                <div class="row">
                    <span>Primary Residence Exclusion:</span>
                    <span>$${calculationResults.exclusionAmount.toLocaleString()}</span>
                </div>
                <div class="row">
                    <span>Taxable Gains:</span>
                    <span>$${Math.round(calculationResults.taxableGains).toLocaleString()}</span>
                </div>
                <div class="row">
                    <span>Federal Capital Gains Tax:</span>
                    <span class="negative">-$${Math.round(calculationResults.federalTax).toLocaleString()}</span>
                </div>
                <div class="row">
                    <span>State Tax (${calculationResults.state.name}):</span>
                    <span class="negative">-$${Math.round(calculationResults.stateTax).toLocaleString()}</span>
                </div>
                ${calculationResults.depreciationRecapture > 0 ? `
                <div class="row">
                    <span>Depreciation Recapture:</span>
                    <span class="negative">-$${Math.round(calculationResults.depreciationRecapture).toLocaleString()}</span>
                </div>
                ` : ''}
            </div>
            
            <div class="section">
                <div class="row total">
                    <span>NET PROCEEDS:</span>
                    <span>$${Math.round(calculationResults.netProceeds).toLocaleString()}</span>
                </div>
                <div class="row">
                    <span>Percentage of Sale Price:</span>
                    <span>${calculationResults.netPct.toFixed(1)}%</span>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>Disclaimer:</strong> This is an estimate for planning purposes only. Actual proceeds may vary. Consult with real estate and tax professionals for accurate calculations.</p>
                <p>Report generated by MyNetProceeds.com</p>
            </div>
        </body>
        </html>
    `;
    
    // Create blob and download
    const blob = new Blob([pdfContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    
    // For actual PDF generation, you would use a library like jsPDF
    // For now, we'll download as HTML that can be printed to PDF
    const a = document.createElement('a');
    a.href = url;
    a.download = `net-proceeds-report-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showMessage('Report downloaded! Open the file and print to PDF for best results.');
}

function emailPDF() {
    if (!calculationResults) {
        alert('Please calculate your net proceeds first');
        return;
    }
    
    // Create email body
    const emailBody = `
Hello,

Here are my home sale net proceeds calculation results:

PROPERTY DETAILS
- Location: ${calculationResults.state.name}
- Square Footage: ${calculationResults.inputs.sqft} sq ft
- Sale Price: $${calculationResults.salePrice.toLocaleString()}

COSTS & DEDUCTIONS
- Real Estate Commission: -$${Math.round(calculationResults.commissionAmount).toLocaleString()}
- Closing Costs: -$${Math.round(calculationResults.closingCosts).toLocaleString()}
- Mortgage Payoff: -$${calculationResults.inputs.mortgage.toLocaleString()}
- Repairs/Prep: -$${calculationResults.inputs.repairs.toLocaleString()}

TAXES
- Federal Tax: -$${Math.round(calculationResults.federalTax).toLocaleString()}
- State Tax: -$${Math.round(calculationResults.stateTax).toLocaleString()}

NET PROCEEDS: $${Math.round(calculationResults.netProceeds).toLocaleString()} (${calculationResults.netPct.toFixed(1)}% of sale price)

Calculate your own at: ${window.location.href}

Best regards,
MyNetProceeds.com
    `.trim();
    
    // Create mailto link
    const subject = encodeURIComponent('Home Sale Net Proceeds Calculation');
    const body = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    showMessage('Opening your email client...');
}

function shareLink() {
    // Create shareable URL with parameters
    const params = new URLSearchParams();
    
    if (calculationResults) {
        params.append('state', calculationResults.inputs.state);
        params.append('sqft', calculationResults.inputs.sqft);
        params.append('value', calculationResults.salePrice);
        params.append('mortgage', calculationResults.inputs.mortgage);
    }
    
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    
    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share({
            title: 'Home Sale Net Proceeds Calculator',
            text: `Check out my home sale calculation: Net Proceeds of $${Math.round(calculationResults.netProceeds).toLocaleString()}`,
            url: shareUrl
        }).then(() => {
            showMessage('Shared successfully!');
        }).catch((error) => {
            // Fallback to copying link
            copyToClipboard(shareUrl);
        });
    } else {
        // Fallback: Copy to clipboard
        copyToClipboard(shareUrl);
    }
}

function copyResults() {
    if (!calculationResults) {
        alert('Please calculate your net proceeds first');
        return;
    }
    
    const textResults = `
Home Sale Net Proceeds Calculation
===================================
Sale Price: $${calculationResults.salePrice.toLocaleString()}
Commission: -$${Math.round(calculationResults.commissionAmount).toLocaleString()}
Closing Costs: -$${Math.round(calculationResults.closingCosts).toLocaleString()}
Mortgage Payoff: -$${calculationResults.inputs.mortgage.toLocaleString()}
Repairs: -$${calculationResults.inputs.repairs.toLocaleString()}
Federal Tax: -$${Math.round(calculationResults.federalTax).toLocaleString()}
State Tax: -$${Math.round(calculationResults.stateTax).toLocaleString()}
-----------------------------------
NET PROCEEDS: $${Math.round(calculationResults.netProceeds).toLocaleString()}
(${calculationResults.netPct.toFixed(1)}% of sale price)
    `.trim();
    
    copyToClipboard(textResults);
}

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showMessage('Copied to clipboard!');
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showMessage('Copied to clipboard!');
    } catch (err) {
        showMessage('Failed to copy. Please select and copy manually.');
    }
    
    document.body.removeChild(textarea);
}

function showMessage(message) {
    const messageEl = document.getElementById('shareMessage');
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.style.display = 'block';
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    }
}

// Load parameters from URL if present
function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('state')) {
        document.getElementById('state').value = params.get('state');
    }
    if (params.has('sqft')) {
        document.getElementById('sqft').value = params.get('sqft');
    }
    if (params.has('value')) {
        document.getElementById('homeValue').value = params.get('value');
    }
    if (params.has('mortgage')) {
        document.getElementById('mortgage').value = params.get('mortgage');
    }
    
    // Auto-calculate if we have the minimum required fields
    if (params.has('state') && params.has('sqft')) {
        setTimeout(() => {
            calculateNetProceeds();
        }, 500);
    }
}

// Call loadFromURL when the page loads
window.addEventListener('load', loadFromURL);

// Add PDF library integration instructions comment
/*
 * For production PDF generation, integrate one of these libraries:
 * 
 * Option 1: jsPDF (recommended)
 * Add to HTML: <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
 * 
 * Option 2: PDFKit
 * Add to HTML: <script src="https://cdn.jsdelivr.net/npm/pdfkit@0.13.0/js/pdfkit.standalone.js"></script>
 * 
 * Then replace the generatePDF function with proper PDF generation code
 */