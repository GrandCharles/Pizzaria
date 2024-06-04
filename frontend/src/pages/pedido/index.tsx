import { FormEvent, useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import { AgGridTranslation } from "../../services/agGridTranslation";

import Head from "next/head";
import { toast } from "react-toastify";
import { MdEdit, MdSave, MdDelete, MdAddCircle } from "react-icons/md";
import { Input } from "../../components/ui/Input";
import MenuDrawer from "../../components/MenuDrawer";
import ToggleSwitch from "../../components/ToggleSwitch";

import { Form, ToolbarButton, GridContainer, ButtonAgGrid } from "./styles";
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
  formataMoedaPFloat,
  FormatDateBR,
  mascaraNumerica,
} from "../../utils/util";

const contextoTelaEnum = {
  CADASTRAR_P: "CADASTRAR PEDIDO",
  EDITAR_P: "EDITAR PEDIDO",

  CADASTRAR_IP: "CADASTRAR ITEM DE PEDIDO",
  EDITAR_IP: "EDITAR ITEM DE PEDIDO",
  //NADA_IP: "",
};

export default function Pedido() {
  const [contextoTela, setContextoTela] = useState(contextoTelaEnum.EDITAR_P);
  const [loading, setLoading] = useState(false);

  const [idPed, setIdPed] = useState("");
  const [codigo, setCodigo] = useState("");
  const [mesa, setMesa] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [dataPed, setDataPed] = useState("");
  const [totalPed, setTotalPed] = useState("");

  const [enviado, setEnviado] = useState(false);
  const [preparado, setPreparado] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [listaPedido, setListaPedido] = useState([]);

  const [idItemPed, setIdItemPed] = useState("");

  const [listaProduto, setListaProduto] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [qtde, setQtde] = useState("");

  const [vlrProd, setVlrProd] = useState("");
  const [idProd, setIdProd] = useState("");
  const [totalItem, setTotalItem] = useState("");

  const [listaPedidoItem, setListaPedidoItem] = useState([]);

  //=====================================================================================================
  // ======= PEDIDO
  //=====================================================================================================

  const limparFormPed = () => {
    setIdPed("");
    setCodigo("");
    setMesa("");
    setNomeCliente("");
    setTotalPed("");
    setDataPed("");
    setEnviado(false);
    setPreparado(false);
    setFinalizado(false);

    limparFormItemPed();
    setListaPedidoItem([]);
    //setContextoTela(contextoTelaEnum.NADA_IP);

    document.getElementById("iMesa").focus();
  };

  const onChangeCodigoPed = (ev) => {
    if (!ev.target.value) {
      limparFormPed();
      setContextoTela(contextoTelaEnum.EDITAR_P);
      return;
    }
    setCodigo(mascaraNumerica(ev.target.value));
  };

  async function listarPedido() {
    const url = "/listarPedido";

    try {
      const apiClient = setupAPIClient();
      const apiResponse = await apiClient.get(url, {});
      setListaPedido(apiResponse.data);
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao listar Produtos! ${error}`);
    }
  }

  const novoPedido = () => {
    limparFormPed();

    setDataPed(FormatDateBR(new Date()));

    setContextoTela(contextoTelaEnum.CADASTRAR_P);
  };

  async function handleSalvarPedido(event: FormEvent) {
    event.preventDefault();

    if (mesa === "") {
      toast.warning("Mesa deve ser informada!");
      document.getElementById("iMesa").focus();
      return;
    }

    try {
      const apiClient = setupAPIClient();

      // Inclusão
      if (contextoTela === contextoTelaEnum.CADASTRAR_P) {
        const data = {
          mesa: mesa,
          nomeCliente: nomeCliente,
        };

        const url = "/criarPedido";

        const response = await apiClient.post(url, data);

        toast.success("Pedido incluído com sucesso!");
      }

      // Alteração
      if (contextoTela === contextoTelaEnum.EDITAR_P) {
        if (idPed === "") {
          toast.warning("Id do Pedido não encontrado");
          return;
        }
        if (codigo === "") {
          toast.warning("Informe o Código do Pedido!");
          document.getElementById("iCodigo").focus();
          return;
        }

        const data = {
          mesa: mesa,
          nomeCliente: nomeCliente,
          enviado: enviado,
          preparado: preparado,
          finalizado: finalizado,
        };

        const url = `/alterarPedido?id=${idPed}`;
        await apiClient.put(url, data);

        toast.success("Pedido alterado com sucesso!");
      }

      setContextoTela(contextoTelaEnum.EDITAR_P);
      limparFormPed();
      listarPedido();
      document.getElementById("iCodigo").focus();
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao salvar Pedido! ${error}`);
    }
  }

  const handleEditarPed = async (ev) => {
    setContextoTela(contextoTelaEnum.EDITAR_P);
    setCodigo(ev.target.value);

    if (!ev.target.value || Number(ev.target.value) === 0) {
      limparFormPed();
      document.getElementById("iCodigo").focus();
      return;
    }

    const url = `/editarPedido?codigo=${ev.target.value}`;

    try {
      const apiClient = setupAPIClient();

      const apiResponse = await apiClient.get(url, {});

      if (apiResponse.data[0]) {
        setIdPed(apiResponse.data[0].id);
        setCodigo(apiResponse.data[0].codigo);
        setMesa(apiResponse.data[0].mesa);
        setNomeCliente(apiResponse.data[0].nomeCliente);
        setDataPed(FormatDateBR(apiResponse.data[0].created_at));
        setEnviado(apiResponse.data[0].enviado);
        setFinalizado(apiResponse.data[0].finalizado);
        setPreparado(apiResponse.data[0].preparadp);

        listarItemPedido(apiResponse.data[0].id);
      } else {
        toast.warning("Pedido não localizado!");
        limparFormPed();
      }
      document.getElementById("iNomeCliente").focus();
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao editar Pedido! ${error}`);
    }
  };

  const handleGridSelectPed = async (params) => {
    limparFormPed();
    limparFormItemPed();

    setIdPed(params.data.id);
    setCodigo(params.data.codigo);
    setMesa(params.data.mesa);
    setNomeCliente(params.data.nomeCliente);
    setDataPed(FormatDateBR(params.data.created_at));
    setEnviado(params.data.enviado);
    setPreparado(params.data.preparado);
    setFinalizado(params.data.finalizado);
    setTotalPed(params.data.total);
    listarItemPedido(params.data.id);

    setContextoTela(contextoTelaEnum.EDITAR_P);
    //document.getElementById("iNome").focus();
  };

  const handleExcluirPed = async (idRow: string) => {
    const userConfirmation = confirm(
      "Você tem certeza de que deseja excluir este Pedido?"
    );

    if (!userConfirmation) {
      limparFormPed();
      return;
    }

    const url = `/excluirPedido?id=${idRow}`;

    try {
      const apiClient = setupAPIClient();
      const apiResponse = await apiClient.delete(url, {});

      toast.success("Pedido excluído com sucesso!");

      listarPedido();
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao excluir Pedido! ${error}`);
    } finally {
      limparFormPed();
    }
  };

  //=====================================================================================================
  // ======= ITEM DE PEDIDO
  //=====================================================================================================
  const limparFormItemPed = () => {
    setIdItemPed("");
    setQtde("");
    setIdProd("");
    setVlrProd("");
    setTotalItem("");
    setProdutoSelecionado("");
  };

  const onChangeQtde = (ev) => {
    setQtde(ev.target.value);
    if (!ev.target.value || Number(ev.target.value) === 0) {
      setQtde("1");
    }
    const totPed = Number(ev.target.value) * parseFloat(vlrProd);
    setTotalItem(totPed.toString());
  };

  const onChangeProdSelec = (ev) => {
    setProdutoSelecionado(ev.target.value);

    setIdProd("");
    setQtde("");
    setVlrProd("");
    setTotalItem("");

    if (!ev.target.value || Number(ev.target.value) < 0) return;

    const qtde = 1;
    const vlr = listaProduto[ev.target.value].valor;

    setQtde("1");
    setIdProd(listaProduto[ev.target.value].id);
    setVlrProd(vlr);
    setTotalItem(vlr);

    document.getElementById("iQtde").focus();
  };

  const selectProduto = (id) => {
    const idCat = listaProduto.map((item, index) => {
      if (item.id === id) {
        setProdutoSelecionado(String(index));
      }
    });
  };

  const handleGridSelectItemPed = async (params) => {
    setIdItemPed(params.data.id);
    setIdProd(params.data.idProduto);
    setQtde(params.data.quantidade);
    setTotalItem(params.data.total);
    selectProduto(params.data.idProduto);
    setVlrProd(params.data.produto.valor);

    setContextoTela(contextoTelaEnum.EDITAR_IP);
  };

  async function atualizaTotalPedido(id: string) {
    let url = "";

    try {
      const apiClient = setupAPIClient();

      url = `/listarPedidoItem?id=${id}`;
      const apiResponse = await apiClient.get(url, {});
      const totalPedido = apiResponse.data.reduce((soma, itemPed) => {
        soma += formataMoedaPFloat(itemPed.total);
        return soma;
      }, 0);

      const data = {
        total: totalPedido,
      };
      url = `/setTotPed?id=${id}`;
      await apiClient.put(url, data);

      listarPedido();
      listarItemPedido(idPed);
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao atualizar total do Pedido! ${error}`);
    }
  }

  async function listarItemPedido(id: string) {
    limparFormItemPed();

    const url = `/listarPedidoItem?id=${id}`;

    try {
      const apiClient = setupAPIClient();
      const apiResponse = await apiClient.get(url, {});

      setListaPedidoItem(apiResponse.data);

      const totalPedido = apiResponse.data.reduce((soma, itemPed) => {
        soma += formataMoedaPFloat(itemPed.total);
        return soma;
      }, 0);

      setTotalPed(totalPedido);
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao listar Itens de Pedido! ${error}`);
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

  const novoItemPed = () => {
    limparFormItemPed();

    if (!idPed) return;

    setContextoTela(contextoTelaEnum.CADASTRAR_IP);
  };

  async function handleSalvarItemPedido(event: FormEvent) {
    event.preventDefault();

    if (!idPed) return;

    if (!idItemPed && contextoTela === contextoTelaEnum.EDITAR_P) return;

    if (idProd === "") {
      toast.warning("Produto deve ser selecionado!");
      return;
    }

    try {
      const apiClient = setupAPIClient();

      // Inclusão
      if (contextoTela === contextoTelaEnum.CADASTRAR_IP) {
        const data = {
          idPedido: idPed,
          idProduto: idProd,
          quantidade: Number(qtde),
          total: parseFloat(totalItem),
        };
        const url = "/criarPedidoItem";
        const response = await apiClient.post(url, data);
        toast.success("Item de Pedido incluído com sucesso!");
      }

      // Alteração
      if (contextoTela === contextoTelaEnum.EDITAR_IP) {
        const data = {
          idProduto: idProd,
          quantidade: Number(qtde),
          total: parseFloat(totalItem),
        };
        const url = `/alterarPedidoItem?id=${idItemPed}`;
        await apiClient.put(url, data);
        toast.success("Item de Pedido alterado com sucesso!");
      }

      listarItemPedido(idPed);
      atualizaTotalPedido(idPed);

      setContextoTela(contextoTelaEnum.EDITAR_P);
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao salvar Item de Pedido! ${error}`);
    }
  }

  const handleExcluirItemPed = async (idRow: string) => {
    const userConfirmation = confirm(
      "Você tem certeza de que deseja excluir este Item de Pedido?"
    );

    if (!userConfirmation) {
      limparFormItemPed();
      return;
    }

    const url = `/excluirPedidoItem?id=${idRow}`;

    try {
      const apiClient = setupAPIClient();
      const apiResponse = await apiClient.delete(url, {});

      toast.success("Item de Pedido excluído com sucesso!");

      listarItemPedido(idPed);
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao excluir Item de Pedido! ${error}`);
    } finally {
      limparFormItemPed();
    }
  };

  //=====================================================================================================
  // ======= Colunas e APIs da grid ========
  //=====================================================================================================
  const [, setGridInstance] = useState({ api: {}, columnApi: {} });
  const onGridReady = (params) => {
    /* obtem acesso às APIs da Ag-grid */
    setGridInstance({ api: params.api, columnApi: params.columnApi });
    params.api.sizeColumnsToFit();
  };

  const rowClassRulesPed = { "grid-red-row": (params) => true };
  const gridColumnDefPed = [
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
      field: "mesa",
      headerName: "MESA",
      minWidth: 70,
      maxWidth: 70,
      sortable: true,
      resizable: true,
      filter: true,
      lockVisible: true,
      cellStyle: { textAlign: "center" },
      //cellStyle: { fontWeight: 'bold' },
    },

    {
      field: "nomeCliente",
      headerName: "CLIENTE",
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
      field: "enviado",
      headerName: "ENVIADO",
      minWidth: 120,
      maxWidth: 120,
      sortable: true,
      filter: true,
      lockVisible: true,
      valueFormatter: ({ value }) => (value ? "Enviado" : "Não Enviado"),
      cellStyle: { textAlign: "left" },
    },

    {
      field: "preparado",
      headerName: "PREPARADO",
      //minWidth: 90,
      maxWidth: 90,
      //sortable: true,
      //resizable: true,
      //filter: true,
      lockVisible: true,
      cellStyle: { textAlign: "center" },
    },
    {
      field: "finalizado",
      headerName: "ABERTO",
      //minWidth: 90,
      maxWidth: 90,
      //sortable: true,
      //resizable: true,
      //filter: true,
      lockVisible: true,
      cellStyle: { textAlign: "center" },
    },
    {
      field: "created_at",
      headerName: "DATA",
      width: 100,
      sortable: true,
      resizable: true,
      filter: true,
      lockVisible: true,
      valueFormatter: ({ data }) => FormatDateBR(data.created_at),
      cellStyle: { textAlign: "center" },
    },
    {
      field: "total",
      headerName: "TOTAL",
      minWidth: 80,
      maxWidth: 110,
      resizable: false,
      valueFormatter: ({ data }) => FormataValorMonetario(data.total, false),
      cellStyle: { fontWeight: "bold", textAlign: "right" },
    },
    {
      field: "Pcodigo",
      headerName: "AÇÕES",
      width: 100,
      lockVisible: true,
      resizable: true,
      cellRendererFramework(params) {
        return (
          <>
            <ButtonAgGrid>
              <button
                type="button"
                title="Editar"
                onClick={() => handleGridSelectPed(params)}
              >
                <MdEdit size={22} color="#3fffa3" />
              </button>
              <button
                type="button"
                title="Excluir"
                onClick={() => handleExcluirPed(params.data.id)}
              >
                <MdDelete size={22} color="#ff3f4b" />
              </button>
            </ButtonAgGrid>
          </>
        );
      },
    },
  ];
  //===================================================================================================================
  const rowClassRulesPedItem = { "grid-red-row": (params) => true };
  const gridColumnDefPedItem = [
    {
      field: "produto.codigo",
      headerName: "CÓDIGO",
      minWidth: 70,
      maxWidth: 70,
      sortable: true,
      resizable: true,
      filter: true,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "produto.nome",
      headerName: "DESCRIÇÃO PRODUTO",
      minWidth: 80,
      maxWidth: 500,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "produto.descricao",
      headerName: "DESCRIÇÃO PRODUTO",
      minWidth: 80,
      maxWidth: 500,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "produto.unidade",
      headerName: "UNIDADE",
      minWidth: 80,
      maxWidth: 80,
      cellStyle: { textAlign: "center" },
    },
    {
      field: "quantidade",
      headerName: "QTDE",
      minWidth: 70,
      maxWidth: 70,
      cellStyle: { textAlign: "right" },
    },
    {
      field: "produto.valor",
      headerName: "VALOR",
      minWidth: 80,
      maxWidth: 110,
      resizable: false,
      valueFormatter: ({ data }) =>
        FormataValorMonetario(data.produto.valor, false),
      cellStyle: { textAlign: "right" },
    },
    {
      field: "total",
      headerName: "TOTAL",
      minWidth: 80,
      maxWidth: 110,
      resizable: false,
      valueFormatter: ({ data }) => FormataValorMonetario(data.total, false),
      cellStyle: { fontWeight: "bold", textAlign: "right" },
    },
    {
      field: "PIcodigo",
      headerName: "AÇÕES",
      width: 100,
      resizable: false,
      cellRendererFramework(params) {
        return (
          <>
            <ButtonAgGrid>
              <button
                type="button"
                title="Editar"
                onClick={() => handleGridSelectItemPed(params)}
              >
                <MdEdit size={22} color="#3fffa3" />
              </button>
              <button
                type="button"
                title="Excluir"
                onClick={() => handleExcluirItemPed(params.data.id)}
              >
                <MdDelete size={22} color="#ff3f4b" />
              </button>
            </ButtonAgGrid>
          </>
        );
      },
    },
  ];
  //===================================================================================================================
  //===================================================================================================================

  useEffect(() => {
    limparFormPed();
    listarPedido();
    listarProduto();

    document.getElementById("iCodigo").focus();
  }, []);

  return (
    <>
      <Head>
        <title>Pedidos</title>
      </Head>

      <MenuDrawer titulo="Pedidos" />

      <PageContainer
        titulo={`Cadastro de Pedidos - ${contextoTela}`}
        sair={false}
        wd="75%"
        hg="86vh"
      >
        <ToolbarButton>
          <button type="button" title="Novo Pedido" onClick={novoPedido}>
            <MdAddCircle size={30} color="#FFFAFA" />
          </button>

          <button
            type="button"
            title="Salvar Pedido"
            onClick={handleSalvarPedido}
          >
            <MdSave size={30} color="#FFFAFA" />
          </button>
        </ToolbarButton>

        <Form>
          <DivRow hg="11%" bc="#ff3f4b">
            <AreaComp wd="11vh" hg="8vh" inputSize="8vh" inputAlg="right">
              <label>Código:</label>
              <Input
                type="text"
                maxLength={6}
                icon={null}
                id="iCodigo"
                value={codigo}
                onChange={(ev) => onChangeCodigoPed(ev)}
                onKeyDown={(ev) =>
                  ev.key === "Enter" ? handleEditarPed(ev) : ""
                }
              />
            </AreaComp>

            <AreaComp wd="11vh" hg="8vh" inputSize="8vh">
              <label>Mesa:</label>
              <Input
                type="text"
                maxLength={8}
                icon={null}
                id="iMesa"
                value={mesa}
                onChange={(ev) => setMesa(ev.target.value)}
              />
            </AreaComp>

            <AreaComp wd="33vh" hg="8vh" inputSize="30vh">
              <label>Cliente:</label>
              <Input
                type="text"
                maxLength={30}
                icon={null}
                id="iNomeCliente"
                value={nomeCliente}
                onChange={(ev) => setNomeCliente(ev.target.value)}
              />
            </AreaComp>

            <AreaComp wd="15vh" hg="8vh" inputSize="12vh">
              <label>Data Pedido:</label>
              <Input
                type="text"
                disabled={true}
                icon={null}
                id="iDataPed"
                value={dataPed}
              />
            </AreaComp>

            <AreaComp wd="14vh" hg="8vh" inputAlg="right" inputSize="11vh">
              <label>Total:</label>
              <Input
                type="text"
                disabled={true}
                icon={null}
                id="iTotalItem"
                value={FormataValorMonetario(totalPed)}
              />
            </AreaComp>

            <AreaComp wd="27vh" hg="7.5vh" mgTop="5px">
              <ToggleSwitch
                name="Enviado"
                isChecked={enviado}
                onChange={(ev) => setEnviado(ev)}
                labelActive="Enviado"
                labelInactive="Não Enviado"
              />
            </AreaComp>

            <AreaComp wd="27vh" hg="7.5vh" mgTop="5px">
              <ToggleSwitch
                name="Preparado"
                isChecked={preparado}
                onChange={(ev) => setPreparado(ev)}
                labelActive="Preparado"
                labelInactive="Em Preparo"
              />
            </AreaComp>

            <AreaComp wd="25vh" hg="7.5vh" mgTop="5px">
              <ToggleSwitch
                name="Finalizado"
                isChecked={finalizado}
                onChange={(ev) => setFinalizado(ev)}
                labelActive="Fechado"
                labelInactive="Aberto"
              />
            </AreaComp>
          </DivRow>

          <Divider />

          <DivRow hg="35%" bc="#836FFF">
            <DivCol wd="100%">
              <AreaComp wd="100%" hg="25vh" mgTop="1px" bc="#7fff00">
                <GridContainer>
                  <section className="ag-theme-balham">
                    <AgGridReact
                      columnDefs={gridColumnDefPed}
                      rowData={listaPedido}
                      //rowSelection="single"
                      //rowClassRules={rowClassRulesPedItem}
                      alwaysShowVerticalScroll={true}
                      animateRows={true}
                      onGridReady={onGridReady}
                      gridOptions={{ localeText: AgGridTranslation }} // Texto da grid em Portugues
                    />
                  </section>
                </GridContainer>
              </AreaComp>
            </DivCol>
          </DivRow>
          {/*===================================================================================== */}
          {/*===================================================================================== */}

          <DivRow bc="#8B008B">
            <ToolbarButton>
              <button
                type="button"
                title="Novo Item de Pedido"
                onClick={novoItemPed}
              >
                <MdAddCircle size={30} color="#FFFAFA" />
              </button>

              <button
                type="button"
                title="Salvar Item de Pedido"
                onClick={handleSalvarItemPedido}
              >
                <MdSave size={30} color="#FFFAFA" />
              </button>
            </ToolbarButton>
          </DivRow>

          <DivRow hg="12%" bc="#D2691E">
            <AreaComp wd="35vh" hg="8vh">
              <label>Produto</label>
              <select
                id="iProd"
                tabIndex={5}
                value={produtoSelecionado}
                onChange={(ev) => onChangeProdSelec(ev)}
              >
                <option></option>
                {listaProduto.map((item, index) => {
                  return (
                    <option key={item.id} value={index}>
                      {`${item.nome} - ${item.codigo}`}
                    </option>
                  );
                })}
              </select>
            </AreaComp>

            <AreaComp wd="11vh" hg="8vh" inputSize="8vh" inputAlg="right">
              <label>Qtde:</label>
              <Input
                type="text"
                maxLength={6}
                icon={null}
                id="iQtde"
                value={qtde}
                onChange={(ev) => onChangeQtde(ev)}
              />
            </AreaComp>
            <AreaComp wd="13vh" hg="8vh" inputAlg="right" inputSize="10vh">
              <label>Valor:</label>
              <Input
                type="text"
                icon={null}
                disabled={true}
                id="iVlrProd"
                value={FormataValorMonetario(vlrProd)}
              />
            </AreaComp>
            <AreaComp wd="11vh" hg="8vh" inputAlg="right" inputSize="10vh">
              <label>Total:</label>
              <Input
                type="text"
                icon={null}
                disabled={true}
                id="iTotalItem"
                value={FormataValorMonetario(totalItem)}
              />
            </AreaComp>
          </DivRow>

          <Divider />

            
            <DivRow hg="30%">
              <DivCol>
                <AreaComp wd="99.9%" hg="24vh" mgTop="1px" bc="#7fff00">
                  <GridContainer>
                    <section className="ag-theme-balham">
                      <AgGridReact
                        columnDefs={gridColumnDefPedItem} // Define as colunas
                        rowData={listaPedidoItem}
                        rowSelection="single"
                        animateRows={true}
                        onGridReady={onGridReady}
                        gridOptions={{ localeText: AgGridTranslation }} // Texto da grid em Portugues
                      />
                    </section>
                  </GridContainer>
                </AreaComp>
              </DivCol>
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

