export async function logout(req,res) {
    res.clearCookie('Authorization', {path: '/',})
    res.send({ status:"success", message: 'Logged out successfully' });
}