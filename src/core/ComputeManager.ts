import axios from "axios";

export default class ComputeManager {
  private static $_instance = null;
  private constructor() {}
  public static instance() {
    if (ComputeManager.$_instance == null) {
      ComputeManager.$_instance = new ComputeManager();
    }
    return ComputeManager.$_instance;
  }

  async fetch(
    filtertype: string,
    filterby: string,
    page: number = 0,
    page_size: number = 15,
    sort_by: string | null,
    sort_type: string | null
  ) {
    function buildPage(listArray) {
      const trimStart = page * page_size;
      const trimEnd = trimStart + page_size;
      return listArray.slice(trimStart, trimEnd);
    }
    function sortUtil(listArray, field, reverse) {
      const fn = (v) => {
        if (isNaN(v)) {
          return v.toUpperCase();
        } else {
          return Number(v);
        }
      };
      if (reverse) {
        return listArray.sort((a, b) => {
          if (fn(a[field]) < fn(b[field])) return -1;
          if (fn(a[field]) > fn(b[field])) return 1;
          return 0;
        });
      } else {
        return listArray.sort((a, b) => {
          if (fn(a[field]) < fn(b[field])) return 1;
          if (fn(a[field]) > fn(b[field])) return -1;
          return 0;
        });
      }
    }

    try {
      let listOfData = [];
      let tem;
      switch (filtertype) {
        case "applications":
          tem = await axios.get(
            `https://engineering-task.elancoapps.com/api/applications/${filterby}`
          );
          break;
        case "resources":
          tem = await axios.get(
            `https://engineering-task.elancoapps.com/api/resources/${filterby}`
          );
          break;
        default:
          tem = await axios.get(
            "https://engineering-task.elancoapps.com/api/raw"
          );
      }
      listOfData = tem.data;
      const is_reverse = sort_type == "desc" ? false : true;
      if (sort_by && sort_type) {
        listOfData = sortUtil(listOfData, sort_by,  is_reverse);
      }

      const row = buildPage(listOfData);

      const paginatedData = {
        page: page,
        page_size: page_size,
        count: listOfData.length,
        row: row,
      };

      return paginatedData;
    } catch (error) {
      throw error;
    }
  }

  async getResources() {
    try {
      const tem = await axios.get(
        "https://engineering-task.elancoapps.com/api/resources"
      );
      return tem.data;
    } catch (error) {
      throw error;
    }
  }

  async getApplications() {
    try {
      const tem = await axios.get(
        "https://engineering-task.elancoapps.com/api/applications"
      );
      return tem.data;
    } catch (error) {
      throw error;
    }
  }
}
