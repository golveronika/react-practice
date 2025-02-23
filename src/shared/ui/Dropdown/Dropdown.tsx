import React, { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.css";

export interface OptionItem {
  label: string;
  value: string;
  filterValue?: string;
}

interface DropdownProps {
  options: OptionItem[]; // Список опций
  placeholderSelect?: string; // Текст по умолчанию
  placeholderFilter?: string; // Текст по умолчанию
  onSelect?: (value: OptionItem) => void; // Callback при выборе
  className?: string;
  tabs?: string[]; // Вкладки для фильтрации
  name?: string;
  linkedAttribute?: string;
  openImmediately?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholderSelect = "Select...",
  placeholderFilter = "Filter...",
  className = "",
  onSelect,
  tabs,
  name = '',
  linkedAttribute,
  openImmediately = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(
    tabs ? tabs[0] : null
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(
    (option) =>
      (!tabs && option.label.toLowerCase().includes(search.toLowerCase())) ||
      (tabs?.length && option?.filterValue === activeTab)
  );

  const handleSelect = (value: OptionItem) => {
    setSelected(value.value);
    setIsOpen(false);
    if (onSelect) onSelect(value);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (openImmediately) {
      setIsOpen(true)
    } 
  }, []);

  return (
    <div className={`${styles.container} ${className}`} ref={dropdownRef}>
      <input type="hidden" name={name} value={selected || ''}/>
      <button
        className={`${styles.button} ${selected ? styles.selected : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        name={name}
      >
        {selected || placeholderSelect}
        <span
          className={styles.icon}
          style={{ backgroundImage: `url(/assets/chevron.svg)` }}
        />
      </button>

      {isOpen && (
        <div
          className={`${styles.dropdown} ${
            tabs?.length ? styles["with-tabs"] : ""
          }`}
        >
          {tabs?.length ? (
            <div className={styles.tabs}>
              {tabs?.map((tab) => (
                <button
                  key={tab}
                  className={`${styles.tab} ${
                    tab === activeTab ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          ) : (
            <div className={styles["search-input"]}>
              {linkedAttribute && (<span className={styles['linked-attribute']}>{linkedAttribute}</span>)}
            <input
              type="text"
              placeholder={placeholderFilter}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.search}
            />
            </div>

          )}

          <ul className={styles.list}>
            {filteredOptions.map((option) => (
              <li
                key={option.value}
                className={styles.item}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
