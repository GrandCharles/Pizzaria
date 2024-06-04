//import moment from 'moment';
import { format } from 'date-fns/format';
import { ptBR } from 'date-fns/locale/pt-BR';
import { parse } from 'date-fns/parse';
import { zonedTimeToUtc } from 'date-fns-tz';


export function FormataValorMonetario(valor, usarCifrao = false) {
  const val = valor || 0;
  let valorFormatado = parseFloat(val).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
  if (!usarCifrao) {
    valorFormatado = valorFormatado.replace('R$', '').trimStart();
  }
  return valorFormatado;
}

export function mascaraNumerica(valor) {
  const vlr = valor.replace(/\D/g, '').replace(/(\d{6})\d+?$/, '$1');
  return vlr
};

export function FormatDateBR(date) {
  const dt = format(date, 'dd/MM/yyyy', { locale: ptBR });

  return dt;
}

export function formatarMoeda(valor: string = '') {
  if (valor === '') return ''

  let v: string = String(valor).replace(/\D/g, '');
  v = (parseInt(v) / 100).toFixed(2).toString();
  v = v.replace('.', ',');
  v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
  v = v.replace(/(\d)(\d{3}),/g, '$1.$2,');
  return v;
}

export function formataMoedaPFloat(valor, casaDecimal = 2) {
  if (!isNaN(Number(valor)) && typeof Number(valor) === 'number' && valor % 1 !== 0) {
    return Number(Number(valor).toFixed(2));
  }
  if (typeof valor === 'number' && valor % 2 !== 0 && valor % 2 !== 1) {
    return valor;
  }
  return toFloat(String(valor).replace('R$', '').replace(/[. ]+/g, ''), casaDecimal);
}
export function toFloat(valor, casaDecimal = 2) {
  return typeof valor === 'string' ? Number(parseFloat(valor.replace(',', '.')).toFixed(casaDecimal)) : 0;
}

export function dataHoraZone() {
  const datahora = new Date()
  const dataFormatada = format(datahora,"dd/MM/yyyy")

  //const parsedDate = parseISO(datahora);

  //const znDate = zonedTimeToUtc(parsedDate, 'America/Sao_Paulo');

  //const dataZone = addHours(znDate, 3);
  //addedDate = addHours(znDate, 3);

  return dataFormatada;
  
};


const formatDataHoraExtenso = (dt) => {
  const semana = new Array("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado");
  const mes = new Array("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro");

  const dataExtenso = "";

  return dataExtenso;
};



/*
export function CalculaPercentual(total, n, fixed2 = true) {
  if (n <= 0) {
    return 0;
  }
  const percent = (n / total) * 100;
  return fixed2 ? percent.toFixed(2) : percent;
}

export function getDateYearMonth(data) {
  return `${data.getFullYear()}-${(data.getMonth() + 1).toString().padStart(2, 0)}`;
}

export function FormatCalculaPercentual(total, n, fixed2 = true) {
  if (!total || !n) return 0;
  const result = CalculaPercentual(total, n, fixed2) - 100;
  return result > -100 ? result.toFixed(2) : 0;
}

export function stringValueFormat(valor, usarCifrao = true) {
  const val = valor || 0;
  let valorFormatado = parseFloat(
    String(val).replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace(',', '.')
  ).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
  if (!usarCifrao) {
    valorFormatado = valorFormatado.replace(' ', '').replace('R$', '').trimStart();
  }
  return valorFormatado;
}

export function formataMoedaPFloat(valor, n = 2) {
  if (!isNaN(Number(valor)) && typeof Number(valor) === 'number' && valor % 1 !== 0) {
    return Number(Number(valor).toFixed(2));
  }
  if (typeof valor === 'number' && valor % 2 !== 0 && valor % 2 !== 1) {
    return valor;
  }
  return toFloat(String(valor).replace('R$', '').replace(/[. ]+/g, ''), n);
}

export function formatarMoeda(valor = '') {
  let v = String(valor).replace(/\D/g, '');

  v = (v / 100).toFixed(2).toString();

  v = v.replace('.', ',');

  v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');

  v = v.replace(/(\d)(\d{3}),/g, '$1.$2,');
  return v;
}



export const FormataCasasDecimais = (valor, tm) => {
  return parseFloat(valor).toFixed(tm).replace('.', ',');
};

export function MascaraDecimal(fieldName, formRef) {
  let valor = formRef.current.getFieldValue(fieldName);
  valor = valor.replace(/^\D/, '').replace(/[^0-9.,]/g, '');
  formRef.current.setFieldValue(fieldName, valor);
}

export function mascaraNumerica(fieldName, formRef) {
  let valorInput = formRef.current.getFieldValue(fieldName);
  valorInput = valorInput.replace(/\D/g, '').replace(/(\d{6})\d+?$/, '$1');
  formRef.current.setFieldValue(fieldName, valorInput);
};

export function toFixedDecimal(v, n = 2) {
  return !v ? 0 : parseFloat(v.toFixed(n));
}

export function toFloat(v, n = 2) {
  return typeof v === 'string' ? Number(parseFloat(v.replace(',', '.')).toFixed(n)) : 0;
}



export function FormatDate(date) {
  if (!date || date.toString() === 'Invalid Date') return null;
  if (date) return moment(date).format('DD/MM/YYYY HH:mm');
}

export function FormatDateBR(date) {
  if (!date || date.toString() === 'Invalid Date') return null;
  if (date) return moment(date).format('DD/MM/YYYY');
}

export function DateUS(date) {
  if (!date || date.toString() === 'Invalid Date') return null;
  if (date) return moment(date).format('YYYY-MM-DD');
}

export function NameMonth(v, reverseType = null) {
  let _plus = '';
  if (reverseType === 'mm/yyyy') {
    const vArr = v.split('/');
    // eslint-disable-next-line prefer-destructuring
    v = vArr[0];
    // eslint-disable-next-line no-unused-vars
    _plus = `/${vArr[1]}`;
  }
  // eslint-disable-next-line prefer-destructuring
  else if (reverseType === 'yyyy-mm') v = v.split('-')[1];
  const arr = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return arr[Number(v) - 1] + _plus;
}

export async function GetDataFile(url) {
  if (!url) return '';
  const { data } = await axios.get(url, { responseType: 'blob' });
  if (!data.type.includes('image')) return '';
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(data);
  });
}

export function gerarNumeroAleatorio() {
  return Math.floor(Date.now() * Math.random());
}

export function transformaValorNegativoEmPositivo(valor) {
  if (valor > 0) {
    return valor;
  }
  return valor - valor * 2;
}

export function getUF() {

  const opcoesUfs = [
    //{ value: 'UF', label: 'INFORME A UF' },
    { value: 'AC', label: 'ACRE' },
    { value: 'AL', label: 'ALAGOAS' },
    { value: 'AM', label: 'AMAZONAS' },
    { value: 'AP', label: 'AMAPÁ' },
    { value: 'BA', label: 'BAHIA' },
    { value: 'CE', label: 'CEARÁ' },
    { value: 'DF', label: 'DISTRITO FEDERAL' },
    { value: 'ES', label: 'ESPÍRITO SANTO' },
    { value: 'EX', label: 'EXTERIOR' },
    { value: 'GO', label: 'GOIÁS' },
    { value: 'MA', label: 'MARANHÃO' },
    { value: 'MG', label: 'MINAS GERAIS' },
    { value: 'MS', label: 'MATO GROSSO DO SUL' },
    { value: 'MT', label: 'MATO GROSSO' },
    { value: 'PA', label: 'PARÁ' },
    { value: 'PB', label: 'PARAÍBA' },
    { value: 'PE', label: 'PERNAMBUCO' },
    { value: 'PI', label: 'PIAUÍ' },
    { value: 'PR', label: 'PARANÁ' },
    { value: 'RJ', label: 'RIO DE JANEIRO' },
    { value: 'RN', label: 'RIO GRANDE DO NORTE' },
    { value: 'RS', label: 'RIO GRANDE DO SUL' },
    { value: 'RO', label: 'RONDÔNIA' },
    { value: 'RR', label: 'RORAIMA' },
    { value: 'SC', label: 'SANTA CATARINA' },
    { value: 'SP', label: 'SÃO PAULO' },
    { value: 'SE', label: 'SERGIPE' },
    { value: 'TO', label: 'TOCANTINS' },
  ];

  return opcoesUfs
};

//===================================================================================================
//====== VALIDA O CPF E CNPJ  =======================================================================
//===================================================================================================
export function validaCpfCnpj(val, tpPes = 'F') {

  if (!val) return true;

  if (tpPes === 'F') {
    let cpf = val.trim();
    cpf = cpf.replace(/\./g, '');
    cpf = cpf.replace('-', '');
    cpf = cpf.split('');

    if (cpf.length !== 11) return false;

    let v1 = 0;
    let v2 = 0;
    let aux = false;

    for (let i = 1; cpf.length > i; i++) {
      if (cpf[i - 1] !== cpf[i]) {
        aux = true;
      };
    };

    if (aux === false) return false;

    for (let i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
      v1 += cpf[i] * p;
    };

    v1 = ((v1 * 10) % 11);

    if (v1 === 10) v1 = 0;

    if (v1 !== Number(cpf[9])) return false;

    for (let i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
      v2 += cpf[i] * p;
    };

    v2 = ((v2 * 10) % 11);

    if (v2 === 10) v2 = 0;

    if (v2 !== Number(cpf[10])) {
      return false;
    } else {
      return true;
    };

  } else

    if (tpPes === 'J') {
      let cnpj = val.trim();

      cnpj = cnpj.replace(/\./g, '');
      cnpj = cnpj.replace('-', '');
      cnpj = cnpj.replace('/', '');
      cnpj = cnpj.split('');

      if (cnpj.length !== 14) return false;

      let v1 = 0;
      let v2 = 0;
      let aux = false;

      for (let i = 1; cnpj.length > i; i++) {
        if (cnpj[i - 1] !== cnpj[i]) {
          aux = true;
        };
      };

      if (aux === false) return false;

      for (let i = 0, p1 = 5, p2 = 13; (cnpj.length - 2) > i; i++, p1--, p2--) {
        if (p1 >= 2) {
          v1 += cnpj[i] * p1;
        } else {
          v1 += cnpj[i] * p2;
        };
      };

      v1 = (v1 % 11);

      if (v1 < 2) {
        v1 = 0;
      } else {
        v1 = (11 - v1);
      };

      if (v1 !== Number(cnpj[12])) return false;

      for (let i = 0, p1 = 6, p2 = 14; (cnpj.length - 1) > i; i++, p1--, p2--) {
        if (p1 >= 2) {
          v2 += cnpj[i] * p1;
        } else {
          v2 += cnpj[i] * p2;
        }
      };

      v2 = (v2 % 11);

      if (v2 < 2) {
        v2 = 0;
      } else {
        v2 = (11 - v2);
      };

      if (v2 !== Number(cnpj[13])) {
        return false;
      } else {
        return true;
      };

    } else {
      return false;
    };
};


//===================================================================================================
//====== MASCARA DE CPF PARA COMPONENTES INPUT ======================================================
//===================================================================================================
export function cpfMask(fieldName, formRef) {
  let valor = formRef.current.getFieldValue(fieldName);

  valor = valor.replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada

  formRef.current.setFieldValue(fieldName, valor);
};

//===================================================================================================
//====== MASCARA DE CNPJ PARA COMPONENTES INPUT =====================================================
//===================================================================================================
export function cnpjMask(fieldName, formRef) {
  let valor = formRef.current.getFieldValue(fieldName);

  valor = valor.replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
    .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2') // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') // captura os dois últimos 2 números, com um - antes dos dois números

  formRef.current.setFieldValue(fieldName, valor);
};

//===================================================================================================
//====== MASCARA DE TELEFONE PARA COMPONENTES INPUT =====================================================
//===================================================================================================
export function foneMask(fieldName, formRef) {
  let valor = formRef.current.getFieldValue(fieldName);

  valor = valor.replace(/\D/g, "")      //Remove tudo o que não é dígito
    .replace(/^(\d{2})(\d)/g, "($1) $2")  //Coloca parênteses em volta dos dois primeiros dígitos
    .replace(/(\d)(\d{4})$/, "$1-$2")     //Coloca hífen entre o quarto e o quinto dígitos

  formRef.current.setFieldValue(fieldName, valor);
}

//===================================================================================================
//====== MASCARA DE CEP PARA COMPONENTES INPUT =====================================================
//===================================================================================================
export function cepMask(fieldName, formRef) {
  let valor = formRef.current.getFieldValue(fieldName);

  valor = valor.replace(/\D/g, "")     //Remove tudo o que não é dígito
    .replace(/(\d{5})(\d)/, '$1-$2')    // format os 5 digitos
    .replace(/(-\d{3})\d+?$/, '$1')     //Coloca o hifen após o 5 dígito

  formRef.current.setFieldValue(fieldName, valor);
}

export function formataTelefone(val) {
  let valor = String(val);

  valor = valor.replace(/\D/g, "")      //Remove tudo o que não é dígito
    .replace(/^(\d{2})(\d)/g, "($1) $2")  //Coloca parênteses em volta dos dois primeiros dígitos
    .replace(/(\d)(\d{4})$/, "$1-$2")     //Coloca hífen entre o quarto e o quinto dígitos
  return valor;
};

export function formataCep(val) {
  let valor = String(val);

  valor = valor.replace(/\D/g, "")     //Remove tudo o que não é dígito
    .replace(/(\d{5})(\d)/, '$1-$2')    // format os 5 digitos
    .replace(/(-\d{3})\d+?$/, '$1')     //Coloca o hifen após o 5 dígito

  return valor;
};
*/