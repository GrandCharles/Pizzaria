import { ReactNode, ButtonHTMLAttributes, useRef, useState } from "react";
import { ImExit } from "react-icons/im";
import Link from "next/link";

//import styles from "./styles.module.scss";
import { Container, TitleBar, FormContainer } from "./styles";

type PageContainerProps = {
  titulo: string;
  sair: boolean;
  wd?: string;
  hg?: string;
  ml?: string;
  children: ReactNode;
};
export function PageContainer({
  titulo,
  sair,
  wd,
  hg,
  children,
}: PageContainerProps) {
  return (
    <>
      <Container>
        <FormContainer wd={wd} hg={hg}>
          <TitleBar>
            <h1>{titulo}</h1>

            {sair ? (
              <Link href="/" passHref>
                <button type="button" title="Sair">
                  <ImExit size={20} />
                </button>
              </Link>
            ) : (
              <Link href="/dashboard" passHref>
                <button type="button" title="Voltar ao DashBoard">
                  <ImExit size={20} />
                </button>
              </Link>
            )}
          </TitleBar>
          {children}
        </FormContainer>
      </Container>
    </>
  );
}
