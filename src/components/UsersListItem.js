import { removeUser } from '../store';
import { useThunk } from '../hooks/use-thunk';

import Button from './Button';
import { GoTrashcan } from 'react-icons/go';

function UsersListItem({ user }) {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleRemoveUser = () => {
    doRemoveUser(user);
  };

  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        <div className="flex flex-row items-center justify-between">
          <Button
            className="mr-3"
            loading={isLoading}
            onClick={handleRemoveUser}
          >
            <GoTrashcan />
          </Button>
          {error && <div>Error deleting user...</div>}
          {user.name}
        </div>
      </div>
    </div>
  );
}

export default UsersListItem;
