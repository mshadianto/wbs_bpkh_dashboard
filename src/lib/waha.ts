// WAHA WhatsApp API Integration
const WAHA_BASE_URL = 'https://waha-gslmmrl9rpjp.sawi.sumopod.my.id';
const WAHA_SESSION = 'terong_n8n';

export interface WAHAMessage {
  id: string;
  from: string;
  to: string;
  body: string;
  timestamp: number;
  type: 'text' | 'image' | 'document' | 'audio' | 'video';
}

export interface WAHAContact {
  id: string;
  name: string;
  number: string;
}

export class WAHAClient {
  private baseUrl: string;
  private session: string;

  constructor() {
    this.baseUrl = WAHA_BASE_URL;
    this.session = WAHA_SESSION;
  }

  // Send text message
  async sendMessage(to: string, text: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/sendText`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session: this.session,
          chatId: to,
          text: text
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      return false;
    }
  }

  // Send message with buttons
  async sendButtonMessage(to: string, text: string, buttons: Array<{id: string, text: string}>): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/sendButtons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session: this.session,
          chatId: to,
          text: text,
          buttons: buttons.map(btn => ({
            id: btn.id,
            text: btn.text
          }))
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Error sending WhatsApp button message:', error);
      return false;
    }
  }

  // Get session status
  async getSessionStatus(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/sessions/${this.session}`);
      return await response.json();
    } catch (error) {
      console.error('Error getting session status:', error);
      return null;
    }
  }

  // Get messages
  async getMessages(limit: number = 100): Promise<WAHAMessage[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/messages?session=${this.session}&limit=${limit}`);
      const data = await response.json();
      return data.messages || [];
    } catch (error) {
      console.error('Error getting messages:', error);
      return [];
    }
  }

  // Start session
  async startSession(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/sessions/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.session,
          config: {
            webhooks: [
              {
                url: `${window.location.origin}/api/webhook/whatsapp`,
                events: ['message']
              }
            ]
          }
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Error starting session:', error);
      return false;
    }
  }

  // Stop session
  async stopSession(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/sessions/stop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.session
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Error stopping session:', error);
      return false;
    }
  }
}

export const wahaClient = new WAHAClient();