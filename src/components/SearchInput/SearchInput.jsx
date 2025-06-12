import { useId } from "react";
import cls from "./SearchInput.module.css";
import { SearchIcon } from "../icons";

export const SearchInput = ({ value, onChange }) => {
  const inputId = useId();
  return (
    <div className={cls.inputContainer}>
      <label htmlFor={inputId}>
        <SearchIcon className={cls.searchIcon}/>
      </label>
      <input id={inputId} type="text" value={value} onChange={onChange} className={cls.input} placeholder="search..." />
    </div>
  );
};
