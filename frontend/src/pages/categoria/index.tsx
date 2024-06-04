import { FormEvent, useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import { AgGridTranslation } from "../../services/agGridTranslation";

import Head from "next/head";
import { toast } from "react-toastify";

import { MdEdit, MdSave, MdDelete, MdAddCircle } from "react-icons/md";

import { Input } from "../../components/ui/Input";
import MenuDrawer from "../../components/MenuDrawer";

import { Form, ToolbarButton, GridContainer, ButtonContainer } from "./styles";
import {
  DivCol,
  DivRow,
  AreaComp,
  Divider,
} from "../../components/Global/styles";

import { PageContainer } from "../../components/PageContainer";

import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";

import {
  FormataValorMonetario,
  formatarMoeda,
  FormatDateBR,
  mascaraNumerica,
} from "../../utils/util";

const contextoTelaEnum = {
  CADASTRAR: "CADASTRAR",
  EDITAR: "EDITAR",
  VISUALIZAR: "VIZUALIZAR",
};

export default function Categoria() {
  const [contextoTela, setContextoTela] = useState(contextoTelaEnum.EDITAR);
  const [loading, setLoading] = useState(false);

  const [id, setId] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [listaCategoria, setListaCategoria] = useState([]);

  const novoCadastro = () => {
    setContextoTela(contextoTelaEnum.CADASTRAR);

    limparFormulario();
  };

  const limparFormulario = () => {
    setId("");
    setCodigo("");
    setNome("");

    document.getElementById("iNome").focus();
  };

  async function handleSalvar(event: FormEvent) {
    event.preventDefault();

    if (nome === "") {
      toast.warning("Nome da Categoria deve ser informados!");
      document.getElementById("iNome").focus();
      return;
    }

    const dados = { nome: nome };

    try {
      const apiClient = setupAPIClient();
      const url = "/criarCategoria";

      // Inclusão
      if (contextoTela === contextoTelaEnum.CADASTRAR) {
        await apiClient.post(url, dados);
        toast.success("Categoria incluída com sucesso!");
      }

      // Alteração
      if (contextoTela === contextoTelaEnum.EDITAR) {
        if (id === "") {
          toast.warning("Id não encontrado");
          return;
        }
        if (codigo === "") {
          toast.warning("Informe o Código da Categoria!");
          return;
        }

        const url = `/alterarCategoria?id=${id}`;
        await apiClient.put(url, dados);

        toast.success("Categoria alterada com sucesso!");
      }

      limparFormulario();
      listarCategoria();
      setContextoTela(contextoTelaEnum.EDITAR);
      document.getElementById("iCodigo").focus();
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao salvar Categoria! ${error}`);
    }
  }

  async function listarCategoria() {
    const url = "/listarCategoria";

    try {
      const apiClient = setupAPIClient();

      const apiResponse = await apiClient.get(url, {});
      setListaCategoria(apiResponse.data);
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao listar Categoria! ${error}`);
    }
  }

  const onChangeCodigo = (ev) => {
    if (!ev.target.value) {
      limparFormulario();
      setContextoTela(contextoTelaEnum.EDITAR);
      document.getElementById("iCodigo").focus();
      return;
    }
    setCodigo(mascaraNumerica(ev.target.value));
  };

  const handleEditar = async (ev) => {
    setContextoTela(contextoTelaEnum.EDITAR);
    setCodigo(ev.target.value);

    if (!ev.target.value || parseInt(ev.target.value) === 0) {
      limparFormulario();
      document.getElementById("iCodigo").focus();
      return;
    }

    const url = `/editarCategoria?codigo=${ev.target.value}`;

    try {
      const apiClient = setupAPIClient();

      const apiResponse = await apiClient.get(url, {});

      if (apiResponse.data[0]) {
        setId(apiResponse.data[0].id);
        //setCodigo(apiResponse.data[0].codigo);
        setNome(apiResponse.data[0].nome);
      } else {
        toast.warning("Categoria não localizada!");
        setNome("");
      }
      document.getElementById("iNome").focus();
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao editar Categoria! ${error}`);
    }
  };

  const handleGridSelect = async (params) => {
    setId(params.data.id);
    setCodigo(params.data.codigo);
    setNome(params.data.nome);

    setContextoTela(contextoTelaEnum.EDITAR);
    document.getElementById("iNome").focus();
  };

  const handleExcluir = async (idRow: string) => {
    const userConfirmation = confirm(
      "Você tem certeza de que deseja deletar este item?"
    );
    if (!userConfirmation) {
      limparFormulario();
      document.getElementById("iCodigo").focus();
      return;
    }

    const url = `/excluirCategoria?id=${idRow}`;

    try {
      const apiClient = setupAPIClient();
      const apiResponse = await apiClient.delete(url, {});

      toast.success("Categoria excluída com sucesso!");
      listarCategoria();
    } catch (err) {
      toast.error(`Erro ao excluir Categoria! ${err}`);
    } finally {
      limparFormulario();
    }
  };

  // ======= Colunas e APIs da grid ========
  const [, setGridInstance] = useState({ api: {}, columnApi: {} });
  const onGridReady = (params) => {
    /* obtem acesso às APIs da Ag-grid */
    setGridInstance({ api: params.api, columnApi: params.columnApi });
    params.api.sizeColumnsToFit();
  };

  const gridColumnDef = [
    {
      field: "codigo",
      headerName: "CÓDIGO",
      minWidth: 30,
      maxWidth: 70,
      sortable: true,
      resizable: true,
      filter: true,
      //lockVisible: true,
      cellStyle: { fontWeight: "bold" },
    },

    {
      field: "nome",
      headerName: "NOME",
      minWidth: 100,
      maxWidth: 800,
      sortable: true,
      resizable: true,
      filter: true,
      lockVisible: true,
      flex: 1,
      cellStyle: { textAlign: "left" },
      //cellStyle: { fontWeight: 'bold' },
    },
    

    {
      field: "Ccodigo",
      headerName: "AÇÕES",
      width: 100,
      lockVisible: true,
      resizable: true,
      cellRendererFramework(params) {
        return(
          <>
            <ButtonContainer>
              <button
                type="button"
                title="Editar"
                onClick={() => handleGridSelect(params)}
              >
                <MdEdit size={22} color="#3fffa3" />
              </button>
              <button
                type="button"
                title="Excluir"
                onClick={() => handleExcluir(params.data.id)}
              >
                <MdDelete size={22} color="#ff3f4b" />
              </button>
            </ButtonContainer>
          </>
          )
      }

      /*
      cellRenderer(params) {
        return (
          <>
            <ButtonContainer>
              <button
                type="button"
                title="Editar"
                onClick={() => handleGridSelect(params)}
              >
                <MdEdit size={22} color="#3fffa3" />
              </button>
              <button
                type="button"
                title="Excluir"
                onClick={() => handleExcluir(params.data.id)}
              >
                <MdDelete size={22} color="#ff3f4b" />
              </button>
            </ButtonContainer>
          </>
        );
      },
      */
    },
    
  ];
  const rowClassRules = { "grid-red-row": (params) => true };

  useEffect(() => {
    limparFormulario();
    listarCategoria();
    setContextoTela(contextoTelaEnum.EDITAR);

    document.getElementById("iCodigo").focus();
  }, []);

  return (
    <>
      <Head>
        <title>Categoria</title>
      </Head>

      <MenuDrawer titulo="Categoria" />

      <PageContainer
        titulo={`Cadastro de Categoria - ${contextoTela}`}
        sair={false}
        wd="45%"
        hg="60vh"
      >
        <ToolbarButton>
          <button type="button" title="Novo Cadastro" onClick={novoCadastro}>
            <MdAddCircle size={30} color="#FFFAFA" />
          </button>

          <button type="button" title="Salvar" onClick={handleSalvar}>
            <MdSave size={30} color="#FFFAFA" />
          </button>
        </ToolbarButton>

        <Form>
          <DivRow>
            <AreaComp wd="12vh" hg="35%" inputAlg="right" inputSize="6vh">
              <label>Código:</label>
              <Input
                type="text"
                //disabled={contextoTela === contextoTelaEnum.CADASTRAR ? true : false}
                maxLength={6}
                icon={null}
                id="iCodigo"
                value={codigo}
                onChange={(ev) => onChangeCodigo(ev)}
                onKeyDown={(ev) => (ev.key === "Enter" ? handleEditar(ev) : "")}
              />
            </AreaComp>

            <AreaComp wd="45vh" hg="35%" inputSize="40vh">
              <label>Descrição:</label>
              <Input
                type="text"
                maxLength={40}
                icon={null}
                id="iNome"
                value={nome}
                onChange={(ev) => setNome(ev.target.value)}
              />
            </AreaComp>
          </DivRow>

          <Divider />

          <DivRow bc="#7B68EE">
            <AreaComp hg="41vh">
              <GridContainer>
                <section className="ag-theme-balham">
                  <AgGridReact
                    columnDefs={gridColumnDef}
                    rowData={listaCategoria}
                    rowSelection="single"
                    rowClassRules={rowClassRules}
                    animateRows
                    onGridReady={onGridReady}
                    gridOptions={{ localeText: AgGridTranslation }}

                    //overlayLoadingTemplate={'<span className="ag-overlay-loading-center">Nenhum item para ser exibido</span>'}
                    //overlayNoRowsTemplate={'<span className="ag-overlay-loading-center">Nenhum item para ser exibido</span>'}
                  />
                </section>
              </GridContainer>
            </AreaComp>
          </DivRow>
        </Form>
      </PageContainer>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
