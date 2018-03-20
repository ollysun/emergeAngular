export class config {
  public static url = {
    ocs: 'http://lx-dev-emea-emerge-ws-tc-01:8080/' +
    'emerge-ocs-provision/v1/provision/',
    // middleware: 'http://localhost:5555/api/',
    middleware: 'http://lx-dev-emea-emerge-ui-nx-01:5555/api/',
    bssSc: '/api/bss/selfcare/',
    bssBo: '/api/bss/backoffice/',
    // bssPo: '/api/bss/provision/'
    bssPo: 'http://lx-dev-emea-emerge-crmjob-jb-01:8081/' +
    'emerge-bss/v1/provision/'
    //kolade: 'http://192.168.0.16:9080/bss/v1/provision/'
    //folarin: 'http://192.168.0.72:8080/bss/v1/provision/'
    //akin: 'http://192.168.0.36:9080/bss/v1/provision/'
  }

  public static headers(): Object {
    return {
      //'x-http-token': '@ES$RCE%%$F%X$F%$%'
    };
  }

  public static getToken(): string {
    return window.localStorage.getItem('x-http-token') || 'NULL';
  }
}
