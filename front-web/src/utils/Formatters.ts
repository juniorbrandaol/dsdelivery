
const formatPrice=(price:number,currency:string,digits:number)=>{
  const formater = new Intl.NumberFormat('pt-BR',{
     style:'currency',
     currency:currency,
     minimumFractionDigits:digits
  });
  return formater.format(price)
}

export  {formatPrice}