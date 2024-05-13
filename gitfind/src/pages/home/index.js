import { useState } from "react";
import { Header } from "../../components/Header";
import { ItemList }  from "../../components/ItemList";
import background from "../../assets/background.png";
import './styles.css';

function App() {
  const [user, setUser] = useState('');
  const [correntUser, setCorrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const hundleGetData = async () =>{
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if(newUser.name){
      const {avatar_url, name, bio, login} = newUser;
      setCorrentUser({avatar_url, name, bio, login});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length){
        setRepos(newRepos);
      }
    }
  }

  return (
    <div className="App">
      <Header />

      <div className="conteudo">
        
        <img src={background} class="background" alt="background app"/>
        
        <div class="info">
        
          <div>
            <input name="usuario" value={user} onChange={event => setUser(event.target.value)} placeholder="@username"/>
            <button onClick={hundleGetData}>Buscas</button>
          </div>
          {correntUser?.name ? (
            <>
            <div class="perfil">
              <img src={correntUser.avatar_url} class="profile" alt="Profile"/>
              <div>
                <h3>{correntUser.name}</h3>
                <spam>@{correntUser.login}</spam>
                <p>{correntUser.bio}</p>
              </div>
            </div>

            <hr />
            </>
          ) : null}
          

          {repos?.length ? (
            
              <div>

                <h4 className="repositorio">Repositorios</h4>
                {repos.map((repo) => (
                  <ItemList title={repo.name} description={repo.description}/>

                ))}
                
              
              </div>
          ) : null}
          

        </div>
      
      </div>
    
    </div>
  );
}

export default App;
