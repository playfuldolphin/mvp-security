module.exports.processLogs = async function(logs){
  const incidents = [];
  for(const line of logs){
    if(typeof line !== 'string') continue;
    if(line.includes('ERROR') || /failed login/i.test(line) || /\b(?:\d{1,3}\.){3}\d{1,3}\b/.test(line)){
      incidents.push({log_snippet: line.slice(0,200), rule: 'toy-rule', severity: 'medium', created_at: new Date().toISOString()});
    }
  }
  return incidents;
};
