import React, {useEffect, useState} from 'react';
import './App.css';
import { GET_ALL_USERS, GET_ONE_USER } from './query/user';
import {useQuery, useMutation} from "@apollo/client";
import { CREATE_USER } from './mutation/user';

function App() {
  const {data, loading, error, refetch} = useQuery(GET_ALL_USERS);
  const {data:oneUser, loading:loadingOneUser} = useQuery(GET_ONE_USER, {
    variables: {
      id: 1
    }
  });
  console.log(oneUser);
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUserName] = useState('');
  const [age, setAge] = useState(0);

  const addUser = (e) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          username, age
        }
      }
    }).then( ({data}) => {
      console.log(data);
      setUserName('');
      setAge(0);
    });
  }
  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data]);
  
  const getAll = (e) => {
    e.prevetnDefault();
    refetch()
  }
  if (loading) {
    return <h2>Loading...</h2>
  };

  return (
    <div className="App">
      <form>
        <input placeholder="Input user name" value={username} onChange={e => setUserName(e.target.value)} type="text" />
        <input placeholder="Input user age" value={age} onChange={e => setAge(Number(e.target.value))} type="number" />
        <div className="btns">
          <button onClick={(e) => addUser(e)}>Create User</button>
          <button onClick={(e) => getAll(e)}>Get User</button>
        </div>
      </form>
      <div>
        {users.map( user => <div className="user" key={user.id}>{user.id}. {user.username} {user.age}</div>)}
      </div>
    </div>
  );
}

export default App;
