import React, { useRef } from 'react'
import './MovieModal.css'
import useOnClickOutside from '../../Hooks/useOnClickOutside';

const MovieModal = ({ backdrop_path, title, release_date, overview, name, first_air_date, vote_average, setModalOpen }) => {
  const ref = useRef();
  useOnClickOutside(ref, ()=>{
    setModalOpen(false);
  });
  return (
    <div className='presentation' role='presentation'>
      <div className='wrapper-modal'>
        <div className='modal' ref={ref}>
          <span className='modal-close' onClick={()=>{setModalOpen(false)}}>x</span>
          <img className='modal__poster-img' src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} alt={title ? title : name} />
          <div className='modal__content'>
            <p className='modal__details'></p>
            <span className='modal__user-perc'>100% for you</span>
            {release_date ? release_date : first_air_date}
            <h2 className='modal__title'>{title ? title : name}</h2>
            <p className='modal__overview'>평점: {vote_average}</p>
            <p className='modal__overview'>{overview}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal