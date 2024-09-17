import { login } from '../../../lib/api';

export async function post({ request }) {
  const body = await request.json();
  const { identifier, password } = body;

  try {
    const data = await login(identifier, password);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
