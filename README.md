# ⚖️ Law Search MCP Server

> 한국 법률 정보를 조회할 수 있는 **Model Context Protocol (MCP) 서버**입니다.
> stdio 방식의 JSON-RPC 2.0 통신을 통해 MCP 호환 클라이언트와 연동됩니다.

<br>

## 🚀 주요 기능

| 기능 | 설명 |
|------|------|
| 🔍 **법령 조회** | `search_law` 툴을 통해 특정 법령 조항 즉시 조회 |
| 📚 **사전 정의 데이터** | 도로교통법 제13조, 운전면허 제80조 내장 |
| 🔌 **표준 MCP 호환** | 공식 TypeScript SDK 기반, 다양한 클라이언트 연동 지원 |

<br>

## 📂 프로젝트 구조

```
my-mcp-server/
├── server.js          # MCP 서버 핵심 구현체
├── opencode.json      # OpenCode MCP 서버 설정 파일
├── package.json       # Node.js 의존성 및 스크립트
└── README.md          # 프로젝트 설명서
```

<br>

## 🛠️ 설치 및 실행

### 사전 요구 사항

- **Node.js** v18 이상
- **npm** (의존성 관리)
- 외부 API 키 불필요 — 로컬 데모 서버

### 설치

저장소를 클론하거나 코드를 복사한 후 아래 명령어로 의존성을 설치합니다.

```bash
npm install @modelcontextprotocol/sdk zod
```

<br>

## ⚙️ 설정 (`opencode.json`)

OpenCode 클라이언트가 서버를 인식하도록 설정 파일을 수정합니다.

**경로:** `%USERPROFILE%/.config/opencode/opencode.json`

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "korean-law-search": {
      "type": "local",
      "command": ["node", "C:/Users/ij794/OneDrive/바탕 화면/my-mcp-server/server.js"],
      "enabled": true
    }
  }
}
```

> ⚠️ **주의:** `command`의 파일 경로는 반드시 본인 시스템의 **절대 경로**로 수정해야 합니다.

<br>

## 🔄 JSON-RPC 통신 예시

### 1. 툴 목록 조회 (`tools/list`)

AI가 사용 가능한 도구 목록을 서버에 요청합니다.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list",
  "params": {}
}
```

### 2. 도로교통법 조회 (`tools/call`)

AI가 실제 법률 데이터를 서버에 요청합니다.

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "search_law",
    "arguments": { "lawType": "road_traffic" }
  }
}
```

<br>

## 📄 라이선스

이 프로젝트는 [MIT License](LICENSE) 하에 제공됩니다. 자유롭게 수정하고 활용하세요.
