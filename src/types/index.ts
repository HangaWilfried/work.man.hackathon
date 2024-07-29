import { isString } from './../services/pawapay/core/request';
export type BreadCrumb = {
  path: string
  home: string
  isIcon?: boolean
  items: Crumb[]
}

export type Crumb = {
  name: string
  path: string
}

export type Review = {
  created_at: string
  customerId: string
  id: string
  message: string
  rate: number
  workerId: string
}

export type Profile = {
  id: string
  avatar: string
  created_at: string
  contact: {
    mobile: {
      number: string
      countryCode: string
    }
    location: string
    whatsapp: string
    idCardNumber: string
  }
  qualifications: {
    job: string,
    experience: string,
    skills: string[]
  }
  certifications: string[]
}
