import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFetchFirestore } from "../../hooks/useFetchFirestore";
import { User } from "../../typings/user";
import { Icon } from "../icon/Icon";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { projectFirestore } from "../../firebase/config";
import { v4 as uuidv4 } from "uuid";
import { useToastify } from "../../hooks/useToastify";
import gigahaka from "../../img/giga haka.png";
import "./home.scss";

export const Home = () => {
  const { state } = useAuthContext();
  const { data, isPending, error } = useFetchFirestore("users");
  const [usersCount, setUsersCount] = useState<number>(2);
  const { notify } = useToastify();
  useEffect(() => {
    state.user ? setUsersCount(3) : setUsersCount(2);
  }, [state.user]);
  console.log(data, isPending, error);

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nation, setNation] = useState<string>("");

  const handleAddUser = () => {
    const uuid = uuidv4();
    const newUser = {
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email,
      nation: nation,
      role: "user",
      user_id: uuid,
    };

    const userRef = doc(collection(projectFirestore, "users"), uuid);

    setDoc(userRef, newUser)
      .then(() => {
        notify("success", "Uživatel byl úspěšně přidán");
        setFirstname("");
        setLastname("");
        setPhone("");
        setEmail("");
        setNation("");
        window.location.reload();
      })
      .catch((error) => {
        console.log("error", "User se nepodařilo přidat");
        console.error("Error adding film:", error);
      });
  };

  // const handleEditUser = (id: string) => {
  //   const userId = id;
  //   const userRef = doc(collection(projectFirestore, "kino"), userId);

  //   const updatedUser = {
  //     firstname: firstname,
  //     lastname: lastname,
  //     phone: phone,
  //     email: email,
  //     nation: nation,
  //     role: "user",
  //   };

  //   updateDoc(userRef, updatedUser)
  //     .then(() => {
  //       console.log("success", "Uživatel byl úspěšně upraven");
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.log("error", "Film se nepodařilo upravit");
  //       console.error("Error adding film:", error);
  //     });
  // };

  const deleteUser = async (id: string) => {
    const userId = id;
    const userRef = doc(collection(projectFirestore, "users"), userId);
    deleteDoc(userRef)
      .then(() => {
        console.log("success", "Uživatel byl úspěšně smazán");
        window.location.reload();
      })
      .catch((error) => {
        console.log("error", "Uživatele se nepodařilo smazat");
        console.error("Error adding film:", error);
      });
  };
  return (
    <>
      <div className="bestUsers">
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {(data as User[]).slice(0, usersCount).map((user: User, key) => (
          <div key={key} className="user__card">
            <img src={gigahaka} alt="user" />
            <p>{user.firstname}</p>
            <p>{user.lastname}</p>
            <p>{user.phone}</p>
            <p>{user.email}</p>
            <p>{user.nation}</p>
            <button>Zobrazit uživatele</button>
          </div>
        ))}
      </div>
      {state.user ? (
        <form>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <br />
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <br />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="text"
            value={nation}
            onChange={(e) => setNation(e.target.value)}
          />
          <br />
          <button type="button" onClick={() => handleAddUser()}>
            Přidat uživatele
          </button>
        </form>
      ) : null}

      <table className="table">
        <thead>
          <tr>
            <th>Jmeno</th>
            <th>Příjmení</th>
            <th>Telefon</th>
            <th>Email</th>
            <th>Země</th>
            <th>Akce</th>
          </tr>
        </thead>
        <tbody>
          {isPending && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {(data as User[]).map((user: User, key) => (
            <tr key={key}>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.nation}</td>
              {state.user ? (
                <td>
                  <button>
                    <Icon name="pen" type="fas" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteUser(user.user_id)}
                  >
                    <Icon name="trash" type="fas" />
                  </button>
                </td>
              ) : (
                <td></td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
