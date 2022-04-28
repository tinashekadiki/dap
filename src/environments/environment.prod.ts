export const environment = {
  production: true,
  baseUrlDomain: 'https://asgard.qubedlab.com/customer-interaction-service/LinkClicked/',
  testBaseUrl: 'https://test.qubedlab.com/customer-interaction-service/LinkClicked/',
  dmsBaseUrl: 'https://asgard.qubedlab.com/dealer-management-service-v1.0.2/',
  sessionId: "5648ryuyt",
  diclosures: [
    'Joint Credit Application Disclosure',
    'Website Terms and Conditions Disclosure',
    'California Privacy Act Disclosure',
    'Electronic Record Disclosure',
    'Drivers License Scan Disclosure',
    'Credit Inquiry Disclosure',
    'State Application Disclosure'
  ],



  // I-->initialise (returns customer profile and dealer settings)
  // C-->complete application
  // D-->send disclosure
  // P-->preview application
  // S-->save application
  // R-->retrieve application
  // V-->mobile auth (returns payfone mobile auth response)
  // VF-->mobile auth vfp (returns pii or phone possession verification for mobile auth finish.)
  // PS-->proceed sole applicant
  // VFI-->instant link vfp (returns pii or phone possession verification for instant link finish.)
  // PII-->save pii

  get getInitialiseTag() {
    return "I"
  },
  get getCompleteApplicationTag() {
    return "C"
  },
  get getPreviewAppicationTag() {
    return "P"
  },
  get getSaveApplicationTag() {
    return "S"
  },
  get getRetrieveApplicationTag() {
    return "R"
  },
  get getSendDisclosureTag() {
    return "D"
  },
  get getMobileAuthTag() {
    return "V"
  },
  get getmobileAuthVerificationFinishTag() {
    return "VF"
  },

  get getProceedAsSoleApplicantTag() {
    return "PS";
  },



  get ipAddressLink() {
    return 'https://api.ipify.org/?format=json';
  },

  get ipv6AdrressLink() {
    return 'https://api64.ipify.org?format=json';
  },


  get AppUrl() {
    return "https://digitalapp.qubedlab.com/";
  },

};
