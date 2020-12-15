var domain = 'test.euxdat.eu';
var climaticPatternsURL = 'http://my.meteoblue.com/visimage/';
var climaticPatternsAPI_key = '8vh83gfhu34g';
var baseAPIurl = 'http://pyapi.meteoblue.com/';
var API_key = '1a98a8ef2598-EU-SG-testing';
var euxdatURL = 'https://sc5-backend.'+domain;
var dbHost = 'https://geodb-devel.'+domain+'/xalkidiki/';
var keyCloakConf = {
  authRealm: "euxdat",
  authUrl: 'https://'+domain+'/auth',
  authClientId: "frontend",
  logoutRedirectUri: 'https://'+domain,
};
const CONST = {
  climaticPatternsURL: climaticPatternsURL,    
  climaticPatternsAPI_key: climaticPatternsAPI_key,
  baseAPIurl: baseAPIurl,
  API_key: API_key,    
  keyCloakConf: keyCloakConf,
  euxdatURL: euxdatURL,
  dbHost: dbHost,  
};

export default CONST