import { api } from '../../../lib/api';

export const prerender = false;

export async function GET({ request }) {
  try {
    const token = request.headers.get('Authorization');

    if (!token) {
      return new Response(JSON.stringify({ error: 'No token provided' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await api.get('/products?populate=*', {
      headers: {
        Authorization: token
      }
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
