## useRef 
- react에서 사용되는 Hook 중 하나!  
- DOM 요소나 다른 React 요소에 접근하귀 이해 사용  
- useRef를 사용하면 컴포넌트의 생명주기와 상관없이 값이 유지되고 변경되어도 컴포넌트가 다시 렌더링 되지 않음

## DOM을 직접 선택해야 할 경우들
1. 엘리먼트 크기를 가져와야 할 때
2. 스크롤바 위치를 가져와야 할 때
3. 엘리먼트에 포커스를 설정 해줘야 할 때 등

## useRef 사용법
useRef()를 이용해서 Ref 객체를 만들고, 이 객체를 특정 DOM에 ref 값으로 설정  
이렇게 되면 Ref 객체의 .current 값이 특정 DOM을 가리키게 됨

### 모달창 닫기!!
```jsx
import React, {useRef, useEffect} from "react";

const App () => {

  const ref = useRef();

  const closeModal () => {
    //모달창 닫기 구현
    console.log("modal closed");
  }
  const handleClickOutside = (event) => {
    if(ref.current && !ref.current.contains(event.target)){
      //모달창 외부를 클릭한 경우 닫기
      closeModal();
    }
  }

  useEffect(() => {
    //컴포넌트가 마운트될때 클릭이벤트 추가
    document.addEventListener("click",handleClickOutside);
    return () => (
    //컴포넌트가 언마운트될때 클릭이벤트 제거
      document.removeEventListener("click",handleClickOutside);
    )
  },[]);

  return(
    <div>
      <div ref={ref}>
        모달창
      </div>
    </div>
  )
}

export default App;

```
handleClickOutside 함수는 모달창 외부 클릭했을때 호출되어 closeModal호출

useEffect 훅을 사용하여 컴포넌트(컴포넌트(Component)란 프로그래밍에 있어 재사용이 가능한 각각의 독립된 모듈)가 마운트 될때 클릭 이벤트를 추가하고 언마운트 될때 클릭이벤트를 제거.

[]`depenancy?의존성`를 useEffect 두번째 인자로 전달해서 언마운트될때만 이벤트가 제거

## 마운트 언마운트!

리액트(React)에서 "마운트(Mount)"와 "언마운트(Unmount)"는 컴포넌트의 생명주기(lifecycle)와 관련된 개념  
컴포넌트의 마운트는 해당 컴포넌트가 가상 DOM(Virtual DOM)에서 실제 DOM에 삽입되는 과정을 의미  
언마운트는 반대로 해당 컴포넌트가 DOM에서 제거되는 과정을 의미

마운트 프로세스는 보통 컴포넌트가 처음으로 생성될 때 발생하며, 컴포넌트가 실제 DOM에 삽입되기 전에 수행해야 할 작업을 수행할 수 있는 기회를 제공

1. constructor: 컴포넌트의 초기 설정을 위해 호출  
주로 상태(state) 초기화와 이벤트 핸들러 바인딩

2. static getDerivedStateFromProps: 초기 렌더링과 재 렌더링 시에 호출  
새로운 속성(props)이나 상태(state)로 컴포넌트의 상태를 업데이트 

3. render: 가상 DOM에 컴포넌트의 렌더링 결과를 반환

4. componentDidMount: 컴포넌트가 실제 DOM에 삽입된 후에 호출  
주로 외부 데이터 가져오기, 이벤트 구독 등의 초기화 작업을 수행

언마운트 프로세스는 컴포넌트가 DOM에서 제거될 때 발생하며, 주로 리소스 해제, 이벤트 구독 취소 등의 정리 작업을 수행할 수 있는 기회를 제공


## 강의는...어렵게 설명..

```jsx
//react hooks 생성 useOnClickOutside.js
import React, { useEffect } from 'react'

//모달 창 바깥을 클릭하면 Callback 함수를 호출하는 Event를 등록해 주기
const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // console.log("ref", ref.current)
      //클릭시 모달창 안이면 그냥 return
      if(!ref.current || ref.current.contains(event.target)){
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    }
  }, [ref, handler])
  
  return (
    <div>useOnClickOutside</div>
  )
}

export default useOnClickOutside

// 모달창.js에 추가
import useOnClickOutside from '../../Hooks/useOnClickOutside';

const ref = useRef();
//callback 함수 안에서 모달 닫기
useOnClickOutside(ref, ()=>{
  setModalOpen(false);
});

```