export type User={
  id : number;
  name : string;
}

export type newUser={
  
  firstName:string;
  lastName:string;
  cpf:string;
  email:string;
  password:number;
  rolles:[
      {
        id?: number
      },
     {
      id?:number
     }
  ]
}
