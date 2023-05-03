import { Product } from "../../models/Product";

export function checkIsSelected(selectedProducts:Product[],product:Product){
    /* SOME() VERIFICA SE O ITEM JÁ FOI SELECIONADO RETORNANDO UM BOOLEAN */
    return selectedProducts.some(item => item.id === product.id);
}

