import Login from "../components/Login";
import Signin from "../components/Signin";
import { useState } from 'react';

const LoginPage = () => {

  const [isSelected, setIsSelected] = useState(true)

  return (
    <>
      <form>
        <label>
          Inscription
          <input name="form_selection"
            type="radio"
            value="signin"
            checked={!isSelected && true}
            onChange={() => setIsSelected(!isSelected)}
          />
        </label>

        <label>
          Connexion
          <input name="form_selection"
            type="radio"
            value="login"
            checked={isSelected && true}
            // defaultChecked
            onChange={() => setIsSelected(!isSelected)}
          />
        </label>
      </form>

      {
        isSelected ?
          <Login />
          :
          <Signin isSelected={isSelected} setIsSelected={setIsSelected} />
      }
    </>
  );
};

export default LoginPage;





