type UserPorps = {
  id  :          number,   
  name :         string,
  email :        string,
  phone :        string,   
  password?  :    string,
  role:          string,
  status:        string,
  createdAt:    string, 
  updatedAt:    string, 
  refreshToken?:  string[],  
  professions? :  string[],
  comments?  : string[],

}

export default UserPorps;