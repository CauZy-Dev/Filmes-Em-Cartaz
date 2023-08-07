import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme-info.css';
import {toast} from 'react-toastify';

import api from "../../services/api";

function Filme(){
  
  const {id} = useParams();
  const navigation = useNavigate();

  const [filme,setfilme] = useState ({});
  const[loading,setLoading] = useState(true);

  useEffect(()=>{
    async function loadFilmes(){
      await api.get(`/movie/${id}`,{
        params:{
          api_key:"c155be9f721368a19436f9555940f3fa",
          language:"pt-BR",
        }
      })
      .then((response) =>{
        setfilme(response.data);
        setLoading(false);
      })
      .catch(()=>{
        navigation("/",{ replace:true });
        return;
      })
  }
    loadFilmes();
    return() =>{
      console.log('coponete foi desmontantdo')
    }
  }, [navigation,id])

  function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos  = JSON.parse(minhaLista) || []; 

    const hasFilme = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filme.id );

    if(hasFilme){
      toast.warn("Esse filme já esta em sua lista ! ")
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme Salvo com sucesso !")

  }

  if(loading){
    return(
      <div className="filme.info">
        <h1>
          Carregando detalhes....
        </h1>
      </div>
    );
  }

  return(
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}` } alt={filme.title}/>

      <h3>Sinopse</h3>
      <spam>{filme.overview}</spam>

      <strong>Avaliação: {filme.vote_average} /10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title}trailer`}>Trailer</a>
        </button>
      </div>
    </div>
  );
}

export default Filme;