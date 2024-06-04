import { useContext, FormEvent, useState } from "react";
import Head from "next/head";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Link from "next/link";
import { toast } from "react-toastify";

import { MdSave } from "react-icons/md";
import { Form, ToolbarButton } from "./styles";
import { Input } from "../../components/ui/Input";
import { DivCol, DivRow, AreaComp } from "../../components/Global/styles";
import { PageContainer } from "../../components/PageContainer";
import { AuthContext } from "../../contexts/AuthContext";

export default function Usuario() {
  const { signUp } = useContext(AuthContext);
  const [eyeIsClosed, setEyeIsClosed] = useState(true);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha1, setSenha1] = useState("");
  const [senha2, setSenha2] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [loading, setLoading] = useState(false);

  async function handleSalvar(event: FormEvent) {
    event.preventDefault();
    /*
    if (nome === "" || email === "" || senha1 === "" || senha2 === "") {
      toast.warning("Todos os campos devem ser informados!");
      return;
    }
    */
    if (senha1 != senha2) {
      toast.warning("Senhas não conferem!!");
      return;
    }

    try {
      const dados = {
        nome: nome,
        email: email,
        senha: senha1,
        ativo: ativo,
      };

      setLoading(true);
      await signUp(dados);
      setLoading(false);
      
    } catch (err) {
      toast.error(`Erro ao salvar Usuário! ${err}`);
    }
  }

  return (
    <>
      <>
        <Head>
          <title>Cadastro de Usuários</title>
        </Head>

        <PageContainer
          titulo="Cadastro de Usuários"
          sair={true}
          wd="25%"
          hg="42vh"
        >
          <ToolbarButton>
            <button type="button" title="Salvar" onClick={handleSalvar}>
              <MdSave size={30} color="#FFFAFA" />
            </button>
          </ToolbarButton>

          <Form onSubmit={handleSalvar}>
            <DivRow>
              <DivCol wd="100%">
                <AreaComp hg="8vh" inputSize="35vh">
                  <label>Nome:</label>
                  <Input
                    type="text"
                    value={nome}
                    onChange={(ev) => setNome(ev.target.value)}
                    icon={null}
                    autoFocus={true}
                    maxLength={30}
                  />
                </AreaComp>

                <AreaComp hg="8vh" inputSize="35vh">
                  <label>Email:</label>
                  <Input
                    type="text"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    icon={null}
                    maxLength={40}
                  />
                </AreaComp>

                <AreaComp hg="8vh" inputSize="20vh">
                  <label>Senha:</label>
                  <Input
                    placeholder="Digite sua Senha"
                    type={eyeIsClosed ? "password" : "text"}
                    icon={eyeIsClosed ? BsFillEyeSlashFill : BsFillEyeFill}
                    maxLength={15}
                    value={senha1}
                    onChange={(ev) => setSenha1(ev.target.value)}
                  ></Input>
                </AreaComp>

                <AreaComp hg="8vh" inputSize="20vh" >
                  <Input
                    placeholder="Repita sua Senha"
                    type={eyeIsClosed ? "password" : "text"}
                    value={senha2}
                    onChange={(ev) => setSenha2(ev.target.value)}
                    icon={eyeIsClosed ? BsFillEyeSlashFill : BsFillEyeFill}
                    maxLength={15}
                  ></Input>
                </AreaComp>
              </DivCol>
            </DivRow>
          </Form>
        </PageContainer>
      </>
    </>
  );
}

/*
      <Head>
        <title>Cadastro de Usuários</title>
      </Head>


      <div className={styles.container}>
        <div className={styles.containerUsuario}>
          <form onSubmit={handleSalvar}>
            <label>Nome:</label>
            <Input
              type="text"
              onChange={(event) => setNome(event.target.value)}
              icon={null}
              value={nome}
            />

            <label>Email:</label>
            <Input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="text"
              icon={null}
            />

            <label>Senha:</label>
            <Input
              value={senha1}
              onChange={(event) => setSenha1(event.target.value)}
              placeholder="Digite sua Senha"
              type={eyeIsClosed ? "password" : "text"}
              icon={eyeIsClosed ? BsFillEyeSlashFill : BsFillEyeFill}
            />
            <Input
              value={senha2}
              onChange={(event) => setSenha2(event.target.value)}
              placeholder="Repita sua Senha"
              type={eyeIsClosed ? "password" : "text"}
              icon={eyeIsClosed ? BsFillEyeSlashFill : BsFillEyeFill}
            />

            <Button type="submit" loading={loading}>
              Salvar
            </Button>
          </form>
        </div>
      </div>

*/
