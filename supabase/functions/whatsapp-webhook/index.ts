import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const webhook: WhatsAppWebhook = await req.json()
    
    if (webhook.event === 'message' && webhook.payload.body) {
      const message = webhook.payload
      
      // Process WhatsApp message for WBS
      await processWhatsAppMessage(supabaseClient, message)
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

async function processWhatsAppMessage(supabase: any, message: WhatsAppMessage) {
  const text = message.body.toLowerCase()
  
  // Check if this is a report submission
  if (text.includes('lapor') || text.includes('report') || text.includes('whistleblow')) {
    // Create a new report entry
    const { data, error } = await supabase
      .from('reports')
      .insert([
        {
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
      ])

    if (!error) {
      // Send confirmation message back
      await sendWhatsAppReply(message.from, 
        `✅ Laporan Anda telah diterima dengan ID: WB-${data[0].id.slice(-6)}. 
        Tim kami akan menindaklanjuti dalam 3-5 hari kerja. 
        Terima kasih telah berani berbicara.`
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