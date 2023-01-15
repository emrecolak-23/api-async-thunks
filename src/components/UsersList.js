import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';

import { useThunk } from '../hooks/use-thunk';

import Skeleton from './Skeleton';
import Button from './Button';

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);

  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleAddUser = () => {
    doCreateUser();
  };

  if (isLoadingUsers) {
    return <Skeleton times={6} className="h-10 w-full" />;
  }

  if (loadingUsersError) {
    return <div>Error fetching data...</div>;
  }

  const renderedUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-between m-2">
        <h1 className="m-2 text-xl">Users</h1>
        {isCreatingUser ? (
          'Creating User...'
        ) : (
          <Button onClick={handleAddUser}>+ Add User</Button>
        )}
        {creatingUserError && 'Error Creating User...'}
      </div>
      {renderedUsers}
    </div>
  );
}

export default UsersList;
