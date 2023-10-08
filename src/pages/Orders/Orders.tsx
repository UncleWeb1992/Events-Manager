import { FC } from "react";
import styles from "./Orders.module.scss";
import Layout from "../../components/layout";
import { Table } from "../../components/ui/Table";

interface OrdersProps {
  classess?: string;
}

const Orders: FC<OrdersProps> = () => {
  return (
    <Layout>
      <div className={styles.root}>
        <Table />
      </div>
    </Layout>
  );
};

export default Orders;
