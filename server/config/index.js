module.exports = {
  route: {
    bss: process.env.BSS_URL ||
      'http://lx-dev-emea-emerge-crmjob-jb-01:8081/emerge-bss/v1/provision',
    ocs: process.env.OCS_URL ||
      'http://lx-dev-emea-emerge-ws-tc-01:8080/emerge-ocs-provision/v1/provision'
  },
  isBackofficeClient: 1
};
