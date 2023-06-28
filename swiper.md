## swiper
```
npm i swiper
```

```jsx
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper>
  );
};
```
### 화면은 나오지만..
콘솔에 오류가 있다  
해결을 위해.. 계속 계속 서치 서치  
swiper 버전도 다시 설치해도 오류  
소스코드 그대로 복붙해도 오류  
swiper slide 기능 추가 과정에 오류.  
각각의 영화 포스터 고유 값인 movie.id를 키 값으로 했는데 왜!! 오류가!!  
강의에도 언급조차 없다  
커뮤니티에 나와 비슷한 오류가 있었는데 강사가 답변 조차 안담.  

```jsx 
{movies.map((movie) => (
  <SwiperSlide key={movie.id}>
    {/* 아래에 있던 key 값을 swiperslide에 옮김으로써 해결 */}
    <img
      alt={`${isLargeRow ? movie.name : movie.title}`}
      className={`row__poster ${isLargeRow && "row__posterLarge"}`}
      src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
      onClick={() => handleClick(movie)}
    />
  </SwiperSlide>
))}
```

**key={movie.id}를 SwiperSlide 컴포넌트에 할당하여 각 슬라이드에 고유한 키를 제공하게 함**

다신 잊지 말자.. 근데 강의에는 오류를 무시한것일까..후..


