const user = {
    getId() {
        let user = sessionStorage.getItem('user')
        user = user == null ? [] : JSON.parse(user) // user là mảng 
        let acc;
        if (user) {
            user.forEach((item) => {
                acc = item 
            })
            return acc
        }
    }
}
export default user
