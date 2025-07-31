import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const API_BASE = "https://my-prompt-flow-endpoint.com/score";

const server = new McpServer({
  name: "agents-manager-mcp",
  version: "1.0.0"
});

server.tool(
  "query_agent",
  "Query an AI agent via prompt flow with a user message",
  {
    message: {
      type: "string",
      description: "The message to send to the agent"
    },
    agent_id: {
      type: "string", 
      description: "The ID of the agent to query",
      default: "default-agent"
    },
    temperature: {
      type: "number",
      description: "Temperature for the agent response (0.0 to 1.0)",
      default: 0.7
    }
  },
  async (args) => {
    try {
      const { message, agent_id = "default-agent", temperature = 0.7 } = args;
      
      if (!message) {
        throw new Error("Message is required");
      }

      const requestBody = {
        message: message,
        agent_id: agent_id,
        temperature: temperature,
        timestamp: new Date().toISOString()
      };

      console.log(`Querying agent ${agent_id} with message: ${message}`);
      
      const response = await fetch(`${API_BASE}/agents/${agent_id}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      return { 
        content: [
          {
            type: "text",
            text: `Agent Response:\n\n${data.response || data.message || JSON.stringify(data, null, 2)}`
          }
        ]
      };
    } catch (error) {
      console.error("Error querying agent:", error);
      return {
        content: [
          {
            type: "text", 
            text: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`
          }
        ]
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  process.on('SIGINT', async () => {
    await server.close();
    process.exit(0);
  });
}

main().catch(console.error);