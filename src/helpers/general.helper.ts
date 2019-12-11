import _ from 'lodash';
import { Page, Subpage } from '@/stores/pages/pages.types';
import { PAGE_INITIAL } from '@/stores/pages/constants';

export class GeneralHelper {
  /** transform allowed
   * @param role: String
   * @param pageOriginal: Object
   *  {
        "id": "pwhjj",
        "name": "Prohlizeni WHJ Journalu",
        "allowed": {
            "read": ["manager", "worker", "coworker"],
            "write": ["manager"]
        }
      }
    * @return Object
        {
            "id": "pwhjj",
            "name": "Prohlizeni WHJ Journalu",
            "allowed": {
                "read": true,
                "write": true
            }
        }
    */
  processRole(role: String, pageOriginal: any): Object {
    const res = {
      id: pageOriginal.id,
      name: pageOriginal.name,
      allowed: {
        read: false,
        write: false
      },
      subpages: pageOriginal.subpages,
      currentSubpage: pageOriginal.currentSubpage
    };
    if (pageOriginal && pageOriginal.allowed && pageOriginal.allowed.read) {
      if (pageOriginal.allowed.read.indexOf(role) > -1) {
        res.allowed.read = true;
      }
    }
    if (pageOriginal && pageOriginal.allowed && pageOriginal.allowed.write) {
      if (pageOriginal.allowed.write.indexOf(role) > -1) {
        res.allowed.write = true;
      }
    }
    return res;
  }

  getPermissions(currentPage: any): Object {
    const { read, write } = currentPage.allowed;
    return { read, write };
  }

  /**
  * It returns deep object look ups
  * @param {object} obj to start with
  * @param {string[]} fieldList containing the list of the look ups
  * @param {any=} otherwise default value to return
  * @return {any} returns the desired object/value
  */
  pickDeep(obj: object, fieldList: string[], otherwise: any): any {
    return fieldList.reduce((res: any, field) => res && res[field], obj) || otherwise;
  }

  getCurrentPageBasedId(userPages: Page[], id: string): Page {
    let res = PAGE_INITIAL;
    for (let i = 0; i < userPages.length; i++) {
      if (userPages[i] && userPages[i].id && userPages[i].id === id) {
        res = userPages[i];
      }
    }
    return res;
  }

  getCurrentSubpageBasedId(currentPageSubpages: Subpage[], id: string): Page {
    let res: any = {
      id: '',
      name: '',
      content: {}
    };
    for (let i = 0; i < currentPageSubpages.length; i++) {
      if (currentPageSubpages[i] && currentPageSubpages[i].id && currentPageSubpages[i].id === id) {
        res = currentPageSubpages[i];
      }
    }
    return res;
  }

  getItemsObjBasedArrayIds(arrIds: any, arrItemsObj: any[]): any[] {
    debugger;
    let res: any = [];
    for (let i = 0; i < arrIds.length; i++) {
      const ar = arrItemsObj.filter((item: any) => item._id === arrIds[i]);
      res = [...res, ...ar];
    }
    return res;
  }

  renderedOriginal(items: any[]) {
    debugger;
    const res: any = [];
    items.forEach((item) => {
      res.push({ rendered: this.stringSpace(_.clone(item)), original: this.stringSpace(_.clone(item)) });
    });
    return res;
  }

  stringSpace(itemObj: any): any {
    Object.keys(itemObj).forEach((key, index) => {
      itemObj[key] = String(itemObj[key]).trim();
    });
    return itemObj;
  }
}
