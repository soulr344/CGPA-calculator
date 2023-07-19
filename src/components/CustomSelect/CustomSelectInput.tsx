"use client";

import c from "classnames";
import CaretSVG from "./icons/caret";
import styles from "./CustomSelect.module.scss";
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type CustomSelectOption = {
  name: string;
  value: number;
};

type CustomSelectProps = {
  placeholder: string;
  options: CustomSelectOption[];
  title: string;
  name: string;
  disabled?: boolean;
  defaultValue?: any;
  onChange?: (value: number) => any;
};

const debounceMs = 400;
let timeout: NodeJS.Timeout | null = null;

export default function CustomSelect({
  placeholder,
  options,
  title,
  name,
  disabled = false,
  defaultValue,
  onChange,
}: CustomSelectProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const selectWrapperRef = useRef<HTMLDivElement>(null);
  const optionsWrapperRef = useRef<HTMLUListElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  const backdropRef = useRef<HTMLDivElement>(null);

  const [isChanged, setIsChanged] = useState(false);

  const [displayOptions, setDisplayOptions] = useState(options);
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

    searchInputRef.current?.focus();
    changeOptionsOrientation();
  }, [changeOptionsOrientation]);

  const closeSelect = useCallback(() => {
    selectWrapperRef.current?.classList.remove(styles.active);
    backdropRef.current?.classList.remove(styles.active);
    searchInputRef.current?.blur();
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

      setIsChanged(true);
      setDisplayName(title);
      closeSelect();

      resetSelectedOption();

      target.classList.add(styles.selected);
    },
    [closeSelect, options, onChange, resetSelectedOption]
  );

  const handleSearch = useCallback(
    (target: HTMLInputElement) => {
      const value = target.value;
      const newOptions = [
        ...options.filter((option) => RegExp(value, "i").test(option.name)),
      ];
      setDisplayOptions(newOptions);
      changeOptionsOrientation();
    },
    [changeOptionsOrientation, options]
  );

  const handleSearchDebounce = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const target = e.currentTarget;
      if (timeout != null) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => handleSearch(target), debounceMs);
    },
    [handleSearch]
  );

  const defaultValueIndex = useMemo(
    () =>
      options.filter(
        (option) => option.name.toString() === defaultValue?.toString()
      )?.[0]?.value,
    [defaultValue, options]
  );

  return (
    <div className={styles["select-wrapper"]} ref={selectWrapperRef}>
      <input type="hidden" name={name} ref={inputRef} />
      <button
        type="button"
        id={name + "-btn"}
        className={styles.button}
        onClick={handleSelectClick}
        defaultValue={
          defaultValueIndex !== undefined && !isChanged
            ? defaultValueIndex.toString()
            : inputRef.current?.value
        }
      >
        <span>{defaultValue && !isChanged ? defaultValue : displayName}</span>
        <CaretSVG className={styles.caret} />
      </button>
      <div ref={inputWrapperRef} className={styles["options-wrapper"]}>
        <div className={styles["search-wrapper"]}>
          <i className="uil uil-search"></i>
          <input
            spellCheck={false}
            type="text"
            placeholder={placeholder}
            onInput={handleSearchDebounce}
            ref={searchInputRef}
          />
        </div>
        <ul ref={optionsWrapperRef} className={styles.options}>
          {displayOptions.map((option, index) => (
            <li
              tabIndex={0}
              role="button"
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
