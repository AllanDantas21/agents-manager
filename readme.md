# agents-manager

Hub para agentes locais do Prompt Flow com interface desktop e servidor MCP.

## DESCRIPTION

agents-manager é um hub centralizado que facilita o uso de agentes de IA locais. 
Oferece interface desktop popup para seleção rápida de agentes e servidor MCP 
para integração com editores como Cursor e GitHub Copilot.

## ARCHITECTURE

    agents-manager/
    ├── agents/     # agentes prompt flow
    ├── ui/         # interface desktop  
    ├── mcp/        # servidor MCP
    └── infra/      # configurações

## FEATURES

Desktop UI:
- popup para seleção de agentes
- execução com parâmetros
- histórico

MCP Server:
- integração com editores
- execução via protocolo MCP
- suporte múltiplos agentes

## INSTALLATION

    git clone https://github.com/AllanDantas21/agents-manager.git
    TBD
    
## CONFIGURATION

Adicionar ao editor compatível com MCP:

    {
      "mcpServers": {
        "agents-manager": {
          "command": "node",
          "args": ["/path/to/agents-manager/mcp/build/index.js"]
        }
      }
    }

## STATUS

Em desenvolvimento. 

Desktop UI: não implementado
MCP Server: estrutura básica
Agentes: codeReviewAgent disponível

## LICENSE

ISC