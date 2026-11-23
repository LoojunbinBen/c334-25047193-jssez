import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat@1.46.5/dist/chat.bundle.es.js';

createChat({
  webhookUrl: 'https://agenticflows.tokencraze.org/webhook/ba5141e4-e385-4c62-8412-537bfc3abf79/chat',
  mode: 'window',
  loadPreviousSession: false,
  initialMessages: [
    'Hello, I’m your JS-SEZ advisor.',
    'Ask about zones, setup, incentives or staff passes. I’ll name the playbook page I use.'
  ],
  i18n: {
    en: {
      title: 'JS-SEZ advisor',
      subtitle: 'Answers based on the SMF JS-SEZ Playbook.',
      footer: '',
      getStarted: 'Start a conversation',
      inputPlaceholder: 'Ask a JS-SEZ question…'
    }
  }
});

const makeToggleAccessible = () => {
  const toggle = document.querySelector('#n8n-chat .chat-window-toggle');
  const chatWindow = document.querySelector('#n8n-chat .chat-window');

  if (!toggle || !chatWindow || toggle.dataset.accessible === 'true') {
    return Boolean(toggle && chatWindow);
  }

  toggle.dataset.accessible = 'true';
  toggle.setAttribute('role', 'button');
  toggle.setAttribute('tabindex', '0');

  const updateToggleState = () => {
    const isOpen = window.getComputedStyle(chatWindow).display !== 'none';
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', `${isOpen ? 'Close' : 'Open'} JS-SEZ advisor chat`);
  };

  toggle.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle.click();
    }
  });

  new MutationObserver(updateToggleState).observe(chatWindow, {
    attributes: true,
    attributeFilter: ['style']
  });
  updateToggleState();

  return true;
};

if (!makeToggleAccessible()) {
  const chatObserver = new MutationObserver(() => {
    if (makeToggleAccessible()) {
      chatObserver.disconnect();
    }
  });
  chatObserver.observe(document.body, { childList: true, subtree: true });
}
