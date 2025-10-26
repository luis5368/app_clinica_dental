export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

// Para emulador Android se usa 10.0.2.2
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch('http://10.0.2.2:4000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Credenciales incorrectas');
  }

  const data: LoginResponse = await response.json();
  return data;
};
