1. 깃헙 레파지토리 생성

2. api key 환경변수로 숨기기

.env 파일 만들어서 

```
REACT_APP_MOVIE_DB_API_KEY=113bfb55777c170cdd155c90ef139ef3
```
"113bfb55777c170cdd155c90ef139ef3" 이렇게 써서 오류 발생...

3. 로컬 앱과 저장소 연결

```
git add .
git commit -m "init"

git remote add origin https://github.com/kimjoongmin/react-netflix.git
git push -u origin main
```

4. gh-pages 모듈 설치

npm install gh-pages --save-dev

5. 배포를 위한 script 추가

package.json  

```JSON
  "predeploy":"npm run build",
  "deploy":"gh-pages -d build"
```

6. react router dom의 기본 경로 변경

만약 기본 경로가 https://~~~/react-netflix(basename)

index.js  

```JSX
<BrowserRouter basename='react-netflix'>
  <App />
</BrowserRouter>
```

7. deploy(전개하다) 시작

```
npm run deploy
```
deploy를 해야 github.io에서 반영되는 것을 확인.