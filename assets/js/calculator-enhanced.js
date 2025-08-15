// calculator-enhanced.js - Complete implementation with autocomplete, charts, and all features

// State data with comprehensive information
const stateData = {
    'AL': { name: 'Alabama', ppsqft: 125, tax: 0.05, full: 'Alabama' },
    'AK': { name: 'Alaska', ppsqft: 185, tax: 0, full: 'Alaska' },
    'AZ': { name: 'Arizona', ppsqft: 215, tax: 0.049, full: 'Arizona' },
    'AR': { name: 'Arkansas', ppsqft: 115, tax: 0.069, full: 'Arkansas' },
    'CA': { name: 'California', ppsqft: 425, tax: 0.133, full: 'California' },
    'CO': { name: 'Colorado', ppsqft: 285, tax: 0.0463, full: 'Colorado' },
    'CT': { name: 'Connecticut', ppsqft: 225, tax: 0.0699, full: 'Connecticut' },
    'DE': { name: 'Delaware', ppsqft: 195, tax: 0.066, full: 'Delaware' },
    'FL': { name: 'Florida', ppsqft: 245, tax: 0, full: 'Florida' },
    'GA': { name: 'Georgia', ppsqft: 165, tax: 0.0575, full: 'Georgia' },
    'HI': { name: 'Hawaii', ppsqft: 615, tax: 0.11, full: 'Hawaii' },
    'ID': { name: 'Idaho', ppsqft: 235, tax: 0.06925, full: 'Idaho' },
    'IL': { name: 'Illinois', ppsqft: 165, tax: 0.0495, full: 'Illinois' },
    'IN': { name: 'Indiana', ppsqft: 135, tax: 0.0323, full: 'Indiana' },
    'IA': { name: 'Iowa', ppsqft: 125, tax: 0.0853, full: 'Iowa' },
    'KS': { name: 'Kansas', ppsqft: 135, tax: 0.057, full: 'Kansas' },
    'KY': { name: 'Kentucky', ppsqft: 125, tax: 0.05, full: 'Kentucky' },
    'LA': { name: 'Louisiana', ppsqft: 145, tax: 0.06, full: 'Louisiana' },
    'ME': { name: 'Maine', ppsqft: 195, tax: 0.0715, full: 'Maine' },
    'MD': { name: 'Maryland', ppsqft: 245, tax: 0.0575, full: 'Maryland' },
    'MA': { name: 'Massachusetts', ppsqft: 385, tax: 0.05, full: 'Massachusetts' },
    'MI': { name: 'Michigan', ppsqft: 145, tax: 0.0425, full: 'Michigan' },
    'MN': { name: 'Minnesota', ppsqft: 185, tax: 0.0985, full: 'Minnesota' },
    'MS': { name: 'Mississippi', ppsqft: 105, tax: 0.05, full: 'Mississippi' },
    'MO': { name: 'Missouri', ppsqft: 135, tax: 0.054, full: 'Missouri' },
    'MT': { name: 'Montana', ppsqft: 245, tax: 0.069, full: 'Montana' },
    'NE': { name: 'Nebraska', ppsqft: 145, tax: 0.0684, full: 'Nebraska' },
    'NV': { name: 'Nevada', ppsqft: 225, tax: 0, full: 'Nevada' },
    'NH': { name: 'New Hampshire', ppsqft: 265, tax: 0.05, full: 'New Hampshire' },
    'NJ': { name: 'New Jersey', ppsqft: 285, tax: 0.1075, full: 'New Jersey' },
    'NM': { name: 'New Mexico', ppsqft: 175, tax: 0.059, full: 'New Mexico' },
    'NY': { name: 'New York', ppsqft: 325, tax: 0.109, full: 'New York' },
    'NC': { name: 'North Carolina', ppsqft: 175, tax: 0.0525, full: 'North Carolina' },
    'ND': { name: 'North Dakota', ppsqft: 165, tax: 0.029, full: 'North Dakota' },
    'OH': { name: 'Ohio', ppsqft: 135, tax: 0.04797, full: 'Ohio' },
    'OK': { name: 'Oklahoma', ppsqft: 115, tax: 0.05, full: 'Oklahoma' },
    'OR': { name: 'Oregon', ppsqft: 285, tax: 0.099, full: 'Oregon' },
    'PA': { name: 'Pennsylvania', ppsqft: 165, tax: 0.0307, full: 'Pennsylvania' },
    'RI': { name: 'Rhode Island', ppsqft: 285, tax: 0.0599, full: 'Rhode Island' },
    'SC': { name: 'South Carolina', ppsqft: 155, tax: 0.07, full: 'South Carolina' },
    'SD': { name: 'South Dakota', ppsqft: 165, tax: 0, full: 'South Dakota' },
    'TN': { name: 'Tennessee', ppsqft: 165, tax: 0, full: 'Tennessee' },
    'TX': { name: 'Texas', ppsqft: 175, tax: 0, full: 'Texas' },
    'UT': { name: 'Utah', ppsqft: 275, tax: 0.0495, full: 'Utah' },
    'VT': { name: 'Vermont', ppsqft: 225, tax: 0.0875, full: 'Vermont' },
    'VA': { name: 'Virginia', ppsqft: 195, tax: 0.0575, full: 'Virginia' },
    'WA': { name: 'Washington', ppsqft: 335, tax: 0.07, full: 'Washington' },
    'WV': { name: 'West Virginia', ppsqft: 105, tax: 0.065, full: 'West Virginia' },
    'WI': { name: 'Wisconsin', ppsqft: 165, tax: 0.0765, full: 'Wisconsin' },
    'WY': { name: 'Wyoming', ppsqft: 215, tax: 0, full: 'Wyoming' }
};

// Mock address database for autocomplete
const addressDatabase = [
    { street: '123 Main Street', city: 'San Francisco', state: 'CA', zip: '94102' },
    { street: '456 Oak Avenue', city: 'Los Angeles', state: 'CA', zip: '90001' },
    { street: '789 Pine Road', city: 'New York', state: 'NY', zip: '10001' },
    { street: '321 Elm Street', city: 'Chicago', state: 'IL', zip: '60601' },
    { street: '654 Maple Drive', city: 'Houston', state: 'TX', zip: '77001' },
    { street: '987 Cedar Lane', city: 'Phoenix', state: 'AZ', zip: '85001' },
    { street: '147 Birch Way', city: 'Philadelphia', state: 'PA', zip: '19101' },
    { street: '258 Willow Court', city: 'San Antonio', state: 'TX', zip: '78201' },
    { street: '369 Spruce Avenue', city: 'San Diego', state: 'CA', zip: '92101' },
    { street: '741 Ash Boulevard', city: 'Dallas', state: 'TX', zip: '75201' }
];

// Global variables
let calculationResults = null;
let costChart = null;
let taxChart = null;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCalculator();
    initializeAutocomplete();
    initializeCharts();
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
    }
    
    // Load from URL parameters if present
    loadFromURL();
    
    // Add input validation
    addInputValidation();
}

function initializeAutocomplete() {
    const addressInput = document.getElementById('addr');
    const suggestionsDiv = document.getElementById('addressSuggestions');
    let selectedIndex = -1;
    
    if (!addressInput || !suggestionsDiv) return;
    
    // Input event for filtering
    addressInput.addEventListener('input', function(e) {
        const value = e.target.value.toLowerCase();
        
        if (value.length < 2) {
            suggestionsDiv.classList.remove('active');
            return;
        }
        
        // Filter addresses
        const matches = addressDatabase.filter(addr => {
            const fullAddress = `${addr.street} ${addr.city} ${addr.state}`.toLowerCase();
            return fullAddress.includes(value);
        });
        
        // Display suggestions
        if (matches.length > 0) {
            suggestionsDiv.innerHTML = matches.slice(0, 5).map((addr, index) => `
                <div class="suggestion-item" data-index="${index}" 
                     data-state="${addr.state}" data-zip="${addr.zip}">
                    <strong>${addr.street}</strong><br>
                    <span style="color: #666; font-size: 0.9em;">
                        ${addr.city}, ${addr.state} ${addr.zip}
                    </span>
                </div>
            `).join('');
            
            suggestionsDiv.classList.add('active');
            selectedIndex = -1;
        } else {
            suggestionsDiv.classList.remove('active');
        }
    });
    
    // Keyboard navigation
    addressInput.addEventListener('keydown', function(e) {
        const items = suggestionsDiv.querySelectorAll('.suggestion-item');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
            updateSelection(items, selectedIndex);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            updateSelection(items, selectedIndex);
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            selectAddress(items[selectedIndex]);
        } else if (e.key === 'Escape') {
            suggestionsDiv.classList.remove('active');
        }
    });
    
    // Click selection
    suggestionsDiv.addEventListener('click', function(e) {
        const item = e.target.closest('.suggestion-item');
        if (item) {
            selectAddress(item);
        }
    });
    
    // Close on outside click
    document.addEventListener('click', function(e) {
        if (!addressInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
            suggestionsDiv.classList.remove('active');
        }
    });
}

function updateSelection(items, index) {
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

function selectAddress(item) {
    const addressInput = document.getElementById('addr');
    const suggestionsDiv = document.getElementById('addressSuggestions');
    const address = item.querySelector('strong').textContent;
    const state = item.dataset.state;
    const zip = item.dataset.zip;
    
    // Fill in the fields
    addressInput.value = address;
    document.getElementById('zip').value = zip;
    document.getElementById('state').value = state;
    
    // Hide suggestions
    suggestionsDiv.classList.remove('active');
    
    // Trigger calculation preview
    updateEstimate();
}

function initializeCharts() {
    // Chart.js default configuration
    Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    Chart.defaults.plugins.legend.position = 'bottom';
}

function addInputValidation() {
    // Add real-time validation
    const requiredInputs = document.querySelectorAll('input[required], select[required]');
    
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });
}

function validateInput(input) {
    const errorMsg = document.getElementById('errorMessage');
    
    if (input.value === '') {
        input.style.borderColor = '#e74c3c';
        showError(`Please fill in ${input.previousElementSibling.textContent.replace('*', '').trim()}`);
        return false;
    } else {
        input.style.borderColor = '#ddd';
        hideError();
        return true;
    }
}

function showError(message) {
    const errorMsg = document.getElementById('errorMessage');
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
    setTimeout(() => {
        errorMsg.style.display = 'none';
    }, 5000);
}

function hideError() {
    document.getElementById('errorMessage').style.display = 'none';
}

function showSuccess(message) {
    const successMsg = document.getElementById('successMessage');
    successMsg.textContent = message;
    successMsg.style.display = 'block';
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 5000);
}

function calculateProceeds() {
    // Validate required fields
    const state = document.getElementById('state').value;
    const sqft = parseFloat(document.getElementById('sqft').value) || 0;
    
    if (!state || sqft === 0) {
        showError('Please fill in all required fields (State and Square Footage)');
        return;
    }
    
    // Gather all inputs
    const inputs = {
        state: state,
        sqft: sqft,
        homeValue: parseFloat(document.getElementById('homeValue').value) || 0,
        condition: parseFloat(document.getElementById('condition').value) || 0,
        commission: parseFloat(document.getElementById('commission').value) || 5.5,
        closing: parseFloat(document.getElementById('closing').value) || 1.5,
        mortgage: parseFloat(document.getElementById('mortgage').value) || 0,
        repairs: parseFloat(document.getElementById('repairs').value) || 0,
        propertyType: document.getElementById('ptype').value,
        filingStatus: document.getElementById('filing').value,
        purchasePrice: parseFloat(document.getElementById('purchase').value) || 0,
        improvements: parseFloat(document.getElementById('improvements').value) || 0,
        yearsOwned: parseFloat(document.getElementById('years').value) || 5,
        income: parseFloat(document.getElementById('income').value) || 100000,
        twoOfFive: document.getElementById('twoOfFive').checked
    };
    
    // Calculate home value
    const stateInfo = stateData[inputs.state];
    const estimatedValue = inputs.sqft * stateInfo.ppsqft * (1 + inputs.condition);
    const salePrice = inputs.homeValue || estimatedValue;
    
    // Calculate costs
    const commissionAmount = salePrice * (inputs.commission / 100);
    const closingCosts = salePrice * (inputs.closing / 100);
    const totalCosts = commissionAmount + closingCosts + inputs.mortgage + inputs.repairs;
    
    // Calculate capital gains
    const adjustedBasis = inputs.purchasePrice + inputs.improvements;
    const capitalGains = Math.max(0, salePrice - adjustedBasis);
    
    // Apply exclusions
    let taxableGains = capitalGains;
    let exclusionAmount = 0;
    
    if (inputs.propertyType === 'Primary Residence' && inputs.twoOfFive) {
        if (inputs.filingStatus === 'Married Filing Jointly') {
            exclusionAmount = 500000;
        } else {
            exclusionAmount = 250000;
        }
        taxableGains = Math.max(0, capitalGains - exclusionAmount);
    }
    
    // Calculate federal tax
    let federalTaxRate = 0;
    if (inputs.yearsOwned > 1) {
        // Long-term capital gains
        if (inputs.filingStatus === 'Married Filing Jointly') {
            if (inputs.income < 94050) federalTaxRate = 0;
            else if (inputs.income < 583750) federalTaxRate = 0.15;
            else federalTaxRate = 0.20;
        } else {
            if (inputs.income < 47025) federalTaxRate = 0;
            else if (inputs.income < 518900) federalTaxRate = 0.15;
            else federalTaxRate = 0.20;
        }
    } else {
        // Short-term gains
        federalTaxRate = 0.22; // Simplified
    }
    
    const federalTax = taxableGains * federalTaxRate;
    const stateTax = taxableGains * stateInfo.tax;
    const totalTaxes = federalTax + stateTax;
    
    // Calculate net proceeds
    const netProceeds = salePrice - totalCosts - totalTaxes;
    const netPercent = (netProceeds / salePrice) * 100;
    
    // Store results
    calculationResults = {
        salePrice: salePrice,
        commissionAmount: commissionAmount,
        closingCosts: closingCosts,
        mortgage: inputs.mortgage,
        repairs: inputs.repairs,
        totalCosts: totalCosts,
        capitalGains: capitalGains,
        taxableGains: taxableGains,
        exclusionAmount: exclusionAmount,
        federalTax: federalTax,
        stateTax: stateTax,
        totalTaxes: totalTaxes,
        netProceeds: netProceeds,
        netPercent: netPercent,
        state: stateInfo,
        inputs: inputs
    };
    
    // Display results
    displayResults();
    updateCharts();
    
    // Show success message
    showSuccess('Calculation complete! Scroll down to see your results.');
    
    // Track event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'calculate', {
            'event_category': 'Calculator',
            'event_label': inputs.state,
            'value': Math.round(netProceeds)
        });
    }
}

function displayResults() {
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.style.display = 'block';
    
    // Update main numbers
    document.getElementById('netProceeds').textContent = 
        '$' + Math.round(calculationResults.netProceeds).toLocaleString();
    document.getElementById('netPercent').textContent = 
        calculationResults.netPercent.toFixed(1) + '% of sale price';
    
    // Create detailed breakdown
    const breakdown = document.getElementById('detailedBreakdown');
    breakdown.innerHTML = `
        <h4>Detailed Breakdown</h4>
        <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 2px solid #3498db;">
                <td style="padding: 10px;"><strong>Sale Price</strong></td>
                <td style="padding: 10px; text-align: right;"><strong>$${calculationResults.salePrice.toLocaleString()}</strong></td>
            </tr>
            <tr>
                <td style="padding: 10px;">Real Estate Commission (${calculationResults.inputs.commission}%)</td>
                <td style="padding: 10px; text-align: right; color: #e74c3c;">-$${Math.round(calculationResults.commissionAmount).toLocaleString()}</td>
            </tr>
            <tr>
                <td style="padding: 10px;">Closing Costs (${calculationResults.inputs.closing}%)</td>
                <td style="padding: 10px; text-align: right; color: #e74c3c;">-$${Math.round(calculationResults.closingCosts).toLocaleString()}</td>
            </tr>
            <tr>
                <td style="padding: 10px;">Mortgage Payoff</td>
                <td style="padding: 10px; text-align: right; color: #e74c3c;">-$${calculationResults.mortgage.toLocaleString()}</td>
            </tr>
            <tr>
                <td style="padding: 10px;">Repairs/Staging</td>
                <td style="padding: 10px; text-align: right; color: #e74c3c;">-$${calculationResults.repairs.toLocaleString()}</td>
            </tr>
            <tr style="border-top: 1px solid #ddd;">
                <td style="padding: 10px;"><strong>Subtotal Before Taxes</strong></td>
                <td style="padding: 10px; text-align: right;"><strong>$${(calculationResults.salePrice - calculationResults.totalCosts).toLocaleString()}</strong></td>
            </tr>
            <tr>
                <td style="padding: 10px;">Capital Gains</td>
                <td style="padding: 10px; text-align: right;">$${Math.round(calculationResults.capitalGains).toLocaleString()}</td>
            </tr>
            <tr>
                <td style="padding: 10px;">Primary Residence Exclusion</td>
                <td style="padding: 10px; text-align: right; color: #27ae60;">-$${calculationResults.exclusionAmount.toLocaleString()}</td>
            </tr>
            <tr>
                <td style="padding: 10px;">Federal Capital Gains Tax</td>
                <td style="padding: 10px; text-align: right; color: #e74c3c;">-$${Math.round(calculationResults.federalTax).toLocaleString()}</td>
            </tr>
            <tr>
                <td style="padding: 10px;">State Tax (${calculationResults.state.name})</td>
                <td style="padding: 10px; text-align: right; color: #e74c3c;">-$${Math.round(calculationResults.stateTax).toLocaleString()}</td>
            </tr>
            <tr style="border-top: 2px solid #3498db;">
                <td style="padding: 10px;"><strong>NET PROCEEDS</strong></td>
                <td style="padding: 10px; text-align: right;"><strong style="color: #27ae60; font-size: 1.2em;">$${Math.round(calculationResults.netProceeds).toLocaleString()}</strong></td>
            </tr>
        </table>
    `;
    
    // Smooth scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function updateCharts() {
    // Cost Breakdown Pie Chart
    const costCtx = document.getElementById('costBreakdownChart').getContext('2d');
    
    if (costChart) {
        costChart.destroy();
    }
    
    costChart = new Chart(costCtx, {
        type: 'pie',
        data: {
            labels: ['Net Proceeds', 'Commission', 'Closing Costs', 'Mortgage', 'Repairs', 'Taxes'],
            datasets: [{
                data: [
                    calculationResults.netProceeds,
                    calculationResults.commissionAmount,
                    calculationResults.closingCosts,
                    calculationResults.mortgage,
                    calculationResults.repairs,
                    calculationResults.totalTaxes
                ],
                backgroundColor: [
                    '#27ae60',
                    '#e74c3c',
                    '#f39c12',
                    '#3498db',
                    '#9b59b6',
                    '#34495e'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Where Your Sale Price Goes'
                },
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = '$' + Math.round(context.parsed).toLocaleString();
                            const percentage = ((context.parsed / calculationResults.salePrice) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
    
    // Tax Breakdown Bar Chart
    const taxCtx = document.getElementById('taxBreakdownChart').getContext('2d');
    
    if (taxChart) {
        taxChart.destroy();
    }
    
    taxChart = new Chart(taxCtx, {
        type: 'bar',
        data: {
            labels: ['Capital Gains', 'After Exclusion', 'Federal Tax', 'State Tax', 'Total Tax'],
            datasets: [{
                label: 'Tax Analysis',
                data: [
                    calculationResults.capitalGains,
                    calculationResults.taxableGains,
                    calculationResults.federalTax,
                    calculationResults.stateTax,
                    calculationResults.totalTaxes
                ],
                backgroundColor: [
                    '#3498db',
                    '#f39c12',
                    '#e74c3c',
                    '#9b59b6',
                    '#34495e'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Tax Impact Analysis'
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return ' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

function generatePDFReport() {
    if (!calculationResults) {
        showError('Please calculate your proceeds first');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(44, 62, 80);
    doc.text('Home Sale Net Proceeds Report', 20, 20);
    
    // Date and property info
    doc.setFontSize(10);
    doc.setTextColor(127, 140, 141);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text(`Property: ${calculationResults.inputs.sqft} sq ft in ${calculationResults.state.name}`, 20, 35);
    
    // Sale Price Section
    doc.setFontSize(14);
    doc.setTextColor(44, 62, 80);
    doc.text('Sale Details', 20, 50);
    
    doc.setFontSize(10);
    doc.setTextColor(52, 73, 94);
    doc.text(`Sale Price: ${calculationResults.salePrice.toLocaleString()}`, 25, 60);
    doc.text(`Property Type: ${calculationResults.inputs.propertyType}`, 25, 65);
    doc.text(`Years Owned: ${calculationResults.inputs.yearsOwned}`, 25, 70);
    
    // Costs Section
    doc.setFontSize(14);
    doc.setTextColor(44, 62, 80);
    doc.text('Costs & Deductions', 20, 85);
    
    doc.setFontSize(10);
    doc.setTextColor(231, 76, 60);
    doc.text(`Commission (${calculationResults.inputs.commission}%): -${Math.round(calculationResults.commissionAmount).toLocaleString()}`, 25, 95);
    doc.text(`Closing Costs (${calculationResults.inputs.closing}%): -${Math.round(calculationResults.closingCosts).toLocaleString()}`, 25, 100);
    doc.text(`Mortgage Payoff: -${calculationResults.mortgage.toLocaleString()}`, 25, 105);
    doc.text(`Repairs/Staging: -${calculationResults.repairs.toLocaleString()}`, 25, 110);
    
    // Tax Section
    doc.setFontSize(14);
    doc.setTextColor(44, 62, 80);
    doc.text('Tax Calculations', 20, 125);
    
    doc.setFontSize(10);
    doc.setTextColor(52, 73, 94);
    doc.text(`Capital Gains: ${Math.round(calculationResults.capitalGains).toLocaleString()}`, 25, 135);
    doc.text(`Exclusion Applied: -${calculationResults.exclusionAmount.toLocaleString()}`, 25, 140);
    doc.text(`Taxable Gains: ${Math.round(calculationResults.taxableGains).toLocaleString()}`, 25, 145);
    
    doc.setTextColor(231, 76, 60);
    doc.text(`Federal Tax: -${Math.round(calculationResults.federalTax).toLocaleString()}`, 25, 150);
    doc.text(`State Tax (${calculationResults.state.name}): -${Math.round(calculationResults.stateTax).toLocaleString()}`, 25, 155);
    
    // Net Proceeds
    doc.setFontSize(16);
    doc.setTextColor(39, 174, 96);
    doc.text(`NET PROCEEDS: ${Math.round(calculationResults.netProceeds).toLocaleString()}`, 20, 175);
    
    doc.setFontSize(12);
    doc.setTextColor(52, 73, 94);
    doc.text(`${calculationResults.netPercent.toFixed(1)}% of sale price`, 20, 185);
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(127, 140, 141);
    doc.text('Disclaimer: This is an estimate for planning purposes only.', 20, 250);
    doc.text('Consult with real estate and tax professionals for accurate calculations.', 20, 255);
    doc.text('Report generated by MyNetProceeds.com', 20, 265);
    
    // Save the PDF
    doc.save(`home-sale-report-${Date.now()}.pdf`);
    
    showSuccess('PDF report downloaded successfully!');
    
    // Track event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'download_pdf', {
            'event_category': 'Calculator',
            'event_label': calculationResults.state.name
        });
    }
}

function resetCalculator() {
    // Reset all inputs
    document.getElementById('addr').value = '';
    document.getElementById('zip').value = '';
    document.getElementById('state').value = '';
    document.getElementById('sqft').value = '';
    document.getElementById('homeValue').value = '';
    document.getElementById('condition').value = '0';
    document.getElementById('commission').value = '5.5';
    document.getElementById('closing').value = '1.5';
    document.getElementById('mortgage').value = '';
    document.getElementById('repairs').value = '';
    document.getElementById('ptype').value = 'Primary Residence';
    document.getElementById('filing').value = 'Single';
    document.getElementById('purchase').value = '';
    document.getElementById('improvements').value = '';
    document.getElementById('years').value = '5';
    document.getElementById('income').value = '100000';
    document.getElementById('twoOfFive').checked = true;
    
    // Hide results
    document.getElementById('resultsSection').style.display = 'none';
    
    // Clear stored results
    calculationResults = null;
    
    // Destroy charts
    if (costChart) {
        costChart.destroy();
        costChart = null;
    }
    if (taxChart) {
        taxChart.destroy();
        taxChart = null;
    }
    
    showSuccess('Calculator reset successfully');
}

function updateEstimate() {
    const state = document.getElementById('state').value;
    const sqft = parseFloat(document.getElementById('sqft').value) || 0;
    const condition = parseFloat(document.getElementById('condition').value) || 0;
    
    if (state && sqft > 0) {
        const stateInfo = stateData[state];
        const estimatedValue = Math.round(sqft * stateInfo.ppsqft * (1 + condition));
        
        // Update placeholder
        const homeValueInput = document.getElementById('homeValue');
        if (!homeValueInput.value) {
            homeValueInput.placeholder = `Auto-estimate: ${estimatedValue.toLocaleString()}`;
        }
    }
}

// Social sharing functions
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`I just calculated my home sale proceeds! Net: ${Math.round(calculationResults.netProceeds).toLocaleString()}`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank', 'width=600,height=400');
    
    trackShare('facebook');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Just calculated my home sale proceeds with @MyNetProceeds! Net: ${Math.round(calculationResults.netProceeds).toLocaleString()} 🏠💰`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400');
    
    trackShare('twitter');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Home Sale Net Proceeds Calculator');
    const summary = encodeURIComponent(`Great tool for calculating home sale proceeds after taxes and fees. My net: ${Math.round(calculationResults.netProceeds).toLocaleString()}`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
    
    trackShare('linkedin');
}

function shareViaEmail() {
    const subject = encodeURIComponent('Check out this Home Sale Calculator');
    const body = encodeURIComponent(`I found this great calculator for home sale proceeds:\n\n${window.location.href}\n\nMy estimated net proceeds: ${Math.round(calculationResults.netProceeds).toLocaleString()}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    
    trackShare('email');
}

function trackShare(platform) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'share', {
            'event_category': 'Social',
            'event_label': platform
        });
    }
}

// Load from URL parameters
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
    
    // Auto-calculate if we have minimum fields
    if (params.has('state') && params.has('sqft')) {
        setTimeout(() => {
            calculateProceeds();
        }, 1000);
    }
}

// Add event listeners for real-time updates
document.addEventListener('DOMContentLoaded', function() {
    const inputs = ['state', 'sqft', 'condition'];
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', updateEstimate);
        }
    });
});