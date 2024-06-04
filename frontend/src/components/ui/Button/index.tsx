import { ReactNode, ButtonHTMLAttributes, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";

import styles from "./styles.module.scss";
import { ButtonContainer } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
  wd?: string;
  hg?: string;
  bg?: string;
}

// Botoes acessar/salvar
export function Button({ loading, children, wd, hg, bg, ...rest}: ButtonProps) {
  return (
    
    <ButtonContainer wd={wd} hg={hg} bg={bg}>

      <button disabled={loading} {...rest}>
        {loading ? (
          <FaSpinner color="#FFF" size={16} />
        ) : (
          <a>{children}</a>
        )}
      </button>
      
    </ButtonContainer>
  );
}

/*
export function ButtonSenha(eyeIsClosed) {
  const inputRef = useRef(null);
  //const [eyeIsClosed, setEyeIsClosed] = useState(false);

  const toggleShow = () => {
    if (eyeIsClosed === "password") {
      //setEyeIsClosed(true);
      inputRef.current.type = "text";
    } else {
      //setEyeIsClosed(false);
      inputRef.current.type = "password";
    }
  };

  return (
    <button onClick={toggleShow} ref={inputRef}>
      {eyeIsClosed ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
    </button>)

}
*/
