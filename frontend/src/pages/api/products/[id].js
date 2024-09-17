import { api } from '../../../lib/api';

export async function GET({ params, request }) {
  const { id } = params;
  const token = request.headers.get('Authorization');

  try {
    const response = await api.get(`/products/${id}?populate=*`, {
      headers: {
        Authorization: token
      }
    });
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
