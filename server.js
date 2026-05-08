// Import MCP SDK components using the high-level McpServer API
const { McpServer } = require("./node_modules/@modelcontextprotocol/sdk/dist/cjs/server/mcp.js");
const { z } = require("zod");

// Create MCP server instance
const server = new McpServer({
  name: "law-search-server",
  version: "1.0.0"
});

// 1. 도구 등록 - 영문 파라미터로 변경하여 인코딩 문제 회피
server.tool(
  "search_law", // 도구 이름
  "특정 법률(예: 도로교통법)의 내용을 검색합니다.", // 설명
  { 
    lawType: z.enum(["road_traffic", "drivers_license"]).describe("법률 유형 (road_traffic: 도로교통법, drivers_license: 운전면허)")
  }, // 입력 데이터 (Zod 사용)
  async ({ lawType }) => {
    // 실습용 간단 데이터베이스 (나중에 실제 파일이나 API로 확장 가능)
    const lawData = {
      "road_traffic": "제13조(차마의 통행) 차마의 운전자는 보도와 차도가 구분된 도로에서는 차도로 통행하여야 한다.",
      "drivers_license": "제80조(운전면허) 자동차등을 운전하려는 사람은 시·도경찰청장으로부터 운전면허를 받아야 한다."
    };

    const result = lawData[lawType] || "해당 법률 정보를 찾을 수 없습니다.";

    return {
      content: [{ type: "text", text: result }]
    };
  }
);

// Start server with stdio transport
async function main() {
  const transport = require("./node_modules/@modelcontextprotocol/sdk/dist/cjs/server/stdio.js").StdioServerTransport;
  await server.connect(new transport());
  console.error("Law Search MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});