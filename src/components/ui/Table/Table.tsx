import { FC, useCallback, useEffect, useState } from "react";
import styles from "./Table.module.scss";
import { IEvents, SortedType } from "../../../types/types";
import { Events } from "../../../api/events";
import { Modal } from "../../../components/common/Modal";
import { Button } from "../../../components/common/Button";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

interface TableProps {
  classess?: string;
}

const Table: FC<TableProps> = () => {
  const [data, setData] = useState<IEvents[]>([]);
  const [deletedEvent, setDeletedEvent] = useState<IEvents | null>(null);
  const [sort, setSort] = useState<{ [key: string]: SortedType }>({
    address: "asc",
    date: "asc",
  });

  const changeSorted = (field: "address" | "date") => {
    setSort((prev) => ({
      ...prev,
      [field]: prev[field] === "asc" ? "desc" : "asc",
    }));
  };

  const loadData = useCallback(async () => {
    try {
      const result = await Events.getEvents(sort);

      if (result) {
        setData(result);
      }
    } catch (error) {
      throw new Error("Error load data");
    }
  }, [sort]);

  const deletEvent = async () => {
    if (!deletedEvent) return;

    try {
      await Events.deleteEvent(deletedEvent.id);
      await loadData();
    } catch (error) {
      throw new Error("Error delete event");
    } finally {
      setDeletedEvent(null);
    }
  };

  const uodateEvent = async (event: IEvents) => {
    try {
      const newEvent: IEvents = {
        ...event,
        status: "Выполнен",
      };
      await Events.updateEvent(event.id, newEvent);
      await loadData();
    } catch (error) {
      throw new Error("Error update event");
    }
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <table className={styles.Table}>
        <TableHeader sort={sort} changeSorted={changeSorted} />
        <TableBody
          data={data}
          setDeletedEvent={setDeletedEvent}
          uodateEvent={uodateEvent}
        />
      </table>

      {deletedEvent && (
        <Modal>
          <div className={styles.modal}>
            <p style={{ marginBottom: 68 }}>
              Вы действительно хотите удалить заказ?
            </p>
            <div className={styles.buttons}>
              <Button text="Ок" onClick={deletEvent} />
              <Button
                text="Отмена"
                onClick={setDeletedEvent.bind(null, null)}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Table;
