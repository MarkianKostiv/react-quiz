import { FormValues } from "../interfaces/FormValues";

export const getDataLS = (dataParam: string): Promise<FormValues[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data: string | null = localStorage.getItem(dataParam);
      if (data) {
        try {
          const parsedData = JSON.parse(data) as FormValues[];
          resolve(parsedData);
        } catch (error) {
          console.error("Error parsing local storage data:", error);
          reject("Error parsing data");
        }
      } else {
        console.error("Item not found");
        reject("Item not found");
      }
    }, 1000);
  });
};
