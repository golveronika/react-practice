import { useState } from "react";
import styles from "./AttributeItem.module.css";

import Dropdown, { OptionItem } from "@shared/ui/Dropdown/Dropdown";
import Button from "@shared/ui/Button/Button";
import { IEventProperties } from "@api/services/getCustomerEvents";

interface AttributeItemProps {
  attributeKey: string;
  properties: Array<IEventProperties>;
  eventName: string;
}

const AttributeItem = ({ properties, attributeKey, eventName }: AttributeItemProps) => {
  const [attribute, setAttribute] = useState("");
  const [filterValue, setFilterValue] = useState<OptionItem | null>(null);

  const handleSelect = (value: OptionItem) => {
    setAttribute(value.value);
  };

  const handleSelectFilter = (value: OptionItem) => {
    console.log(value);
    setFilterValue(value);
  };

  return (
    <div className={styles.attributes}>
      <Dropdown
        className={styles.dropdown}
        options={properties.map((item) => ({
          value: item.property,
          label: item.property,
        }))}
        placeholderSelect="Select an attribute"
        linkedAttribute={eventName}
        onSelect={handleSelect}
        name={attributeKey}
        openImmediately={true}
      />
      {attribute && (
        <Dropdown
          className={styles.dropdown}
          options={[
            {
              value: "equals",
              label: "equals",
              filterValue: "string",
            },
            {
              value: "does_not_equal",
              label: "does not equal",
              filterValue: "string",
            },
            {
              value: "contains",
              label: "contains",
              filterValue: "string",
            },
            {
              value: "does_not_contain",
              label: "does not contain",
              filterValue: "string",
            },
            {
              value: "equal_to",
              label: "equal to",
              filterValue: "number",
            },
            {
              value: "in_between",
              label: "in between",
              filterValue: "number",
            },
            {
              value: "less_than",
              label: "less than",
              filterValue: "number",
            },
            {
              value: "greater_than",
              label: "greater than",
              filterValue: "number",
            },
          ]}
          tabs={["string", "number"]}
          placeholderSelect="Select an attribute"
          onSelect={handleSelectFilter}
          name={`${attributeKey}-operator`}
        />
      )}

      {filterValue ? (
        filterValue.value !== "in_between" ? (
          <input
            className={styles.input}
            type={filterValue.filterValue === "string" ? "text" : "number"}
            defaultValue={filterValue.filterValue === "string" ? '' : 0}
            name={`${attributeKey}-operator-value-1`}
          />
        ) : (
          <>
            <input
              className={styles.input}
              type={filterValue.filterValue === "string" ? "text" : "number"}
              defaultValue={0}
              name={`${attributeKey}-operator-value-1`}
            />
            and
            <input
              className={styles.input}
              type={filterValue.filterValue === "string" ? "text" : "number"}
              defaultValue={0}
              name={`${attributeKey}-operator-value-2`}
            />
          </>
        )
      ) : null}

    </div>
  );
};

export default AttributeItem;
