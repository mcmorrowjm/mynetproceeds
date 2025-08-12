exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
    const { address, zip, state, sqft, conditionFactor } = JSON.parse(event.body || '{}');
    // TODO: In production, call your AVM provider here with API key(s)
    // Example env vars: AVM_PROVIDER, AVM_API_KEY
    const sf = Number(sqft) > 0 ? Number(sqft) : 1600;
    const cond = Number(conditionFactor) || 0;
    const PPS = { CA:500, TX:210, FL:290, NY:365 };
    const pps = PPS[state] || 250;
    const base = pps * sf * (1 + cond);
    const jitter = 1 + (Math.random() * 0.06 - 0.03); // ±3%
    const estimate = Math.round(base * jitter);
    return { statusCode: 200, body: JSON.stringify({ estimate, source: 'stub' }) };
  } catch (e) {
    return { statusCode: 200, body: JSON.stringify({ estimate: 0, error: e.message }) };
  }
};
