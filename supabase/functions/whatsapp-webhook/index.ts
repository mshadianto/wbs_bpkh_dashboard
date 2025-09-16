import { corsHeaders } from '../_shared/cors.ts'

interface WhatsAppMessage {
  id: string;
  from: string;
  to: string;
  body: string;
  timestamp: number;
  type: string;
}

interface WhatsAppWebhook {
  event: string;
  session: string;
  payload: WhatsAppMessage;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const webhook: WhatsAppWebhook = await req.json()
    
    if (webhook.event === 'message' && webhook.payload.body) {
      const message = webhook.payload
      
      // Process WhatsApp message for WBS
      await processWhatsAppMessage(message)
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      },
    )
  }
})

async function processWhatsAppMessage(message: WhatsAppMessage) {
  const text = message.body.toLowerCase()
  
  // Check if this is a report submission
  if (text.includes('lapor') || text.includes('report') || text.includes('whistleblow')) {
    // Create a new report entry using direct API call
    const reportData = {
      title: `WhatsApp Report - ${new Date().toLocaleDateString()}`,
      category: 'other',
      description: message.body,
      location: 'WhatsApp',
      witnesses: '',
      evidence: '',
      contact_preference: 'WhatsApp',
      status: 'new',
      priority: 'medium',
      is_anonymous: true,
      risk_level: 5.0
    }

    try {
      // Use direct API call instead of Supabase client to avoid JWT issues
      const response = await fetch(`${Deno.env.get('SUPABASE_URL')}/rest/v1/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': Deno.env.get('SUPABASE_ANON_KEY') || '',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY') || ''}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(reportData)
      })

      if (response.ok) {
        const data = await response.json()
        const reportId = data[0]?.id || 'unknown'
        
        // Send confirmation message back
        await sendWhatsAppReply(message.from, 
          `✅ Laporan Anda telah diterima dengan ID: WB-${reportId.slice(-6)}. 
          Tim kami akan menindaklanjuti dalam 3-5 hari kerja. 
          Terima kasih telah berani berbicara.`
        )
      }
    } catch (error) {
      console.error('Error creating report:', error)
      await sendWhatsAppReply(message.from, 
        `❌ Maaf, terjadi kesalahan saat memproses laporan Anda. Silakan coba lagi nanti.`
      )
    }
  } else if (text.includes('help') || text.includes('bantuan')) {
    // Send help message
    await sendWhatsAppReply(message.from, 
      `🛡️ *LaporAman BPKH - WhatsApp Bot*
      
Cara melaporkan:
1. Ketik "LAPOR" untuk memulai
2. Jelaskan kejadian yang ingin dilaporkan
3. Sertakan lokasi dan waktu kejadian
4. Kami akan merespons dalam 3-5 hari kerja

*100% Anonim & Rahasia* 🔒

Ketik "LAPOR" untuk memulai pelaporan.`)
  } else {
    // Default welcome message
    await sendWhatsAppReply(message.from,
      `🛡️ Selamat datang di *LaporAman BPKH*
      
Platform pelaporan anonim untuk melaporkan pelanggaran di lingkungan BPKH.

Ketik:
• "LAPOR" - Untuk membuat laporan
• "BANTUAN" - Untuk panduan lengkap

*Identitas Anda 100% terlindungi* 🔒`)
  }
}

async function sendWhatsAppReply(to: string, text: string) {
  try {
    const response = await fetch('https://waha-gslmmrl9rpjp.sawi.sumopod.my.id/api/sendText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session: 'terong_n8n',
        chatId: to,
        text: text
      })
    })
    
    return response.ok
  } catch (error) {
    console.error('Error sending WhatsApp reply:', error)
    return false
  }
}