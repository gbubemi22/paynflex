import firebaseAdmin from "firebase-admin";
export const firebaseServiceAccount = {
    type: "service_account",
    project_id: "testapp-ca202",
    private_key_id: "84cb94f9a42ad0ccb9c2b143d033d6adce12ba95",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDmAHz3ed6cN8RA\nccz8fHkxyTns0v6Qxr1rwYnsG8PVs3VkERS2gcWxf2XSjQjEZVO+Vqem1oADAh6r\nd0CuuyUqcTq231hdhbQlbU2yD0sDRAMGhexoDH2sEOMvIH1lCbsk1AmvB0OO3E4W\noIc5EVPRJ1mobHS0i4jMe1tlnIqEgvSc02MuIALTfGrVA/K2rh0UjHWrdlQk9bFC\nC/5fZIqtANV2AVuOtQ1S+a6uZHR/KKvBzP5mczdgcsVJlUCaiHaqvHntFUssGbcu\n9SaVPIG3ffA83TKOkPD3+hpaFEcBQ6Q66vS07qZ/a1ajvkm5lyOTnGRlm+EmPWN+\npjkzviIbAgMBAAECggEAY7MVeI8e5Je13fuWkGIChQbFsbdaevZzWLjp6Ou2LbXf\nbpOK53wEbqcbQ7Q39y43KVxVyxfTILq0Ab6tTrC38RhpC6lwHAYfq1OgqM1BRnae\nWx8FdarodQRS/nQ2duxLb7DsS6855TzxKpTGWQH+U70be8sbocGUeJMGcNr1Hm/1\nPE4F5yp5ajyxj2YnzBRuFczoCzTXBja5uwkSevSr6mL2VEvtUpptyo1/N91nlibV\nijxZmwBX6FrXGuDTV1G/5f16EAGezP+2S5vHtDhSeEpKm/VYxaLL/uP2ZCI2RQYQ\n7DUhpfae5qu8HZTZSA2MWf98fJ8wi5MXQp1NlGCBDQKBgQD8++vjUVy8G5dFZFSd\n9D2Xd4x/o7+j5er0EU9kMAHX4ev4OdUgX67mF/qC9KbRPbjBfDNx7gBRP/eoiW0v\nHlx9eRtwCEbEYG0YNWO6VljCntU2uLM3QfMkREWAWzVa3tMGvtPEn6APHAPsHE5i\nwFp8i26A6sb1ClhCY1ZE5407lQKBgQDovm2CrBWagkIi9zkTz/WGJbrN+A/YVTrx\nAgzt/aHekMm2N8lTXGhZ7b55waNdjnjDOGvwYra8y1trbCzutpr0qLKYy+gZHMf7\nPnyJP7IntDmNVe+buYOOqVDTLlU07Sg0ZDbkJLbLtvzk+jl4XmMDyk3UYDFGJNQf\nL3c5YuT67wKBgErFgqC7KXeHiBxAXSoaSCH+eY44LaoZiGn+u8JW1hSid4X0QePB\npAXpzGbsPGnXnkXBmcrwlzNsfpxXkee9R4TmSI/CQnhEL7pZ/VHTt4Q+QbJcwMty\nOJTdgNVBH/Htrd1uhVS2AS62Dwq4Cwrw402wQEbmHUvLdO6aQaM39OxJAoGBAKHa\nI3+2ugNLyEBWmhu8B6r1O/YWJrazdpy5Z1Jtig6js5KDMv9EiNDY8xfq3/ekpzhj\nWTS/AQNDi9ylSo3q8NFpK2H0kwA7spp2ttYfNH5F56vw8gLiPKmN90YUt25p6gad\nFksLeQ8rvqxhkmuxf7vYCM3C4yE7ZUQWlxuSOViDAoGAcqKW36TEGi5yi7R6E0Dn\ne1nActGE09pgnFuQe5y5+bFCiRMZ1qLJkIxPC3pBcMtp0HZA4HmxAwfVOKPUlg9V\nbfk+CLMNx7d8sp7xfUqoQhPPag/2P+njDQWrDsEkxupl6uQzo4XUITzJlcbidINE\n+lm+4BEsTMR8k5bap9h+nPQ=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-fbsvc@testapp-ca202.iam.gserviceaccount.com",
    client_id: "105304113668861185674",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40testapp-ca202.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
};
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
});
export default firebaseAdmin;
