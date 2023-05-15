
const formatPrice=(price:number,currency:string,digits:number)=>{
  const formater = new Intl.NumberFormat('pt-BR',{
     style:'currency',
     currency:currency,
     minimumFractionDigits:digits
  });
  return formater.format(price)
}

function cpfMask(value:any) {
  if(value==null) return
  return value
  .replace(/\D/g, '')
  .replace(/(\d{3})(\d)/, '$1.$2')
  .replace(/(\d{3})(\d)/, '$1.$2')
  .replace(/(\d{3})(\d{1,2})/, '$1-$2')
  .replace(/(-\d{2})\d+?$/, '$1');
   
};

function onlyNumber (value:any) {
  return value 
    .replace(/[^0-9]/g, '')
};

function phoneMask (value:any) {
  if(value==null) return
  return value
    .replace(/\D/g, '')
    .replace(/(\d{0})(\d)/, '$1+$2')
    .replace(/(\d{2})(\d)/, '($1)$2')
    .replace(/(\d{2})(\d)/, '$1-$2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1')
};

export  {formatPrice,cpfMask,onlyNumber,phoneMask}