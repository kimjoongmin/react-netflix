import React, { useState, useEffect } from 'react'
import './Nav.css'
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const [show, setShow] = useState('');
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`search?q=${e.target.value}`);
  }

  useEffect(() => {
    //부수 효과를 처리하는 코드
    window.addEventListener("scroll", () => {
      if(window.scrollY > 0){
        setShow(true);
      }else{
        setShow('');
      }
    });  
    return () => {
      //정리(.clean-up) 작업을 수행하는 코드
      window.addEventListener("scroll", () => {
        
      });
    }
  }, []);//dependency(의존성 배열)
  

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png" alt="" className="nav__logo" onClick={()=> {window.location.href = "/react-netflix"}} />
      <input type="text" name="" value={searchValue} onChange={handleChange} className=
      "nav__input" placeholder='영화를 검색해주세요' />
      <img src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41" alt="" className="nav__avatar" />
    </nav>
  )
}

export default Nav