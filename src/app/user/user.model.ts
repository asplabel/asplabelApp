export interface IUser {
  id: string | null
  firstname: string
  lastname: string
  email: string | null
  phone: string | null
  document: string
  address: string | null
  date_of_birth: string | null
  is_active: boolean
  job_title_id: string | null
  type: string | null
  job_title_name: string | null
  department_name: string | null
  card_id: string | null
  card_UID: string | null
}
