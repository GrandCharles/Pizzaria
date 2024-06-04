import { useContext, FormEvent, useState } from "react";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { IconBaseProps } from "react-icons";
import { InputBorder } from "./styles";

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { MdSave } from "react-icons/md";

// Sobrescrever
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: React.ComponentType<IconBaseProps>;
  wd?: string;
  hg?: string;
  alg?: string;
  bd?: string;
}

export function Input({ icon: Icon, wd, hg, alg, bd, ...rest }: InputProps) {
  const [eyeIsClosed, setEyeIsClosed] = useState("password");

  const toggleShow = () => {
    alert("Clicou");
  };

  return (
    <>
      <InputBorder wd={wd} hg={hg} bd={bd}>
        <input {...rest} />

        {Icon && (
          <button onClick={() => toggleShow()}>
            <Icon size={18}></Icon>
          </button>
        )}
      </InputBorder>
    </>
  );
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
export function TextArea({ ...rest }: TextAreaProps) {
  return <textarea {...rest} />;
}
