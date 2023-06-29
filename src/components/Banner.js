import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import requests from "../api/requests";
import "./Banner.css";
import styled from "styled-components";

const Banner = () => {
  const [movie, setMovie] = useState([]); 
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    //비동기 요청
    //현재 상영중인 영화 정보를 가져오기(여러 영화)
    const request = await axios.get(requests.fetchNowPlaying);

    //여러 영화 중 영화 하나의 ID 를 가져오기
    const movieId = request.data.results[
      Math.floor(Math.random() * request.data.results.length)
    ].id;
    // console.log(movieId)

    //특정 영화의 더 상세한 정보를 가져오기(비디오 정보도 포함)
    const {data: movieDetail} = await axios.get(`movie/${movieId}`,{params: {append_to_response: "videos"},
    });
    setMovie(movieDetail);
    // console.log(movieDetail)
  }
  // console.log("movie",movie)
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  if(!isClicked){
    return (
      <header className='banner' style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        //옵셔널 체이닝 연산자: 객체 체인의 중간에 사용된 경우, 해당 객체의 존재 여부를 확인하고 속성 또는 메서드에 접근합니다. 객체가 null 또는 undefined인 경우, 연산자는 즉시 undefined를 반환하며 이후 체인된 속성이나 메서드는 호출되지 않습니다.
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}>
        <div className='banner__contents'>
          <h1 className='banner__title'>
            {movie?.title || movie?.name || movie?.original_name}
          </h1>        
          <div className='banner__buttons'>
            <button className='banner__button play' onClick={() => {setIsClicked(true)}}>Play</button>
            <button className='banner__button info'>
              <div className='space'></div>More Information
            </button>
          </div>

          <h1 className='banner__description'>
            {truncate(movie?.overview, 150)}
          </h1>        
        </div>
        <div className='banner--fadeBottom'></div>
      </header>
    )
  } else {
    return (
      <Container>
        <HomeContainer>
          <Iframe src={`https://www.youtube.com/embed/${movie.videos.results[0]?.key}?controls=0&autoplay=1&loop=1&playlist=${movie.videos.results[0]?.key}`} width="640" height="360" allow="autoplay; fullscreen" allowFullScreen title="Youtube Video Player"></Iframe>
        </HomeContainer>
      </Container>
    )
  }
}
//import { styled } from "styled-components"; 자동으로 가져옴
//컴포넌트는 대문자로
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  width: 100%;
  height: 100vh;
`
const HomeContainer = styled.div`
  width:100%;
  height:100%;
`

const Iframe = styled.iframe`
  width:100%;
  height:100%;
  z-index:-1;
  opacity:0.65;
  border:0;
  &::after{
    content:"";
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
  }
`

export default Banner