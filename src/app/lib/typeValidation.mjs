

const type_validate  = (facets) => {
    if(!facets) false;
    if(typeof facets != 'object' || facets.length != 3) return false;

    return true;


    
}


export default type_validate