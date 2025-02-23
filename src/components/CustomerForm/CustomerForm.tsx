import { FormEvent, useState } from "react";
import styles from "./CustomerForm.module.css";

import useCustomerEvents from "@api/query/useCustomerEvents";

import CustomerFormItem from "@components/CustomerFormItem/CustomerFormItem";
import Button from "@shared/ui/Button/Button";

import { transformData } from "@shared/utils/transformData";

const CustomerForm = () => {
  const { data, isLoading, isError } = useCustomerEvents();

  const [formState, setFormState] = useState([1]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const submitter = (e.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;

    if (submitter?.id === "submit") {
      const formData = new FormData(e.target as HTMLFormElement);
      const formProps = Object.fromEntries(formData) as { [k: string]: string };
      const outputData = transformData(formProps);
      console.log("outputData", outputData);
    }
  };

  const handleAddStep = () => {
    const nextItem = formState?.length
      ? formState[formState.length - 1] + 1
      : 0;
    setFormState((prev) => [...prev, nextItem]);
  };

  const handleRemoveStep = (item: number) => {
    console.log("item", item);
    console.log("formState", formState);
    setFormState((prevState) => prevState.filter((el) => el !== item));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles["customer-form"]}>
        {isLoading ? (
          <div className={styles.overlay}>
            <span className="spinner"></span>
            <span>Loading data</span>
          </div>
        ) : isError || !data ? (
          <span className={styles.error}>Error of fetching data</span>
        ) : (
          formState.map((item, index) => (
            <CustomerFormItem
              eventsData={data}
              number={item}
              index={index}
              key={`form-item-${item}`}
              allowRemoving={
                (index === 0 && formState.length > 1) || index !== 0
              }
              onRemoveEvent={() => handleRemoveStep(item)}
            />
          ))
        )}

        <div className={styles["form-bottom"]}>
          <Button
            onClick={handleAddStep}
            className={styles["add-step-button"]}
            variant="unstyled"
          >
            + ADD FUNNEL STEP
          </Button>
        </div>
      </div>
      <Button id="submit">Apply filters</Button>
    </form>
  );
};

export default CustomerForm;
