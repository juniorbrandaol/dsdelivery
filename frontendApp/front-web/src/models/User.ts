export type User={
  id : number;
  name : string;
}

export type newUser={
  
  firstName?:string;
  lastName?:string;
  cpf?:string;
  email?:string;
  phone?:string;
  password?:string
  rolles?:[
      {
       id?:number
      },
     {
      id?:number
     }
  ]
}
