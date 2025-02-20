type UserPorps = {
  id  :          number,   
  name :         string,
  email :        string,
  phone :        string,   
  password?  :    string,
  profil?  :    string,
  role:          string,
  status:        string,
  createdAt:    string, 
  updatedAt:    string, 
  refreshToken?:  string[],  
  professions? :  string[],
  comments?  : string[],
  access_token?: string,
}

export default UserPorps;