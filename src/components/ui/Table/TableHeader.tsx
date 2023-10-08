import { FC } from "react";
import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow.svg";
import styles from "./Table.module.scss";
import classNames from "classnames";
import { SortedType } from "@/types/types";

interface TableHeaderProps {
  sort: { [key: string]: SortedType };
  changeSorted: (field: "address" | "date") => void;
}

const TableHeader: FC<TableHeaderProps> = ({ sort, changeSorted }) => {
  return (
    <thead>
      <tr>
        <th>№</th>
        <th>Имя клиента</th>
        <th>
          Адрес{" "}
          <ArrowIcon
            onClick={changeSorted.bind(null, "address")}
            className={classNames(styles.arrow, {
              [styles.rotate]: sort.address === "desc",
            })}
          />
        </th>
        <th>
          Дата заказа{" "}
          <ArrowIcon
            onClick={changeSorted.bind(null, "date")}
            className={classNames(styles.arrow, {
              [styles.rotate]: sort.date === "desc",
            })}
          />
        </th>
        <th>Статус</th>
        <th>Комментарий</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
