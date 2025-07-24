import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const API_BASE = "sample_url";

const server = new McpServer({
  name: "agents-manager-mcp",
  version: "1.0.0"
});

server.tool(
  "receba",
  "A sample tool that logs a greeting",
  {},
  async () => {
    console.log("hello mcp");
    return { 
      content: [
        {
          type: "text",
          text: "Hello from MCP server!"
        }
      ]
    };
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