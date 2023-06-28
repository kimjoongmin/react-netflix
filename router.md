## React Router 란?
 
React Router DOM을 사용하면 웹 앱에서 동적 라우팅을 구현  
라우팅이 실행 중인 앱 외부의 구성에서 처리되는 기존 라우팅 아키텍처와 달리 React Router DOM은 앱 및 플랫폼의 요구 사항에 
따라 컴포넌트 기반 라우팅을 용이하게함 

### Single Page Application
하나의 템플릿에 자바스크립트를 이용해서 다른 컴포넌트를 이 index.html 템플릿에 넣으므로 페이지를 변경  
이 때 이 React Router Dom 라이브러리가 새 컴포넌트로 라우팅/탐색을 하고 렌더링하는데 도움
url값에 따라 좀 더 세분화된 개발을 하게 되면, 유지보수 및 관리에 용이
사용자 입장에서도 url의 변화로 인한 좀 더 이해 용이 

## React Router Dom 

- 중첩 라우팅(Nested Routes)
React Router의 가장 강력한 기능 중 하나이므로 복잡한 레이아웃 코드 필요없음
대부분의 레이아웃은 URL의 세그먼트에 연결되며 React Router는 이를 완전히 수용

- Outlet
자식 경로 요소를 렌더링하려면 부모 경로 요소에서 <Outlet>을 사용  
이렇게 하면 하위 경로가 렌더링될 때 중첩된 UI가 표시될 수 있음  
부모 라우트가 정확히 일치하면 자식 인덱스 라우트를 렌더링하거나 인덱스 라우트가 없으면 아무것도 렌더링하지 않음  
react-router-dom에서 가져와서 사용

```jsx
import './App.css';
import Nav from './components/Nav'; 
import Footer from './components/Footer';
import { Outlet, Route, Routes } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import MainPage from './pages/MainPage';

const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

const App =  () => {
  return(
    <div className='App'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />}></Route>
          <Route path=":movieId" element={<DetailPage />}></Route>
          <Route path="search" element={<SearchPage />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App;

```

### 기본 세팅 및 사용법

npm install react-router-dom 명령어를 통해 종속성 모듈 설치가 필요  
react-router-dom 패키지로 부터 필요한 구성 요소들을 설정하여 사용

root를 설정하는, index파일에 다음과 같이 이 BrowserRouter로 래핑  
App컴포넌트를 포함한 하위 컴포넌트들은 라우터를 사용할 준비 완료

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

Link를 사용하여 원하는 페이지로 이동가능한 유사 a태그를 만들 수도 있고,  
Routes로 래핑된 곳 안에 Route를 통해 element로 렌더링할 컴포넌트를 할당하여 path값에 해당하는 view를 렌더링

검색 링크 클릭시 SearchPage가 Routes컴포넌트가 위치한 곳에 렌더링  
Page 컴포넌트는 /page/:id 형식으로 라우팅 /page/1 이런식의 경로를 갔을 때, 1이라는 값이 Param의  id값으로 사용 

```jsx
import { Link, Route, Routes } from "react-router-dom";

const Page = () => {
	return(
      <>
        <Link to="/">홈으로</Link>
        <Link to="/page/1">페이지1</Link>
        <Link to="/search">검색</Link>
        <Link to="/share">공유</Link>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/page/:id" element={<Page />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/share" element={<SharePage />} />
        </Routes>
      </>
    )
}
```

### useParams
다른 url로 이동하면서 값을 넘겨줌

```jsx
import { useParams } from 'react-router-dom';

  //useParams를 사용하여 url 의 id값을 추출
const Page = () => {
  const location = useParams();
  return <div>페이지 : {location.id}</div>
}

export default Page
```

### useNavigate

searchValue값을 useNavigate를 통해 state객체에 value값으로 /search라는 경로로 넘겨줌  

```jsx
import { useNavigate } from 'react-router-dom';

const Page = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("")
  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }
  const search = () => {
    navigate("/search", { state: { value: searchValue } });
  }

  return (
  <>
    <input type="text" onChange={handleChange} />
    <button onClick={search}>검색</button>
  </>
  )
}

export default Page
```

### useLocation
search 페이지에서 useLocation을 사용하여 location이라는 값에 받아온 값을 객체 형태로 할당받아서 사용 가능

```jsx
import { useLocation } from 'react-router-dom';

const Search = () => {
  const location = useLocation();

  return <div>검색 결과: {location.state.value}</div>
  
}

export default Search
```




