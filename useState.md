## useState

`useState`는 React 함수형 컴포넌트에서 상태(state)를 관리하기 위해 사용되는 Hook.  
`useState`를 사용하면 함수형 컴포넌트 내에서 상태를 생성하고 변경할 수 있음.

`useState`를 사용하기 위해 React를 임포트해야함

```jsx
import React, { useState } from 'react';
```

`useState`는 배열 형태의 반환 값을 가지며, 첫 번째 요소는 현재의 상태 값이고, 두 번째 요소는 상태를 변경하는 함수.  
일반적으로 이 함수는 `setState`로 이름.  

다음은 `useState`의 사용 예시:

```jsx
const [state, setState] = useState(initialValue);
```

- `state`: 현재의 상태 값을 나타내는 변수. 초기값으로 `initialValue`를 사용.
- `setState`: 상태를 변경하는 함수. 이 함수를 호출하면 컴포넌트의 상태가 업데이트되고, 컴포넌트가 다시 렌더링.

다음은 숫자를 표시하고 버튼을 클릭하여 숫자를 증가시키는 간단한 컴포넌트 예시

```jsx
import React, { useState } from 'react';

// const Counter = () => {
//   const [count, setCount] = useState(0);
//   const increase = () => {
//     setCount(count + 1);
//   }
//   return(
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={increase}>증가</button>
//     </div>
//   )
// }
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

위 예시에서 `useState(0)`은 초기값을 0으로 설정하며, `count`는 현재의 상태 값을 나타내고, `setCount`는 `count` 상태를 변경하는 함수.  
`increment` 함수는 버튼을 클릭할 때마다 `count`를 1씩 증가시킴.  
이렇게 상태를 변경하면 React는 변경된 상태를 감지하고 컴포넌트를 다시 렌더링.

`useState`는 컴포넌트 내에서 상태를 여러 개 관리할 수 있음. 
예를 들어, 다음과 같이 여러 개의 상태를 가지는 컴포넌트를 만들 수 있음

```jsx
import React, { useState } from 'react';

function Example() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(Number(event.target.value));
  };

  return (
    <div>
      <input type="text" value={name} onChange={handleNameChange} />
      <input type="number" value={age} onChange={handleAgeChange} />
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}
``