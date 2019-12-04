import { Vue } from 'vue-property-decorator';

export class HttpMockService {
  getMockDataAllowedCredentials() {
    return require('../mockData/allowedCredentials.json');
  }

  getMockDataInitialPages() {
    return require('../mockData/initialPages.json');
  }

  getMockDataJournal() {
    return require('../mockData/journalMock.json');
  }

  getMockDataAllowedCredentialsDelay = () => {
    const mockData = this.getMockDataAllowedCredentials();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData);
      }, 2000);
    });
  }

  // after transfer node server data to ui
  getMockAllowedCredentials(credentials: { name: string, password: string }) {
    debugger;
    let res = {};
    const { name, password } = credentials;
    const users = this.getMockDataAllowedCredentials();
    const up = users.filter((item: any) => item.name === name && item.password === password);
    if (up && up.length > 0) {
      res = {
        status: 202,
        statusCase: 'ok',
        msg: 'authentication done',
        id: up[0].id,
        name: up[0].name,
        email: up[0].email,
        role: up[0].role
      };
    } else if (up && up.length === 0) {
      res = {
        status: 202,
        statusCase: 'failed',
        msg: 'authentication failed, wrong credentials'
      };
    }
    return res;
  }

  getMockAllowedCredentialsDelay(credentials: any) {
    debugger;
    const mockDataResponse = this.getMockAllowedCredentials(credentials);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDataResponse);
      }, 500);
    });
  }

  getMockDataInitialPagesDelay = () => {
    const mockData = this.getMockDataInitialPages();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData);
      }, 500);
    });
  }

  getMockJournalDelay = () => {
    const mockData = this.getMockDataJournal();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData);
      }, 500);
    });
  }
}
export class HttpService {
  //   serverURL = 'https://domain.com/api/orders';
  protocol = 'http';

  // hostname = 'localhost';
  // hostname = window.location.hostname.replace('vuejs-', 'vuejsback-');
  hostname = window.location.hostname;

  port = '3030';

  formedURL = `${this.protocol}://${this.hostname}:${this.port}/api/`;

  /** GET request
   * @param endpoint :string, endpoint name
   * @returns Promise<any>
  */
  public get(endpoint: string, params : object): Promise<any> {
    /* eslint-disable */
    debugger;
    console.log('protocol ',this.protocol, ' hostname ', this.hostname, ' formedURL ', this.formedURL);
    return Vue.axios.get(`${this.formedURL}${endpoint}`, { params });
  }

  /** GET request
   * @param endpoint :string, endpoint name
   * @returns Promise<any>
  */
  public getDirect(url: string): Promise<any> {
    /* eslint-disable */
    debugger;
    return Vue.axios.get(url);
  }

  public putDirect(url: string): Promise<any> {
    /* eslint-disable */
    debugger;
    const obj = {'kmat': '11111-jp', 'hmotnost': 66};
    // const stringObj = JSON.stringify(obj);
    // const headers: any = {'Content-Type': 'application/x-www-form-urlencoded'};
    // return Vue.axios.put(url, stringObj, headers);
    return Vue.axios.put(`${url}?kmat=11111`, obj);
  }

  /** POST request
   * @param url :string, endpoint name
   * @param body : post body content
   * @returns Promise<any>
  */
  public post(endpoint: string, body: any): Promise<any> {
    console.log('protocol ',this.protocol, ' hostname ', this.hostname, ' formedURL ', this.formedURL);
    return Vue.axios.post(`${this.formedURL}${endpoint}`, body);
  }
}
