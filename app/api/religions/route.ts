import { NextResponse } from 'next/server'
import { mockData } from './mockData'
import type { Religions } from './types'

const responseDTO = (data: string[]): Religions[] => {
  return data.map((item) => {
    return {
      key: item,
      label: item
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
