##  useEffect

useEffect는 React 함수형 컴포넌트에서 부수 효과(side effect)를 처리하기 위해 사용되는 Hook.  
`Hook은 React 16.8에 새로 추가된 기능입니다. Hook은 class를 작성하지 않고도 state와 다른 React의 기능들을 사용할 수 있게 해줍니다.`
부수 효과는 컴포넌트 외부의 상태를 변경하거나 다른 작업을 수행하는 것.  
 useEffect는 컴포넌트가 렌더링될 때마다 실행되며, 의존성 배열(dependency array)을 통해 실행 조건을 제어.

useEffect를 사용하기 위해 React를 임포트해야함

```jsx
import React, { useEffect } from 'react';
```

useEffect는 두 개의 매개변수를 받음.   
첫 번째 매개변수는 부수 효과를 정의하는 함수이며, 두 번째 매개변수는 의존성 배열.  
의존성 배열은 useEffect가 실행되어야 하는 조건을 설정.  
의존성 배열에 포함된 값이 변경될 때만 useEffect 함수가 실행.

```jsx
useEffect(() => {
  // 부수 효과를 처리하는 코드
}, [dependency1, dependency2]);
```

useEffect 함수는 컴포넌트가 처음 렌더링될 때와 의존성 배열에 있는 값이 변경될 때마다 실행.  
만약 의존성 배열이 비어있다면(`[]`), useEffect는 컴포넌트가 처음 렌더링될 때에만 실행.

useEffect 내부에서 처리할 수 있는 부수 효과는 다양.  
예를 들어, API 호출, 이벤트 리스너 등을 설정하거나 해제하는 작업, 외부 라이브러리와의 상호 작용 등이 있음.  
useEffect 내부에서 반환하는 함수를 통해 정리(clean-up) 작업을 수행할 수도 있음.  
이 정리 함수는 컴포넌트가 언마운트되거나 업데이트되기 직전에 실행.

```jsx
useEffect(() => {
  // 부수 효과를 처리하는 코드

  return () => {
    // 정리(clean-up) 작업을 수행하는 코드
  };
}, [dependency]);
```

useEffect를 사용하여 부수 효과를 처리하면 컴포넌트의 렌더링과 상관없이 비동기 작업이나 다른 작업을 수행할 수 있음.  
또한, useEffect를 사용하면 컴포넌트의 상태를 변경하고 다시 렌더링하는 사이클에 영향을 주지 않고 부수 효과를 처리할 수 있음.


```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
**useEffect가 하는 일은 무엇일까요?** useEffect Hook을 이용하여 우리는 React에게 컴포넌트가 렌더링 이후에 어떤 일을 수행해야하는 지를 말합니다. React는 우리가 넘긴 함수를 기억했다가(이 함수를 ‘effect’라고 부릅니다) DOM 업데이트를 수행한 이후에 불러낼 것입니다. 위의 경우에는 effect를 통해 문서 타이틀을 지정하지만, 이 외에도 데이터를 가져오거나 다른 명령형(imperative) API를 불러내는 일도 할 수 있습니다.

**useEffect를 컴포넌트 안에서 불러내는 이유는 무엇일까요?** useEffect를 컴포넌트 내부에 둠으로써 effect를 통해 count state 변수(또는 그 어떤 prop에도)에 접근할 수 있게 됩니다. 함수 범위 안에 존재하기 때문에 특별한 API 없이도 값을 얻을 수 있는 것입니다. Hook은 자바스크립트의 클로저를 이용하여 React에 한정된 API를 고안하는 것보다 자바스크립트가 이미 가지고 있는 방법을 이용하여 문제를 해결합니다.

**useEffect는 렌더링 이후에 매번 수행되는 걸까요?** 네, 기본적으로 첫번째 렌더링과 이후의 모든 업데이트에서 수행됩니다.(나중에 effect를 필요에 맞게 수정하는 방법에 대해 다룰 것입니다.) 마운팅과 업데이트라는 방식으로 생각하는 대신 effect를 렌더링 이후에 발생하는 것으로 생각하는 것이 더 쉬울 것입니다. React는 effect가 수행되는 시점에 이미 DOM이 업데이트되었음을 보장합니다.

