import { useState } from "react";
import styles from "./CustomerFormItem.module.css";

import Dropdown, { OptionItem } from "@shared/ui/Dropdown/Dropdown";
import { TCustomerEvents } from "@api/services/getCustomerEvents";
import Button from "@shared/ui/Button/Button";
import AttributeItem from "@components/AttributeItem/AttributeItem";

interface CustomerFormItemProps {
  number: number;
  eventsData: TCustomerEvents;
  onRemoveEvent: () => void;
  index: number;
  allowRemoving: boolean;
}

interface IAttributeItem {
  key: string;
}

const CustomerFormItem = ({
  number,
  eventsData,
  onRemoveEvent,
  index,
  allowRemoving = false,
}: CustomerFormItemProps) => {
  const [eventName, setEventName] = useState<string>("");

  const [attributes, setAttributes] = useState<Array<IAttributeItem>>([]);

  const handleAddAttribute = () => {
    setAttributes((prev) => [
      ...prev,
      {
        key: `Step_${number}-${attributes.length + 1}`,
      },
    ]);
  };

  const handleRemoveAttribute = (key: string) => {
    const newAttribute = attributes.filter((item) => item.key !== key);
    setAttributes(newAttribute);
  };

  const handleSelect = (value: OptionItem) => {
    setEventName(value.value);

    if (eventName) {
      setAttributes([]);
    }
  };
  return (
    <div className={styles["customer-form-item"]}>
      <div className={styles["form-top"]}>
        <span>{`${index + 1}. Step: ${
          eventName ? eventName : "Unnamed step"
        }`}</span>

        <div className={styles["event-actions"]}>
          {allowRemoving && (
            <Button variant="unstyled" className={styles["remove-button"]}>
              <img
                className={styles["remove-icon"]}
                src="/assets/trash-bin-trash-svgrepo-com.svg"
                alt="remove"
                onClick={onRemoveEvent}
              />
            </Button>
          )}

          <Button variant="unstyled" className={styles["copy-button"]}>
            <img
              className={styles["copy-icon"]}
              src="/assets/copy-svgrepo-com.svg"
              alt="remove"
            />
          </Button>
        </div>
      </div>

      <div className={styles["form-container"]}>
        <div className={styles["form-column"]}>
          <Dropdown
            className={styles.dropdown}
            options={eventsData.map((item) => ({
              value: item.type,
              label: item.type,
            }))}
            placeholderSelect="Select an event"
            placeholderFilter="Filter events"
            onSelect={handleSelect}
            name={`Step_${number}`}
            openImmediately={number > 1}
          />
        </div>
        <div className={`${styles["form-column"]} ${styles["attributes"]}`}>
          {eventName &&
            (attributes.length ? (
              <div className={styles["attributes"]}>
                {attributes.map((item, index) => (
                  <div
                    className={styles["attribute-line"]}
                    key={`${number}-${index}-attribute`}
                  >
                    <AttributeItem
                      attributeKey={item.key}
                      eventName={eventName}
                      properties={
                        eventsData.find((item) => item.type === eventName)
                          ?.properties || []
                      }
                    />
                    <Button
                      variant="unstyled"
                      className={styles["remove-button"]}
                      onClick={() => handleRemoveAttribute(item.key)}
                    >
                      <img
                        className={styles["remove-icon"]}
                        src="/assets/cross-svgrepo-com.svg"
                        alt="remove"
                      />
                    </Button>
                  </div>
                ))}

                <Button
                  variant="unstyled"
                  className={styles["refine-button"]}
                  onClick={handleAddAttribute}
                >
                  Refine more
                </Button>
              </div>
            ) : (
              <Button
                variant="unstyled"
                className={styles["add-button"]}
                onClick={handleAddAttribute}
              >
                + Add an event attribute
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerFormItem;
