export type FaqItem = {
  q: string;
  a: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is Prometey VPN and how does it work?",
    a: "Prometey VPN is a service designed to ensure security and freedom on the internet. We use modern protocols (VLESS and OpenVPN) to encrypt your traffic and hide your real IP address from ISPs and websites.",
  },
  {
    q: "Why are your protocols better than regular ones?",
    a: 'We use VLESS—one of the fastest and most "invisible" protocols available today. It excels at bypassing blocks where conventional VPNs are powerless, while maintaining high connection speeds.',
  },
  {
    q: "On which devices can I use the VPN?",
    a: "iOS, Android, Windows, macOS, Linux, routers, and Smart TV.",
  },
  {
    q: "How many devices can I connect simultaneously?",
    a: "Up to 10 devices on one subscription.",
  },
  {
    q: "Do you have a free trial period?",
    a: "Yes. No card required — try the service and decide for yourself.",
  },
  {
    q: "What should I do if the key stops working?",
    a: "Write to us in Telegram — we will update the key in a minute.",
  },
];
