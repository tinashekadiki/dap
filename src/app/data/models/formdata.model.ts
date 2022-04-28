//Customer interaction model

export interface CustomerInteractionInitialData {
  application: application;
  link: Link;
}

export interface application {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: Date;
  ssn: string;
  email: string;
  confirmedEmailAddress: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  employmentStatus: string;
  employerName: string;
  jobTitle: string;
  workPhoneNumber: string;
  additionalIncomeSource: string;
  previousCity: string;
  apartmentUnit: string;
  previousApartmentUnit: string,
  annualIncome: number;
  startDate: Date;
  additionalIncome: number;
  bankruptcy: string;
  reposession: string;
  lease: string;
  relation: string;
  relatedTo: string;
  equifax: string;
  transunion: string;
  experian: string;
  globalCustomerId: string;
  requestType: string;
  transactionId: string;
  branchId: string;
  parentId: string;
  driversLicenseNumber: string;
  ownership: string;
  monthlyRent: number;
  monthlyMortgage: number;
  maritalStatus: string;
  numberOfDependents: number;
  educationLevel: string;
  previousZip: string;
  previousAddress: string;
  previousState: string;
  timeAtAddressYears: number;
  timeAtAddressMonths: number;
  previousEmployerName: string;
  previousJobTitle: string;
  previousPhoneNumber: string;
  previousAnnualIncome: number;
  previousEmploymentStartDate: string;
  previousEmploymentEndDate: string;
  blcTransactionId: string;
  eventId: string;
  completed: boolean;
  relatedToCompleted: boolean;
  title: string;
  relationship: string;
  suffix: string;
  prefix: string;
  driversLicenceState: string;
  housingStatus: string;
  preferredContactMethod: string;
  preferredLanguage: string;
  otherPhoneNumber: string;
  createdAt: Date;
  canPreview: boolean;
  relatedToCanPreview: boolean;
}

export interface Link {
  uniqueId: string;
  globalCustomerId: string;
  link: string;
  createdAt: string;
  selected: boolean;
  validUntil: string;
  phoneNumber: string;
  branchId: string;
  parentId: string;
  transactionId: string;
  token: string;
  linkType: string;
  maxCount: number;
}


export interface Disclourses {
  electronic: boolean;
  credit: boolean;
  application: boolean;
  privacy: boolean;
}


//customer models


export interface CustomerData {
  relationType: any;
  processes: Process[];
  CoBorrower: any;
  CustomerPreviousContactDetails: any[];
  CustomerContactDetails: CustomerContactData;
  CustomerBiometricDetail: CustomerBiometricData;
  ComplianceFlag: string;
  CustomerPersonalDetails: CustomerPersonalData;
  EventCode: string;
}

export interface CustomerBiometricData {
  customerGlobalId: string;
  correctDateOfBirth:string;
  sex: string;
  eyeColor: string;
  hairColor: string;
  heightInCM: number;
  height_in_FT_IN: number;
  weight_in_KG: number;
  weight_in_LBS: number;
}

export interface CustomerContactData {
  id: number;
  emailSecondary: string;
  cellPhone: string;
  city: string;
  country: string;
  emailPreffered: string;
  emailPrimary: string;
  emailWork: string;
  homePhone: string;
  mailingCity: string;
  mailingJurisdictionCode: string;
  mailingMsa: string;
  mailingMsaCode: string;
  mailingPostalCode: string;
  mailingState: string;
  mailingStreetAddress1: string;
  mailingStreetAddress2: string;
  msa: string;
  msaCode: string;
  postalCode: string;
  rentOwn: string;
  resType: string;
  state: string;
  streetName: string;
  streetNumber: string;
  timeAtPresentAddressMnths: string;
  timeAtPresentAddressYrs: string;
  unitOrAppt: string;
}

export interface CustomerPersonalData {
  id: number;
  customerGlobalId: string;
  createdAt: Date;
  dateOfBirth: string;
  educLevel: string;
  familyName: string;
  firstName: string;
  givenName: string;
  lastName: string;
  licenseExpirationDate: Date;
  licenseIdNumber: string;
  licenseState: string;
  middleInitial: string;
  middleName: string;
  namePrefix: string;
  nameSuffix: string;
  nonResidentIndicator: string;
  privacyIndicator: string;
  privacyType: string;
  socialSecurityNumber: string;
  socialSecurityNumberFraud1: string;
  socialSecurityNumberFraud2: string;
  socialSecurityNumberFraud3: string;
  status: string;
  statusDescription: string;
  eyeColor: string;
  hairColor: string;
  heightInCm: string;
  heightInFtIn: string;
  sex: string;
  weightInKg: string;
  weightInLbs: string;
}

export interface Process {
  processId: number;
}


//payphone initial data
export interface PayPhoneInitialData {
  RequestId: string;
  Status: number;
  Description: string;
  Response: Response;
}

export interface Response {
  AuthenticationUrl: string;
  RedirectTargetUrl: string;
  MobileOperatorName: string;
}


//payphone customer information
export interface PayPhoneCustomerInformation {
  requestId: string;
  description: string;
  status: number;
  response: Response;
}

export interface Response {
  transactionId: string;
  phoneNumber: string;
  lineType: string;
  carrier: string;
  countryCode: string;
  individual: Individual;
}

export interface Individual {
  firstName: string;
  lastName: string;
  middleName:string;
  addresses: Address[];
  emailAddresses: string;
  dob: string;
  ssn: string;
}

export interface Address {
  address: string;
  extendedAddress: string;
  city: string;
  region: string;
  postalCode: string;
}


export interface ApplicationData {
  applicationId: string
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: string;
  ssn: string;
  email: string;
  confirmedEmailAddress: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  employmentStatus: string;
  employerName: string;
  jobTitle: string;
  workPhoneNumber: string;
  additionalIncomeSource: string;
  annualIncome: number;
  startDate: string;
  additionalIncome: number;
  bankruptcy: string;
  reposession: string;
  lease: string;
  relation: string;
  relatedTo: string;
  equifax: string;
  transunion: string;
  experian: string;
  globalCustomerId: string;
  requestType: string;
  transactionId: null;
  branchId: string;
  parentId: string;
  driversLicenseNumber: string;
  ownership: string;
  monthlyRent: number;
  monthlyMortgage: number;
  maritalStatus: string;
  numberOfDependents: number;
  educationLevel: string;
  previousZip: string;
  previousAddress: string;
  previousState: string;
  previousCity: string;
  previousApartmentUnit: string;
  apartmentUnit: string;
  timeAtAddressYears: number;
  timeAtAddressMonths: number;
  previousEmployerName: string;
  previousJobTitle: string;
  previousPhoneNumber: string;
  previousAnnualIncome: number;
  previousEmploymentStartDate: string;
  previousEmploymentEndDate: string;
  blcTransactionId: string;
  eventId: string;
  completed: boolean;
  relatedToCompleted: boolean;
  title: string;
  relationship: string;
  suffix: string;
  prefix: string;
  driversLicenceState: string;
  housingStatus: string;
  preferredContactMethod: string;
  preferredLanguage: string;
  otherPhoneNumber: string;
  canPreview: boolean;
  relatedToCanPreview: boolean;
  timeAtPreviousAddressYears: number;
  timeAtPreviousAddressMonths: number;
  reposessionDate: string,
  bankruptcyDate: string
}

export interface Dealership {
  branchId: string;
  dealership: DealershipClass;
  name: string;
  emailAddress: string;
  primaryAddress: string;
  secondaryAddress: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  phone: string;
}

export interface DealershipClass {
  organisationalId: number;
  name: string;
}


export interface GeneralSetting {
  branch: Branch;
  branchId?: string;
  organisationalId: number;
  settingsToken: string;
}

export interface Branch {
  branchId: string;
  dealership: Dealership;
  name: string;
  emailAddress: string;
  primaryAddress: string;
  secondaryAddress: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  phone: string;
}
