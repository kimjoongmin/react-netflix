/* eslint-disable */
import React, {useState, useEffect} from 'react';
import axios from '../api/axios';
import MovieModal from './MovieModal/index'
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import "./Row.css";


const Row = ({isLargeRow, title, id, fetchUrl}) => {
  const [movies, setMovies] = useState([]);  
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);  
  
  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    // console.log("request.data.results",request.data.results)
    setMovies(request.data.results);
  }

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  }

  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        {/* <div className="slider__arrow-left" onClick={() => {document.getElementById(id).scrollLeft -= window.innerWidth - 80}}>
          <span className="arrow" >{"<"}</span>
        </div> */}
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          pagination={{clickable:true}}
          loop
          breakpoints={{
            1378: {
              slidesPerView: 6, // 한번에 보이는 슬라이드 개수
              slidesPerGroup: 6, // 몇개씩 슬라이드 할지
            },
            998: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            625: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            0: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
          }}
        >
          <div id={id} className="row__posters">
            {movies.map((movie) => (

              <SwiperSlide key={movie.id} >
                <img alt={`${isLargeRow ? movie.name : movie.title}`} className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`} onClick={() => handleClick(movie)} />
              </SwiperSlide>
              
            ))}
          </div>

        </Swiper>
        {/* <div className="slider__arrow-right" onClick={() => {document.getElementById(id).scrollLeft += window.innerWidth - 80;}}>
          <span className="arrow" >{">"}</span>
        </div> */}
      </div>
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section> 
  )
}

export default Row