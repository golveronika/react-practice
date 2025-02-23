import Button from "@shared/ui/Button/Button";
import styles from "./CustomerPage.module.css";
import CustomerForm from "@components/CustomerForm/CustomerForm"


const CustomerPage = () => {


  return (
    <div className={styles['customer-page']}>
      <div className={styles["customer-page-content"]}>
        <div className={styles["form-top-container"]}>
          <h1 className="h1">Customer Filter</h1>
          <Button
            variant="unstyled"
            className={styles.discard}
            onClick={() => {}}
          >
            Discard filters
          </Button>
        </div>


        <div className={styles['customer-form']}>
            <CustomerForm />
        </div>

    
      </div>
    </div>
  );
};

export default CustomerPage;
