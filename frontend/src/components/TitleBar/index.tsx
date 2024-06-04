import styles from "./styles.module.scss";
import { ImExit } from "react-icons/im";
import Link from "next/link";

type TitleBarProps = {
  titulo: string;
  botao: boolean
};
export default function TitleBar({ titulo, botao }: TitleBarProps) {
  return (
    <>
      <div className={styles.titleBar}>
        <h1>{titulo}</h1>
        {botao ? (
          <Link href="/dashboard" passHref>
            <button type="button" title="Sair">
              <ImExit size={20} />
            </button>
          </Link>
        ):('')}
      </div>
    </>
  );
}





