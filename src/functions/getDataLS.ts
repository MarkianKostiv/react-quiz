import { FormValues } from "../interfaces/FormValues";

export const getDataLS = (dataParam: string): FormValues[] => {
  const data: string | null = localStorage.getItem(dataParam);
  if (data) {
    return JSON.parse(data) as FormValues[];
  } else {
    console.error("Item not found");
  }
  return [];
};
