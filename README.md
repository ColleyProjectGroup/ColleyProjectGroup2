# 초기설정 공지

## 세부사항은 Issue #1 초기 프로젝트 설정 내 comments 확인해주세요

1. .vscode settings.json추가 후 작업 진행 (gitignore에 포함되어있어 clone후 수동으로 추가해주세요!)
1. .env 작업 루트 폴더(package.json위치한 곳)에 생성 후 작업 진행(gitignore)
1. 경로별칭 vite.config.ts파일 참고해서 사용해주세요!(오류발생 가능성 있고 해당 케이스도 댓글에 작성해뒀습니다.)
1. BrowserRouter/**createBrowserRouter** 우선 협의된 사항이 없어서 임의로 설정해뒀습니다. 자세한 건 comment 확인해주세요
1. 추가로 모든 tsx파일 작성시 named export사용해주시면 감사하겠습니다! (export default X) - index.ts를 사용하기 위함! 마찬가지로 comment확인해주세요
1. 컴포넌트 생성시마다 components디렉토리 내부 index.ts에 작성된 형식으로 export 한 줄 추가해주세요!
