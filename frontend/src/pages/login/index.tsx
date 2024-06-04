import { useContext, FormEvent, useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { toast } from "react-toastify";

import logo from "../../../public/logo.jpg";

import { AreaComp } from "../../components/Global/styles";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { AuthContext } from "../../contexts/AuthContext";
import { canSSRGuest } from "../../utils/canSSRGuest";

//import styles from "./styles.module.scss";
import { Container, ContainerLogo, ContainerLogin, Text } from "./styles";

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("usuario@gmail.com");
  const [senha, setSenha] = useState("123");
  const [loading, setLoading] = useState(false);

  //-------------------------------------------------------
  const inputRef = useRef(null);
  const [eyeIsClosed, setEyeIsClosed] = useState(false);
  /*
  const toggleShow = () => {
    if (inputRef.current.type === "password") {
      setEyeIsClosed(true);
      inputRef.current.type = "text";
    } else {
      setEyeIsClosed(false);
      inputRef.current.type = "password";
    }
  };
  */
  //-------------------------------------------------------
  const imageStyle = {
    borderRadius: "50%",
    border: "1px solid #fff",
    height: "auto",
  };

  async function logar(event: FormEvent) {
    // evitar recarregamento da pagina
    event.preventDefault();

    if (email === "" || senha === "") {
      toast.warning("Email e senha devem ser informados!");
      return;
    }

    setLoading(true);
    await signIn({ email, senha });
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Faça seu Login</title>
      </Head>

      <Container>
        <ContainerLogo>
          <img src="logo.jpg" />
        </ContainerLogo>

        <ContainerLogin>
          <form onSubmit={logar}>
            <AreaComp inputSize="17.2vw">
              <label>Email:</label>
              <Input
                placeholder="Digite seu Email"
                type="text"
                icon={null}
                maxLength={50}
                hg="30px"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </AreaComp>

            <AreaComp inputSize="16vw">
              <label>Senha:</label>
              <Input
                placeholder="Digite sua Senha"
                type={eyeIsClosed ? "password" : "text"}
                icon={eyeIsClosed ? BsFillEyeSlashFill : BsFillEyeFill}
                maxLength={15}
                hg="30px"
                value={senha}
                onChange={(ev) => setSenha(ev.target.value)}
              ></Input>
            </AreaComp>

            <AreaComp algItem="center" inputSize="400px">
              <Button
                type="submit"
                loading={loading}
                wd="100%"
                hg="35px"
                bg="#00ff7f"
              >
                Acessar
              </Button>
            </AreaComp>
          </form>
          <Link href="/usuario">
            <Text>
              Não possui uma conta? Cadastra-se
             </Text>
          </Link>

        </ContainerLogin>
      </Container>
    </>
  );
}

// Executado no lado do Servidor
export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});

/*
    <>
      <Head>
        <title>Faça seu Login</title>
      </Head>

      <div className={styles.container}>

        <div className={styles.containerLogo}>
          <Image src={logo} alt="GrandCharles" />
        </div>

        <div className={styles.containerLogin}>

          <form onSubmit={logar}>

            <AreaComp inputSize="17vw">
              <label>Email:</label>
              <Input
                placeholder="Digite seu Email"
                type="text"
                icon={null}
                maxLength={50}
                hg="30px"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </AreaComp>

            <AreaComp inputSize="16vw">
              <label>Senha:</label>
              <Input
                placeholder="Digite sua Senha"
                type={eyeIsClosed ? "password" : "text"}
                icon={eyeIsClosed ? BsFillEyeSlashFill : BsFillEyeFill}
                maxLength={15}
                hg="30px"
                
                value={senha}
                onChange={(ev) => setSenha(ev.target.value)}
              ></Input>
            </AreaComp>

            <AreaComp algItem="center"  inputSize="400px">
              <Button
                type="submit"
                loading={loading}
                wd="100%"
                hg="35px"
                bg="#00ff7f"
              >
                Acessar
              </Button>
            </AreaComp>
          </form>

          <Link href="/usuario">
            <a className={styles.text}>Não possui uma conta? Cadastra-se</a>
          </Link>
        </div>

      </div>
    </>

*/
