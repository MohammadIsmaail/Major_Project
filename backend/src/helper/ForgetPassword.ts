export const generatePassword = ()=>{
    const length = 8;
    let password = "";
    const chars = "poiuytrewqlkjhgfdsaamnbvcxz0987654321@#&*POIUYTREWQLKJHGFDSAMNBVCXZ";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}