import axios from 'axios';

export async function getPayProToken() {
  try {
    const res = await axios.post('https://api.paypro.com.pk/v2/ppro/auth', {
      clientid: process.env.PAYPRO_CLIENT_ID,
      clientsecret: process.env.PAYPRO_CLIENT_SECRET,
    });
    return res.data.token;
  } catch (error) {
    console.error('PayPro Auth Error:', error.message);
    return null;
  }
}

export async function createPayProOrder(orderData, token) {
  try {
    const response = await axios.post(
      'https://api.paypro.com.pk/v2/ppro/co',
      orderData,
      {
        headers: {
          token,
        },
      }
    );
    return response.data?.[0];
  } catch (error) {
    console.error('Order Creation Error:', error);
    return null;
  }
}