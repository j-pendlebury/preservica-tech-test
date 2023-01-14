import { useEffect, useState, useCallback } from 'react'; 
import './UsersList.css';

const UsersList = () => {
  const [userData, setUserData] = useState([]);
  const [userDetail, setUserDetail] = useState('');
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('https://jsonplaceholder.typicode.com/users');
        const response = await data.json();
        
        setUserData(response);  
      } catch (error) {
        console.log(error)
      }
    }

    fetchData();
  }, []);

  const showDetail = (userId) => {
    const user = userData.filter(user => user.id === userId);
    setUserDetail(user);
  };

  const removeUser = (userId) => {
    const userList = userData.filter(user => user.id !== userId);
    setUserData(userList);
  }

 const searchUser = ({ target: { value }}) => {
  const searchUser = userData.filter(user => user.name === value || user.username === value);

  if (searchUser.length > 0) {
    setFilteredData(searchUser);
  } else {
    setFilteredData(null);
  }
 };

  return (
    <>
      <input type="text" placeholder="type to search" onChange={(e) => searchUser(e)} />
      <div className={`users-list ${!!userDetail ? 'single-column' : 'double-column'}`}>
        {
          !!filteredData ? (
          filteredData.map((user, key) => {
            return (
                <div key={key} className="user-wrapper">
                  <p>{user.username}</p>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <button onClick={() => showDetail(user.id)}>Details</button>
                  <button onClick={() => removeUser(user.id)}>Delete</button>
                </div>
            )
          })) : (
            userData.map((user, key) => {
            return (
                <div key={key} className="user-wrapper">
                  <p>{user.username}</p>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <button onClick={() => showDetail(user.id)}>Details</button>
                  <button onClick={() => removeUser(user.id)}>Delete</button>
                </div>
            )
          })
          )
        }
        { !!userDetail && (
          <div className="user-detail">
            <p>{userDetail[0].username}</p>
            <p>{userDetail[0].name}</p>
            <p>{userDetail[0].email}</p>
            <p>
              {`${userDetail[0].address.street}, ${userDetail[0].address.city}, ${userDetail[0].address.zipcode}`}
            </p>
            <p>{userDetail[0].phone}</p>
            <p>{userDetail[0].company.name}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default UsersList;
