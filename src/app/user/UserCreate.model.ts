export interface IUserCreate {
  id: string | null
  firstname: string
  lastname: string
  email: string | null
  phone: string | null
  document: string
  address: string | null
  date_of_birth: string | null
  is_active: boolean
  job_title_id: string
  type: string
}
