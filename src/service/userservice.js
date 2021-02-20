export const isloggedin=()=>{
    try{
        const token=localStorage.getItem('token');
        if(token){
            return true
        }else{
            return false
        }
    }catch(e){
        return false
    }
}

export const getuser=()=>{
    try {
        return {name:localStorage.getItem('name')};        
    } catch (e) {
        return false    
    }
}
