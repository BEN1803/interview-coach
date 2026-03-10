import { NextResponse } from "next/server"

export async function GET() {
  const apiKey = process.env.ELEVENLABS_API_KEY
  const agentId = process.env.ELEVENLABS_AGENT_ID

  if (!apiKey || !agentId) {
    return NextResponse.json(
      {
        error: "Missing ElevenLabs configuration.",
        details: {
          hasApiKey: Boolean(apiKey),
          hasAgentId: Boolean(agentId),
        },
      },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`,
      {
        headers: {
          "xi-api-key": apiKey,
        },
        cache: "no-store",
      }
    )

    if (!response.ok) {
      const text = await response.text()
      return NextResponse.json(
        {
          error: "Failed to fetch signed URL.",
          status: response.status,
          statusText: response.statusText,
          body: text,
        },
        { status: 500 }
      )
    }

    const data = (await response.json()) as { signed_url?: string }

    if (!data.signed_url) {
      return NextResponse.json(
        { error: "Signed URL missing from ElevenLabs response." },
        { status: 500 }
      )
    }

    return NextResponse.json({ signedUrl: data.signed_url })
  } catch (err) {
    return NextResponse.json(
      {
        error: "Signed URL request failed.",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
