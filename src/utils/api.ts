const API_BASE_URL = 'http://localhost:3000/api';

export const submitOrder = async (orderData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/submit-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
};