// src/auth.ts
export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

// IP de tu PC en la red local (Android no puede usar localhost)
const API_URL = 'http://192.168.1.155:4000/login';

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    // Si el servidor responde con error HTTP
    if (!response.ok) {
      throw new Error('Credenciales incorrectas');
    }

    const data: LoginResponse = await response.json();

    // Validación extra por si el servidor devuelve algo inesperado
    if (!data.token || !data.user) {
      throw new Error('Respuesta inválida del servidor');
    }

    return data;
  } catch (error: any) {
    console.error('Error al conectar con API:', error.message || error);
    throw new Error(
      error.message === 'Credenciales incorrectas'
        ? 'Credenciales incorrectas'
        : 'No se pudo conectar con el servidor'
    );
  }
};
