import { signIn, useSession } from 'next-auth/react'
import { api } from '../../services/api';
import { stripe } from '../../services/stripe';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string
}

export function SubscribeButton({priceId} : SubscribeButtonProps) {

  const { data: session } = useSession();

  async function handleSubscribe(){
    if(!session){
      signIn('github')
      return;
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({sessionId});
    }catch(e){
      alert(e.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton }
      onClick={handleSubscribe}
    >
      Subscribe Now
    </button>
  )
}