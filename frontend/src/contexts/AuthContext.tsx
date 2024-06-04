import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { api } from "../services/apiClient";
import { toast } from "react-toastify";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: SignUpProps) => Promise<void>;
  signOut: () => void;
};

type UserProps = {
  id: string;
  nome: string;
  email: string;
  ativo: boolean;
};

type SignInProps = {
  email: string;
  senha: string;
};

type SignUpProps = {
  nome: string;
  email: string;
  senha: string;
  ativo: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

// Autenticação do usuário
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  useEffect(() => {
    // Pegando o token do usuário no cookie
    const { "@nextAuth.token": token } = parseCookies();

    if (token) {
      api
        .get("/logarUser")
        .then((response) => {
          const { id, nome, email, ativo } = response.data;

          setUser({ id, nome, email, ativo });
        })
        .catch(() => {
          // Caso haja erro vamos deslogar o usuário
          signOut();
        });
    }
  }, []);

  // Loga o usuário e registra o token
  async function signIn({ email, senha }: SignInProps) {
    try {
      const response = await api.post("/logarUser", {
        email,
        senha,
      });
      const { id, nome, ativo, token } = response.data;

      setCookie(undefined, "@nextAuth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 30 dias
        path: "/", // todas as rotas usarão o cookie
      });

      setUser({
        id,
        nome,
        email,
        ativo,
      });

      // Passando para as requisições o token
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      localStorage.setItem("nomeUser", nome);

      toast.success("Logado com sucesso!");

      Router.push("/dashboard");
    } catch (err) {
      const response = err.response.data.error
      toast.error(`Erro ao logar! \n ${response}`);
    }
  }

  // Cadastra um novo usuário
  async function signUp({ nome, email, senha, ativo }: SignUpProps) {
    try {
      await api
        .post("/criarUser", { nome, email, senha })
        .then((response) => {});

      toast.success("Usuário cadastrado com sucesso!");

      Router.push("/");
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao salvar Usuário! ${error}`);
    } finally {
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function signOut() {
  try {
    localStorage.removeItem("nomeUser");
    destroyCookie(undefined, "@nextAuth.token");
    Router.push("/");
  } catch (err) {
    toast.error(`Erro ao deslogar! ${err}`);
  }
}
