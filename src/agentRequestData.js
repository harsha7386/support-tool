const agentRequestData = (input) => {
  const msg = input.toLowerCase();

  if (msg.includes("return")) {
    return "To return a product, go to 'My Orders' and click on 'Request Return'. If you need help, share your Order ID.";
  } else if (msg.includes("refund")) {
    return "Refunds are initiated once we receive the returned product. It usually takes 5–7 business days.";
  } else if (msg.includes("status") || msg.includes("order")) {
    return "You can track your order under the 'Orders' tab. If you'd like me to check, please share your Order ID.";
  } else if (msg.includes("cancel")) {
    return "To cancel your order, go to 'My Orders' and click on 'Cancel Order'. If it's already shipped, cancellation may not be possible.";
  } else if (msg.includes("payment")) {
    return "If your payment failed or was deducted but the order wasn’t placed, it will be refunded within 5–7 working days.";
  } else if (msg.includes("login") || msg.includes("account")) {
    return "If you're having trouble logging in, try resetting your password. If the issue continues, let us know.";
  } else if (msg.includes("technical") || msg.includes("issue") || msg.includes("problem")) {
    return "We're sorry you're facing a technical issue. Could you describe the problem in more detail?";
  } else if (msg.includes("warranty") || msg.includes("guarantee")) {
    return "Most products come with a warranty. Please provide the product name or Order ID for warranty details.";
  } else if (msg.includes("delivery") || msg.includes("late") || msg.includes("delay")) {
    return "We apologize for the delay. Please share your Order ID so we can check the delivery status.";
  } else if (msg.includes("contact") || msg.includes("call") || msg.includes("email")) {
    return "You can reach our support team at support@example.com or call us at 1800-123-456.";
  } else {
    return "Let me help you with that. Could you please provide more details?";
  }
};

export default agentRequestData;
