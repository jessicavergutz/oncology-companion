import { execSync } from 'child_process';
import fs from 'fs';

const briefPath = 'inbox/bikini-store-brief.md';
const briefContent = fs.readFileSync(briefPath, 'utf8');

const runAgent = (agentId, promptPrepend) => {
  console.log(`\n\n--- Running agent: ${agentId} ---`);
  try {
    // Assuming the agents can be invoked via an npm script or similar CLI tool in the mega-brain project
    // As per the AGENTS.md, we can use `/ask [agent-id]` or `/conclave`. 
    // Since we are running a bash script, we might need to simulate this if there isn't a direct CLI.
    // Let's try running a python or JS script that accesses the agents, or we'll just write a prompt for them to process.
    // Given the architecture: `packages/cli/cli.js` might be the entry point.
    
    // We will create individual prompt files for each agent to process
    fs.writeFileSync(`inbox/prompt-${agentId}.md`, `${promptPrepend}\n\nProject Context:\n${briefContent}`);
    console.log(`Created prompt for ${agentId}`);
    
  } catch (error) {
    console.error(`Error with ${agentId}:`, error.message);
  }
};

runAgent('conclave-critic', 'Analyze the following project from a critical, Devil\'s Advocate perspective. Identify the biggest risks, potential points of failure (especially in logistics and international taxes), and what could kill this business before it even starts.');
runAgent('finance', 'Analyze the following project from a Financial perspective. Calculate break-even points, estimate necessary margins given the $13 cost and $25/kg shipping, and outline the cash flow requirements for the initial 30-unit order and marketing spend.');
runAgent('marketing', 'Analyze the following project from a Marketing perspective. Suggest the best positioning for Brazilian bikinis in the US market, key channels (paid vs organic), and an initial customer acquisition strategy.');
runAgent('operations', 'Analyze the following project from an Operations and Project Development perspective. Outline the step-by-step roadmap to launch, including sourcing, inventory management at the US residence, and order fulfillment processes.');

console.log('Preparation complete. You can now process these prompts with the respective agents.');
