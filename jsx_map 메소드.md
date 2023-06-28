## jsx map 메소드
`jsx {movies.map(() => ())}`는 JavaScript의 `Array.map()` 메서드를 사용하여 배열 요소를 JSX로 매핑하는 방법.  
이를 통해 배열의 각 요소에 대해 JSX 요소를 생성하고 동적으로 렌더링.

다음은 `movies` 배열의 각 요소를 사용하여 영화 제목을 출력하는 예시:

```jsx
import React from 'react';

function MovieList({ movies }) {
  return (
    <div>
      {movies.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </div>
  );
}
```

위의 코드에서 `movies.map()`은 `movies` 배열을 순회하면서 각 요소에 대해 JSX `<p>` 요소를 생성. 
 `key` prop은 각 영화의 고유한 식별자를 제공하여 React에게 요소의 변동 여부를 추적하도록함.

위 예시에서 `movies` 배열은 다음과 같은 형태를 가지는 것을 가정: 


```jsx
const movies = [
  { id: 1, title: 'Movie 1' },
  { id: 2, title: 'Movie 2' },
  { id: 3, title: 'Movie 3' },
];
```

따라서 `movies.map()`은 각 객체 요소에 대해 JSX를 생성하고, `key` prop을 통해 React에게 각 요소의 식별자를 전달. 
 이렇게 생성된 JSX는 컴포넌트의 반환 값으로 사용되며, 렌더링될 때 영화 제목이 출력.

`map()` 메서드를 사용하는 것 외에도, `movies` 배열을 순회하고 JSX를 생성하는 과정에서 JavaScript의 제어문이나 조건문을 사용.  
이를 통해 동적인 JSX를 생성.  
예를 들어, 다음은 평점이 4 이상인 영화만 출력하는 예시:

```jsx
import React from 'react';

function MovieList({ movies }) {
  return (
    <div>
      {movies.map((movie) => {
        if (movie.rating >= 4) {
          return <p key={movie.id}>{movie.title}</p>;
        }
        return null;
      })}
    </div>
  );
}
//JSX에서는 삼항 연산자나 조건문을 직접 사용할 수 없다..그래서 map 함수의 콜백함수를 중괄호로 감싸고 if else 문을써서 조건부 렌더링 한다
```

위의 예시에서는 `movies.map()`의 콜백 함수에서 평점이 4 이상인 경우에만 JSX 요소를 반환하고, 그렇지 않은 경우 `null`을 반환. 
이를 통해 조건에 맞는 영화만 출력.