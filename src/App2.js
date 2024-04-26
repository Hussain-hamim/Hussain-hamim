import React from "react";
import UserService from "./services/user-services";
import useUser from "./hooks2/useUsers";

const App2 = () => {
  //this is a custom hook:
  const { users, error, isLoading, setError, setUsers } = useUser();

  // // optimistic update vs pessimistic update:
  //1: uptate the UI first and then call the server.
  //2: call the server first and update the UI.
  //optimistic update:
  function deleteUser(user) {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    //persist the changes[delete] in the server.[sending req to server to delete the specific user.]
    UserService.delete(user.id).catch((error) => {
      setError(error.message);
      //if an error occur we should restore the UI the original state:
      setUsers(originalUsers);
    }); // return a promise
  }

  function addUser() {
    const originalUsers = [...users];
    //create new user and of course for real time we can use form to enter our data:
    const newUser = { id: 0, name: "Hussain" };
    //optimistic update:
    //udating the UI first:
    setUsers([newUser, ...users]);

    //then updating the server with new data via post method:
    UserService.create(newUser)
      .then((res) => setUsers([res.data, ...users]))
      .catch((error) => {
        //if any error occur then show the error message and set users to it's original state
        setError(error.message);
        setUsers(originalUsers);
      });
  }

  function updateUser(user) {
    const originalUsers = [...users];
    //create new object
    const updatedUser = { ...user, name: "Mr. " + user.name + "!" };
    //map or update the new user to the UI:
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    //now lets Update the server there two methods patch for updating some properties of object and
    //put method for replacing an object:
    UserService.update(updatedUser).catch((error) => {
      setError(error.message);
      setUsers(originalUsers);
    });
  }

  return (
    <div>
      {isLoading && <div className="spinner-border"></div>}
      <div className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </div>

      <p className="text-danger">{error}</p>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-danger mx-1"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App2;

////////////////

////// First way to fetch data using async await:
// const controller = new AbortController();
// setLoading(true);
// const fetchUsers = async () => {
//   try {
//     //return a promis
//     const res = await apiClient.get(
//       "/users",
//       { signal: controller.signal }
//     );
//     console.log(res.data);
//     setUsers(res.data);
//     setLoading(false);
//   } catch (error) {
//     if (error instanceof CanceledError) return;
//     setError(error.message);
//     setLoading(false);
//   }
// };
// fetchUsers();
// // fetchUsers().finally(() => {
// //   setLoading(false);
// // });
// return () => controller.abort();
// setUsers(userss.data);

///////************************************************ */
////// Second way to fetch data using then:
