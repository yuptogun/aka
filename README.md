# aka.eojin.dev

NestJS + TypeScript 자습 목적의 Bitly 클론 애플리케이션입니다.

## 자습일지

| 날짜 | 제목 | 요약 |
| --- | --- | --- |
| 2024-03-19 | [1일차](./.journal/2024-03-19.md) | 서론, devcontainer |
| 2024-04-01 | [2일차](./.journal/2024-04-01.md) | devcontainer 개선, 개발 방향 확정 |
| 2024-04-02 | [3일차](./.journal/2024-04-02.md) | PostgreSQL 설정: devcontainer, 의존성 설치 |
| 2024-04-08 | [4일차](./.journal/2024-04-08.md) | PostgreSQL 설정: DataSource, 마이그레이션 |
| 2024-04-09 | [5일차](./.journal/2024-04-09.md) | PostgreSQL 설정: App에서 사용 |
| 2024-04-12 | [6일차](./.journal/2024-04-12.md) | Create 구현 |
| 2024-04-15 | [7일차](./.journal/2024-04-15.md) | Create 개선 |
| 2024-04-17 | [8일차](./.journal/2024-04-17.md) | 테이블 컬럼 추가 |
| 2024-04-19 | [9일차](./.journal/2024-04-19.md) | Delete 구현 |

## Quick Start

### Setup

Docker, VS Code, dev container 플러그인에 의존합니다.  
모두 설치가 되면...

1. Docker 엔진을 시작하세요.
2. VS Code로 이 프로젝트를 여세요.
3. `.env.dev` 파일을 `.env`로 복사해 주세요.
   * Postgres DB를 개발컨테이너 외의 다른 것으로 쓰시려면 이 파일을 고치시면 됩니다.
4. VS Code에서 "open workspace in container" 명령을 실행하세요.
   * 처음 실행할 경우 이미지 다운로드 시간이 약간 걸립니다.
5. 새로 열린 워크스페이스에서 터미널을 새로 열어 시작하세요!

```shell
# 의존성 설치
npm i

# DB 마이그레이션
npm run typeorm migration:run -- -d config/typeorm.config.ts

# 실행!
npm run start:dev
```

### API Specification

[Bruno](https://www.usebruno.com/)를 사용한 API 사양 관리를 하고 있습니다.  
"Open Collection" 기능으로 `.bruno/` 디렉토리를 불러오시면 됩니다.

프로젝트 완료 시점쯤 되면 [OpenAPI](https://docs.nestjs.com/openapi/introduction) 구현도 추가할 생각입니다.