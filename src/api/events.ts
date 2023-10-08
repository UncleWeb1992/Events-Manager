import { IEvents, SortedType } from "@/types/types";
import api from "./api";

export class Events {
  static getEvents = async (sort: {
    [key: string]: SortedType;
  }): Promise<IEvents[]> => {
    const viewsSorted = [] as string[];
    const orderSorted = [] as string[];

    Object.entries(sort).forEach(([key, val]) => {
      viewsSorted.push(key);
      orderSorted.push(val);
    });

    const paramsSort = `?_sort=${viewsSorted.join(
      ","
    )}&_order=${orderSorted.join(",")}`;

    const result = await api.get<IEvents[]>("events" + paramsSort);

    return result.data;
  };

  static deleteEvent = async (eventId: number) => {
    const result = await api.delete(`events/${eventId}`);

    return result.data;
  };

  static updateEvent = async (
    eventId: number,
    event: IEvents
  ): Promise<IEvents> => {
    const result = await api.put(`events/${eventId}`, event);
    return result.data;
  };

  static CreateEvent = async (event: IEvents): Promise<IEvents> => {
    const result = await api.post(`events`, event);
    return result.data;
  };
}
