import apiLogin from './apiLogin';

async function submitLogin(email: string, senha: string, papel: string): Promise<void> {
    try {
        const response = await apiLogin.post<{ usuario: any }>('/auth/login', { email, senha, papel });

        const { usuario } = response.data;

        if (usuario) {
            localStorage.setItem('usuario', JSON.stringify(usuario));

            window.location.href = '/dashboard';
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
}

export default submitLogin;
