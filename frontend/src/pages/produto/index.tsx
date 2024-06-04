import { FormEvent, useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";

import { AgGridReact } from "ag-grid-react";
import { AgGridTranslation } from "../../services/agGridTranslation";

import Head from "next/head";
import { toast } from "react-toastify";

import { MdEdit, MdSave, MdDelete, MdAddCircle } from "react-icons/md";
import { FiUpload } from "react-icons/fi";

import { Input } from "../../components/ui/Input";
import MenuDrawer from "../../components/MenuDrawer";

import {
  Form,
  ToolbarButton,
  GridContainer,
  ButtonContainer,
  LabelAvatar,
} from "./styles";

import {
  DivCol,
  DivRow,
  AreaComp,
  Divider,
} from "../../components/Global/styles";

import {
  FormataValorMonetario,
  formatarMoeda,
  FormatDateBR,
  mascaraNumerica,
} from "../../utils/util";

import { PageContainer } from "../../components/PageContainer";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";

import styled from "styled-components";
import { object } from "prop-types";

const contextoTelaEnum = {
  CADASTRAR: "CADASTRAR",
  EDITAR: "EDITAR",
  VISUALIZAR: "VIZUALIZAR",
};

export default function Produto() {
  const [contextoTela, setContextoTela] = useState(contextoTelaEnum.EDITAR);
  const [loading, setLoading] = useState(false);

  const [id, setId] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [unidade, setUnidade] = useState("");
  const [valor, setValor] = useState("");
  const [created_at, setCreated_at] = useState("");

  const [imagemUrl, setImagemUrl] = useState("");
  const [imagem, setImagem] = useState(null);
  const urlImg = "http://localhost:3333/pathImagens/"

  //const [imagemUrl2, setImagemUrl2] = useState("http://localhost:3333/pathImagens");
  //const [imagem2, setImagem2] = useState(null);

  const [listaProduto, setListaProduto] = useState([]);

  const [listaCategoria, setListaCategoria] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  const novoCadastro = () => {
    limparFormulario();
    setCreated_at(FormatDateBR(new Date()));
    setContextoTela(contextoTelaEnum.CADASTRAR);
    document.getElementById("iNome").focus();
  };

  const limparFormulario = () => {
    setId("");
    setCodigo("");
    setNome("");
    setDescricao("");
    setUnidade("");
    setValor("");
    setCreated_at("");
    setImagemUrl("");
    setImagem(null);

    setCategoriaSelecionada("-1");

    document.getElementById("iNome").focus();
  };

  async function listarCategoria() {
    const url = "/listarCategoria";

    try {
      const apiClient = setupAPIClient();
      const apiResponse = await apiClient.get(url, {});
      setListaCategoria(apiResponse.data);
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao listar Categorias! ${error}`);
    }
  }

  async function listarProduto() {
    const url = "/listarProduto";

    try {
      const apiClient = setupAPIClient();
      const apiResponse = await apiClient.get(url, {});
      setListaProduto(apiResponse.data);
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao listar Produtos! ${error}`);
    }
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const image = event.target.files[0];

    if (!image) return;

    if (image.type === "image/jpeg" || image.type === "image/png") {
      setImagemUrl(URL.createObjectURL(image));
      setImagem(image);
    }
  }

  //=======================================================================================
  async function handleSalvar(event: FormEvent) {
    event.preventDefault();

    if (nome === "") {
      toast.warning("Nome do Produto deve ser informado!");
      document.getElementById("iNome").focus();
      return;
    }
    if (descricao === "") {
      toast.warning("Descrição do Produto deve ser informado!");
      document.getElementById("iNome").focus();
      return;
    }
    if (unidade === "") {
      toast.warning("Unidade do Produto deve ser informado!");
      document.getElementById("iUnidade").focus();
      return;
    }
    if (valor === "") {
      toast.warning("Valor do Produto deve ser informado!");
      document.getElementById("iValor").focus();
      return;
    }
    if (Number(categoriaSelecionada) < 0) {
      toast.warning("Categoria deve ser selecionada!");
      document.getElementById("iValor").focus();
      return;
    }

    if (imagemUrl === "") {
      toast.warning("Imagem do Produto deve ser selecionada!");
      return;
    }
    
    const data = new FormData();
    data.append("codigo", codigo);
    data.append("nome", nome);
    data.append("descricao", descricao);
    data.append("unidade", unidade);
    data.append("valor", valor.replace(",", "."));
    data.append("idCategoria", listaCategoria[categoriaSelecionada].id);
    data.append("file", imagem);

    try {
      const apiClient = setupAPIClient();

      // Inclusão
      if (contextoTela === contextoTelaEnum.CADASTRAR) {
        const url = "/criarProduto";

        const response = await apiClient.post(url, data);

        toast.success("Produto incluído com sucesso!");
      }

      // Alteração
      if (contextoTela === contextoTelaEnum.EDITAR) {
        if (id === "") {
          toast.warning("Id não encontrado");
          return;
        }
        if (codigo === "") {
          toast.warning("Informe o Código do Produto!");
          document.getElementById("iCodigo").focus();
          return;
        }

        const url = `/alterarProduto?id=${id}`;
        await apiClient.put(url, data);

        toast.success("Produto alterado com sucesso!");
      }

      setContextoTela(contextoTelaEnum.EDITAR);
      limparFormulario()
      listarProduto();
      document.getElementById("iCodigo").focus();
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao salvar Produto! ${error}`);
    }
  }

  const onChangeCodigo = (ev) => {
    if (!ev.target.value) {
      limparFormulario();
      setContextoTela(contextoTelaEnum.EDITAR);
      return;
    }
    setCodigo(mascaraNumerica(ev.target.value));
  };


  const handleEditar = async (ev) => {
    setCodigo(ev.target.value);

    setContextoTela(contextoTelaEnum.EDITAR);

    if (!ev.target.value || parseInt(ev.target.value) === 0) {
      limparFormulario();
      document.getElementById("iCodigo").focus();
      return;
    }

    const url = `/editarProduto?codigo=${ev.target.value}`;

    try {
      const apiClient = setupAPIClient();

      const apiResponse = await apiClient.get(url, {});

      if (apiResponse.data[0]) {
        setId(apiResponse.data[0].id);
        //setCodigo(apiResponse.data.codigo);
        setCreated_at(FormatDateBR(apiResponse.data[0].created_at));
        setNome(apiResponse.data[0].nome);
        setDescricao(apiResponse.data[0].descricao);
        setUnidade(apiResponse.data[0].unidade);
        setValor(FormataValorMonetario(apiResponse.data[0].valor));
        selectCategoria(apiResponse.data[0].idCategoria);

        setImagemUrl(urlImg + apiResponse.data[0].imagem);

      } else {
        toast.warning("Produto não localizado!");
        limparFormulario();
        document.getElementById("iCodigo").focus();
      }

    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao editar Produto! ${error}`);
    }
  };

  const selectCategoria = (idCategoria) => {
    const idCat = listaCategoria.map((item, index) => {
      if (item.id === idCategoria) {
        setCategoriaSelecionada(String(index));
      }
    });
  };

  const handleExcluir = async (idRow: string) => {
    //if (idRow !== id) return;

    const userConfirmation = confirm(
      "Você tem certeza de que deseja excluir este item?"
    );
    if (!userConfirmation) {
      limparFormulario();
      return;
    }

    const url = `/excluirProduto?id=${idRow}`;

    try {
      const apiClient = setupAPIClient();
      const apiResponse = await apiClient.delete(url, {});

      toast.success("Produto excluído com sucesso!");
      listarProduto();
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao excluir Produto! ${error}`);
    } finally {
      limparFormulario();
    }
  };
  //======================================================================================================================
  //======================================================================================================================

  const handleGridSelect = async (params) => {
    limparFormulario();

    setId(params.data.id);
    setCodigo(params.data.codigo);
    setNome(params.data.nome);
    setDescricao(params.data.descricao);
    setUnidade(params.data.unidade);
    setValor(FormataValorMonetario(params.data.valor));
    setCreated_at(FormatDateBR(params.data.created_at));
    selectCategoria(params.data.idCategoria);

    setImagemUrl(urlImg + params.data.imagem);
       
    setContextoTela(contextoTelaEnum.EDITAR);
    document.getElementById("iNome").focus();
  };

  // ======= Colunas e APIs da grid ========
  const [, setGridInstance] = useState({ api: {}, columnApi: {} });
  const onGridReady = (params) => {
    /* obtem acesso às APIs da Ag-grid */
    setGridInstance({ api: params.api, columnApi: params.columnApi });
    params.api.sizeColumnsToFit();
  };
  const rowClassRules = { "grid-red-row": (params) => true };

  const gridColumnDef = [
    {
      field: "codigo",
      headerName: "CÓDIGO",
      minWidth: 30,
      maxWidth: 70,
      resizable: false,
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
    },

    {
      field: "descricao",
      headerName: "DESCRIÇÃO",
      minWidth: 100,
      maxWidth: 800,
      sortable: true,
      resizable: true,
      filter: true,
      lockVisible: true,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "categoria.nome",
      headerName: "CATEGORIA",
      minWidth: 80,
      maxWidth: 110,
      sortable: true,
      resizable: true,
      filter: true,
      lockVisible: true,
      cellStyle: { textAlign: "left" },
    },

    {
      field: "unidade",
      headerName: "Unidade",
      minWidth: 80,
      maxWidth: 80,
      resizable: false,
      cellStyle: { textAlign: "center" },
    },
    {
      field: "valor",
      headerName: "VALOR",
      width: 130,
      sortable: true,
      resizable: false,
      valueFormatter: ({ data }) => FormataValorMonetario(data.valor, false),  cellStyle: { fontWeight: "bold", textAlign: "right" },
    },

    {
      field: "created_at",
      headerName: "DATA",
      width: 100,
      sortable: true,
      resizable: false,
      valueFormatter: ({ data }) => FormatDateBR(data.created_at),
      cellStyle: { textAlign: "center" },
    },
    {
      field: "Ccodigo",
      headerName: "AÇÕES",
      width: 100,
      resizable: false,
      cellRendererFramework(params) {
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
    },
  ];

  useEffect(() => {
    listarProduto();
    listarCategoria();
    setContextoTela(contextoTelaEnum.EDITAR);

    document.getElementById("iCodigo").focus();
  }, []);

  return (
    <>
      <Head>
        <title>Pedidos</title>
      </Head>

      <MenuDrawer titulo="Produtos" />

      <PageContainer
        titulo={`Cadastro de Produtos - ${contextoTela}`}
        sair={false}
        wd="75%"
        hg="85vh"
      >
        <ToolbarButton>
          <button type="button" title="Novo Cadastro" onClick={novoCadastro}>
            <MdAddCircle size={30} color="#FFFAFA" />
          </button>

          <button type="button" title="Salvar" onClick={handleSalvar}>
            <MdSave size={30} color="#FFFAFA" />
          </button>
        </ToolbarButton>

        <Form onSubmit={handleSalvar}>
          <DivRow>
            <DivCol wd="35%">
              <AreaComp wd="55vh" hg="8vh" inputSize="8vh" inputAlg="right">
                <label>Código:</label>
                <Input
                  type="text"
                  //disabled={contextoTela === contextoTelaEnum.CADASTRAR ? true : false}
                  maxLength={6}
                  icon={null}
                  tabIndex={1}
                  id="iCodigo"
                  value={codigo}
                  onChange={(ev) => onChangeCodigo(ev)}
                  onKeyDown={(ev) =>
                    ev.key === "Enter" ? handleEditar(ev) : ""
                  }
                />
              </AreaComp>

              <AreaComp wd="55vh" hg="8vh" inputSize="35vh">
                <label>Nome:</label>
                <Input
                  type="text"
                  icon={null}
                  maxLength={35}
                  tabIndex={3}
                  //autoFocus={contextoTela === contextoTelaEnum.CADASTRAR ? true : false}
                  id="iNome"
                  value={nome}
                  onChange={(ev) => setNome(ev.target.value)}
                />
              </AreaComp>

              <AreaComp wd="55vh" hg="8vh" >
                <label>Categoria</label>
                <select
                  tabIndex={5}
                  value={categoriaSelecionada}
                  onChange={(ev) => setCategoriaSelecionada(ev.target.value)}
                >
                  <option></option>
                  {listaCategoria.map((item, index) => {
                    return (
                      <option key={item.id} value={index}>
                        {`${item.nome} - ${item.codigo}`}
                      </option>
                    );
                  })}
                </select>
              </AreaComp>
            </DivCol>

            <DivCol wd="35%" bdr="true">
              <AreaComp wd="55vh" hg="8vh" inputSize="12vh">
                <label>Data Cadastro:</label>
                <Input
                  type="text"
                  icon={null}
                  tabIndex={2}
                  maxLength={35}
                  disabled={true}
                  id="iDescricao"
                  value={created_at}
                  //onChange={(ev) => setDescricao(ev.target.value)}
                />
              </AreaComp>

              <AreaComp wd="55vh" hg="8vh" inputSize="35vh">
                <label>Descrição:</label>
                <Input
                  type="text"
                  icon={null}
                  maxLength={35}
                  tabIndex={4}
                  id="iDescricao"
                  value={descricao}
                  onChange={(ev) => setDescricao(ev.target.value)}
                />
              </AreaComp>

              <DivCol wd="100%">
                <DivRow>
                  <DivCol wd="50%">
                    <AreaComp wd="27vh" hg="8vh" inputSize="7vh">
                      <label>Unid:</label>
                      <Input
                        type="text"
                        icon={null}
                        maxLength={3}
                        tabIndex={6}
                        id="iUnidade"
                        value={unidade}
                        onChange={(ev) => setUnidade(ev.target.value)}
                      />
                    </AreaComp>
                  </DivCol>

                  <DivCol wd="50%">
                    <AreaComp wd="27vh" hg="8vh" inputAlg="right" inputSize="15vh"
                    >
                      <label>Valor:</label>
                      <Input
                        type="text"
                        icon={null}
                        maxLength={12}
                        tabIndex={7}
                        id="iValor"
                        name="nValor"
                        value={valor}
                        onChange={(ev) => setValor(formatarMoeda(ev.target.value))}
                      />
                    </AreaComp>
                  </DivCol>
                </DivRow>
              </DivCol>
            </DivCol>

            <DivCol wd="30%">
              <AreaComp wd="99.8%" hg="24vh">

                <LabelAvatar>
                  <span title="Upload de Imagem">
                    <FiUpload size={40} color="#00008B" />
                  </span>

                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFile}
                  />

                  {imagemUrl && (
                    <img
                      src={imagemUrl}
                      alt="Foto do Produto"
                    />
                  )}
                </LabelAvatar>

              </AreaComp>
            </DivCol>
          </DivRow>

          <Divider />

          <DivRow>
            <DivCol wd="100%">
              <AreaComp wd="100%" hg="99%" mgTop="1px">
                <GridContainer className="ag-theme-balham">
                  <AgGridReact
                    columnDefs={gridColumnDef}
                    rowData={listaProduto}
                    //rowSelection="single"
                    rowClassRules={rowClassRules}
                    animateRows
                    gridOptions={{ localeText: AgGridTranslation }}
                    onGridReady={onGridReady}
                  />
                </GridContainer>
              </AreaComp>
            </DivCol>
          </DivRow>
        </Form>
      </PageContainer>
    </>
  );
}

// Lado servidor
export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
