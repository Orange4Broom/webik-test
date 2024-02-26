import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import "./navigation.scss";

export const Navigation = () => {
  const { login } = useLogin();
  const { logout } = useLogout();

  const { state } = useAuthContext();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginUser = () => {
    login({ email: email, password: password });
    setEmail("");
    setPassword("");
  };

  const logoutUser = () => {
    logout();
  };
  return (
    <nav>
      <h1>Navigation</h1>
      {!state.user ? (
        <form>
          <input
            type="text"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={() => loginUser()}>
            Search
          </button>
        </form>
      ) : (
        <div>
          <button onClick={() => logoutUser()}>Log out</button>
        </div>
      )}
    </nav>
  );
};
