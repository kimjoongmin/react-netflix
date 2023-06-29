/* eslint-disable */
import React, {useState, useEffect} from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import "./SearchPage.css"
import axios from '../../api/axios';
import useDebounce from '../../Hooks/useDebounce';


//search 페이지에서 searchTerm 가져오기
const SearchPage = () => {
  const navigate = useNavigate();
  // console.log("useLocation:", useLocation())
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const searchTerm = query.get("q");
  const debounceSearchTerm = useDebounce(searchTerm, 1000);
  // console.log("searchTerm:", searchTerm);
  console.log("searchTerm:", debounceSearchTerm);
  useEffect(() => {
    if(debounceSearchTerm){
      fetchSearchMovie(debounceSearchTerm);
    }
  }, [debounceSearchTerm]);

  const [searchResults, setSearchResults] = useState("")
  
  const fetchSearchMovie = async (searchTerm) => {
    // console.log("searchTerm", searchTerm);
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      // console.log("request",request);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className="movie" key={movie.id}>
                <div
                  onClick={() => navigate(`/${movie.id}`)}
                  className="movie__column-poster"
                >
                  <img
                    src={movieImageUrl}
                    alt={`${movie.name ? movie.name : movie.title}`}
                    className="movie__poster"
                  />
                </div>
                <p style={{color:'white'}}>{`${movie.name ? movie.name : movie.title}`}</p>
              </div>
            );
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>
            찾고자하는 검색어"{debounceSearchTerm}"에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    );
  }
  return renderSearchResults();
}

export default SearchPage