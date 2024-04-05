import React, {useEffect, useState} from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = useState('')
  const [invites, setInvites] = useState([3, 1]);

  useEffect(() => {
    fetch('https://reqres.in/api/users')
    .then((res) => res.json())
    .then((json) => { 
      setUsers(json.data);
    })
    .catch((err) => {
     console.warn('Error', err)
     alert('Ошибка при получения пользователей')
  })
    .finally(() => setLoading(false))
  }, [])

  const onChangeValue = (event) => {
    setValue(event.target.value)
  }
  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id))
    } else {
      setInvites(prev => [...prev, id])
    }
  }
  return (
    <div className="App">
      <Users value={value}
             items={users} i
             sLoading={isLoading}
             onChangeValue={onChangeValue}  
             invites={invites}
             onClickInvite={onClickInvite}             />
      {/* <Success /> */}
    </div>
  );
}

export default App;
