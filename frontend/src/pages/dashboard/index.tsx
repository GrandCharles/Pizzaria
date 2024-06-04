import Link from "next/link";
import Head from "next/head";
import { MdAddCircle, MdClose, MdSave } from "react-icons/md";

import { Form } from "./styles";
import MenuDrawer from "../../components/MenuDrawer";
import { PageContainer } from "../../components/PageContainer";
import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>DashBoard</title>
      </Head>

      <MenuDrawer titulo={"DashBoard"} />

      <PageContainer titulo="DashBoard" sair={true} wd="99%" hg="88vh">
        <Form>
          <h1>*** FormContainer - DashBoard ***</h1>
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
