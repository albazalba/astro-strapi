import { api } from "../../../lib/api";

export const prerender = false;

export async function POST({ request }) {
    const token = request.headers.get('Authorization');
    const body = await request.text();
    const { userId, productId, quantity } = JSON.parse(body);

    // Fetch the user's current cart from Strapi
    try {
        const userResponse = await api.get(`/users/${userId}?populate=cart`, {
            headers: {
                'Authorization': token
            }
        });
        const userData = userResponse.data;
        console.log("🚀 ~ POST ~ userData:", userData)

        // Check if the product is already in the cart
        const existingCartItem = userData.cart.find(item => item.id === productId);
        console.log("🚀 ~ POST ~ existingCartItem:", existingCartItem)

        let updatedCart;
        if (existingCartItem) {
            // Update quantity if the product is already in the cart
            updatedCart = userData.cart.map(item =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            // Add new item to cart
            updatedCart = [...userData.cart, { product: productId, quantity }];
        }
        console.log("🚀 ~ POST ~ updatedCart:", updatedCart)

        // Update the user's cart in Strapi
        console.log("🚀 ~ POST ~ JSON.stringify({ data: { cart: updatedCart } }):",  { cart: updatedCart } )
        const updateResponse = await api.put(`/users/${userId}?populate=cart`, {
             cart: updatedCart },
             {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            // body: JSON.stringify()
        });
        console.log("🚀 ~ POST ~ updateResponse:", updateResponse)

        if (updateResponse.status === 200) {
            return new Response(JSON.stringify({ message: 'Cart updated successfully' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            return new Response(JSON.stringify({ message: 'Failed to update cart' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

    } catch (error) {
        console.error("Error processing cart update:", error.message);
        return new Response(JSON.stringify({ message: 'Failed to update cart', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function GET({ request }) {
    const token = request.headers.get('Authorization');
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
        return new Response(JSON.stringify({ message: 'User ID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const userResponse = await api.get(`/users/${userId}?populate=cart.product.image`, {
            headers: {
                'Authorization': token
            }
        });

        if (!userResponse.status === 200) {
            throw new Error(`Failed to fetch user data: ${userResponse.statusText}`);
        }

        const userData = await userResponse;
        const cart = userData.data.cart || [];

        // Transform the cart data to include only necessary information
        const cartItems = cart.map(item => {

            return {id: item.product[0].id,
            	productId: item.product[0]?.id,
            	title: item.product[0]?.title,
            	price: item.product[0]?.price,
            	quantity: item.quantity,
            	image: item?.product[0]?.image[0]?.url}
        	});


        return new Response(JSON.stringify({ cartItems }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("Error fetching cart items:", error.message);
        return new Response(JSON.stringify({ message: 'Failed to fetch cart items', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
