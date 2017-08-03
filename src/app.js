import {render} from 'react-dom';
import React, {Component} from 'react';





// O componente Pokemon mostrará um monstro Pokemon individual
// Mostra uma imagem do Pokémon e
// mostra o nome dele também.
class Pokemon extends Component{
  render(){
    const {pokemon,id} = this.props;
    return <div className="pokemon--species">
            <div className="pokemon--species--container">
              <div className="pokemon--species--sprite">
                <img src={`sprites/sprites/${id}.png`} />
                </div>
              <div className="pokemon--species--name"> {pokemon.name} </div>
             </div>
          </div>;
    }
}
export default Pokemon
/// O componente PokemonList não mostra nada quando ele se monta pela primeira vez 
// Mas logo antes de montar no DOM, faz um 
// chamada de API para buscar os primeiros 151 Pokémon da API e 
// então exibe-os usando o componente Pokemon /

class PokemonList extends Component{
  constructor(props){
    super(props);
    this.state = {
      species : [],
      fetched : false,
      loading : false,
    };
  }
  componentWillMount(){
    this.setState({
      loading : true
    });
    fetch('http://pokeapi.co/api/v2/pokemon?limit=151').then(res=>res.json())
    .then(response=>{
      this.setState({   
        species : response.results,
        loading : true,
        fetched : true
      });
    });
  }

    render(){
    const {fetched, loading, species} = this.state;
    let content ;
    if(fetched){
      content = <div className="pokemon--species--list">{species.map((pokemon,index)=><Pokemon key={pokemon.name} id={index+1} pokemon={pokemon}/>)}</div>;
    }else if(loading && !fetched){
        content = <p> Carregando ...</p>;
    }
    else{
      content = <div/>;
    }
    return  <div>
      {content}
    </div>;
  }
}



// ///Este é o componente raiz/
class PokeApp extends Component{
  render(){
    return <div className="pokeapp">
      <h1> Listagem de Pokemons </h1>
     < PokemonList />
    </div>;
  }
}

render(<PokeApp/>,document.getElementById('app'))


