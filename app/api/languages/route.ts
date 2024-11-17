import { NextResponse } from 'next/server'
import { mockData } from './mockData'
import type { Language, LanguageRaw } from './types'

const responseDTO = (data: LanguageRaw[]): Language[] => {
  return data.map((item) => {
    return {
      key: item.name,
      label: item.name
    }
  })
}

export async function GET() {
  try {
    const rawData = mockData
    return NextResponse.json(responseDTO(rawData))
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
