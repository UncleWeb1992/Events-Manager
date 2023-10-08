import { FC, FormEvent, useState } from "react";
import styles from "./Orders.module.scss";
import Layout from "../../components/layout";
import { TextField } from "../../components/common/TextFIeld";
import { validation } from "../../utils/validation";
import { Button } from "../../components/common/Button";
import { IEvents } from "@/types/types";
import { randomId } from "../../utils/randomId";
import { getDate } from "../../utils/getDate";
import { Events } from "../../api/events";
import { useAppSelector } from "../../hooks/redux";

const initialState = {
  name: "",
  address: "",
  comment: "",
};

interface OrdersProps {
  classess?: string;
}

const AddOrder: FC<OrdersProps> = () => {
  const { name } = useAppSelector((state) => state.user.user);
  const [state, setState] = useState({ name, address: "", comment: "" });
  const [error, setError] = useState(initialState);

  const disabled =
    !state.name.length ||
    !state.address.length ||
    !!Object.values(error).find((val) => !!val);

  const handleChange = (text: string, fieldName?: string) => {
    if (fieldName) {
      setError((prev) => ({ ...prev, name: validation(text, "name") }));
      setState((prev) => ({ ...prev, [fieldName]: text }));
    }
  };

  const onCreateEvent = async () => {
    try {
      const newEvent: IEvents = {
        id: randomId(),
        name: state.name,
        address: state.address,
        date: getDate(),
        status: "Новый",
        comment: state.comment,
      };

      await Events.CreateEvent(newEvent);
    } catch (error) {
      throw new Error("Error create event");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    onCreateEvent();
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className={styles.root}>
        <h2 className={styles.title}>Добавить заказ</h2>
        <TextField
          value={state.name}
          placeholder="Введите ваше имя"
          onChange={handleChange}
          fieldName="name"
          required
        />
        <TextField
          value={state.address}
          placeholder="Введите ваш адрес"
          onChange={handleChange}
          required
          fieldName="address"
        />
        <TextField
          value={state.comment}
          placeholder="Комментарий"
          onChange={handleChange}
          required
          fieldName="comment"
        />

        <Button disabled={disabled} text="Добавить заказ" />
      </form>
    </Layout>
  );
};

export default AddOrder;
