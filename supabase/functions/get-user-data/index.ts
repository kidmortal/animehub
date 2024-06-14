// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
console.log(`Function "select-from-table-with-auth-rls" up and running!`)

Deno.serve(async (req: Request) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )
    const { data, error } = await supabaseClient.from('users').select()
    if (error) throw error

    return new Response(JSON.stringify({ data }), {
      headers: {  'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {  'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

