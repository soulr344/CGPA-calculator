"use client";

import c from "classnames";
import CaretSVG from "./icons/caret";
import styles from "./CustomSelect.module.scss";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type CustomSelectOption = {
  name: string;
  value: number;
};

type CustomSelectProps = {
  options: CustomSelectOption[];
  title: string;
  name: string;
  onChange?: (value: number) => any;
  disabled?: boolean;
  defaultValue?: any;
};

export default function CustomSelect({
  options,
  title,
  name,
  onChange,
  disabled,
  defaultValue,
}: CustomSelectProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectWrapperRef = useRef<HTMLDivElement>(null);
  const optionsWrapperRef = useRef<HTMLUListElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  const backdropRef = useRef<HTMLDivElement>(null);

  const [displayOptions, setDisplayOptions] = useState(options);

  const [isChanged, setIsChanged] = useState(false);
  const [displayName, setDisplayName] = useState(title);

  useEffect(() => {
    setDisplayOptions(options);
  }, [options]);

  useEffect(() => {
    setDisplayName(title);
  }, [title]);

  const changeOptionsOrientation = useCallback(() => {
    inputWrapperRef.current?.classList.toggle(
      styles.up,
      (inputWrapperRef.current?.offsetHeight ?? 0) +
        (selectWrapperRef.current?.getBoundingClientRect().height ?? 0) +
        parseFloat(getComputedStyle(document.documentElement).fontSize) +
        (selectWrapperRef.current?.getBoundingClientRect().y ?? 0) >
        window.innerHeight
    );

    inputWrapperRef.current?.classList.toggle(
      styles.right,
      (inputWrapperRef.current?.offsetWidth ?? 0) +
        parseFloat(getComputedStyle(document.documentElement).fontSize) +
        (selectWrapperRef.current?.getBoundingClientRect().width ?? 0) +
        (selectWrapperRef.current?.getBoundingClientRect().x ?? 0) >
        window.innerWidth
    );
  }, []);

  const handleSelectClick = useCallback(() => {
    selectWrapperRef.current?.classList.toggle(styles.active);
    backdropRef.current?.classList.toggle(styles.active);

    changeOptionsOrientation();
  }, [changeOptionsOrientation]);

  const closeSelect = useCallback(() => {
    selectWrapperRef.current?.classList.remove(styles.active);
    backdropRef.current?.classList.remove(styles.active);
  }, []);

  const resetSelectedOption = useCallback(() => {
    optionsWrapperRef.current
      ?.querySelector(`.${styles.selected}`)
      ?.classList?.remove?.(styles.selected);
  }, []);

  const handleOptionClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      const target = e.currentTarget;
      const value = target.dataset.value ?? "";
      const title = options[parseInt(value) ?? 0].name;

      if (inputRef.current) {
        inputRef.current.value = value;
        setIsChanged(true);
        onChange?.(parseInt(value));
      }

      setDisplayName(title);
      closeSelect();

      resetSelectedOption();

      target.classList.add(styles.selected);
    },
    [closeSelect, options, onChange, resetSelectedOption]
  );

  const defaultValueIndex = useMemo(
    () =>
      options.filter(
        (option) => option.name.toString() === defaultValue?.toString()
      )?.[0]?.value,
    [defaultValue, options]
  );

  return (
    <div
      className={c(styles["select-wrapper"], styles["no-input"])}
      ref={selectWrapperRef}
    >
      <input
        type="hidden"
        name={name}
        ref={inputRef}
        defaultValue={
          defaultValueIndex !== undefined && !isChanged
            ? defaultValueIndex.toString()
            : inputRef.current?.value
        }
      />
      <button
        type="button"
        id={name + "-btn"}
        className={styles.button}
        onClick={handleSelectClick}
      >
        <span>{defaultValue && !isChanged ? defaultValue : displayName}</span>
        <CaretSVG className={styles.caret} />
      </button>
      <div ref={inputWrapperRef} className={styles["options-wrapper"]}>
        <ul ref={optionsWrapperRef} className={styles.options}>
          {displayOptions.map((option, index) => (
            <li
              onClick={handleOptionClick}
              key={index}
              data-value={option.value}
              className={c({
                [styles.selected]:
                  inputRef.current?.value === option.value.toString() ||
                  (defaultValue?.toString() === option.name.toString() &&
                    !isChanged),
                [styles.disabled]: disabled,
              })}
            >
              {option.name}
            </li>
          ))}
        </ul>
      </div>
      <div
        onClick={closeSelect}
        ref={backdropRef}
        className={styles.backdrop}
      ></div>
    </div>
  );
}
