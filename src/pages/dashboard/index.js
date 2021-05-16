import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'

import './dashboard.scss';
import Header from '../../components/header';
import Loader from '../../components/loader';
import close from '../../assets/images/close.png'
export default () => {
   

    const token = useSelector(({login:{token}})=>token)

    const [title,setTitle] = useState('')
    const [movies, setMovies] = useState([])
    const [year, setYear] =useState('')
    const [isLoading, setLoader] = useState(false)
    const [showPopup, setPopup] =useState(true)
    const [movieDetail, setMovieDetail] = useState(null)

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{
      searchMovie('batman');
    },[])

    useEffect(()=>{
      title.length>0 && searchMovie()
    },[title])

    useEffect(()=>{
      title.length>0 && searchMovie()
    },[year])

    useEffect(()=>{
      if(movieDetail) setPopup(true)
    },[movieDetail])

    const searchMovie = (key=title,yearkey=year) => {
      setLoader(true)
      let url = `http://www.omdbapi.com/?apikey=${token}&s=${key}`
      if(yearkey.length) url +=`&y=${yearkey}`
      fetch(url)
        .then(res => res.json())
        .then(res=>{
            console.log("got res",res);
            let moviesList = res.Search ? res.Search : []
            setMovies(moviesList) 
        })
        .catch(err=>{
          console.log('got error',err)
        })
        .finally(()=>setLoader(false))
    }

    const getDetailData = (id) => {
      setLoader(true)
      let url = `http://www.omdbapi.com/?apikey=${token}&i=${id}`
      fetch(url)
        .then(res => res.json())
        .then(res=>{
            console.log("got res",res);
            res && setMovieDetail(res)
        })
        .catch(err=>{
          console.log('got error',err)
        })
        .finally(()=>setLoader(false))
    }

    const handleLogOut = () => {
      dispatch({
        type:'CLEAR_TOKEN'
      });
      history.push('/')
    }

    const showDetail = (id) => {
      setMovieDetail(null);
      getDetailData(id)
    }

    const showDetailListView = (list) => {
      const {Poster,Ratings,...restDetails} = list
      return Object.entries(restDetails).map((item)=>{
        const [key,value] = item;
        return(
          <tr>
            <td className='head'> {key} </td> 
            <td className='content'> { value}</td>
          </tr>
        )
      })
    }

    return (
        <div className='dash-container'>
            <Header onSearchTitle={setTitle} title={title} onSearchYear={setYear} year={year} handleLogOut={handleLogOut}/>
              <div className='dash-body'>
              {
                isLoading?
                  <div className='loader-wrapper'><Loader /> </div>
                :
                 
                  movies.length>0&&movies.map(item=>{
                  return (
                  <div className='dash-item' onClick={()=>showDetail(item.imdbID)}>
                      <img src={item.Poster} alt='No image'/>
                      <div>{item.Title} </div>
                      <span> {item.Year} </span>
                  </div>
                  
                  )})
                  
              }
            </div>
            { showPopup && movieDetail &&  
              <div className='dash-popup'>
                <div className='popup-container'>
                  <div className='popup-header'>
                    <img src={close} onClick={()=>setPopup(false)}/>
                  </div>
                  <div className='popup-sec1'>
                    <img src={movieDetail.Poster}/>
                  </div>
                  <div className='popup-sec2'>
                    <table>
                      {
                          showDetailListView(movieDetail)
                      }
                      
                    </table>
                  </div>
                </div>
              </div>
            }
        </div>
    )
}