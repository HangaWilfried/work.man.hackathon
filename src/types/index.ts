import { Job } from './../utils/index'
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
    experience: string
    skills: string[]
  }
  certifications: string[]
}

export interface Option<T> {
  get text(): string
  get data(): T
}

export class Workman implements Option<keyof typeof Job> {
  constructor(private key: keyof typeof Job) {}

  get text(): string {
    return Job[this.key]
  }

  get data(): keyof typeof Job {
    return this.key
  }
}
