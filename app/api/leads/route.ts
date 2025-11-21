import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'
import type { Lead, APIResponse } from '@/types'

// Validation schema for lead data
const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  businessInterest: z.string().optional(),
})

const LEADS_FILE = join(process.cwd(), 'data', 'leads.json')

// Helper function to read leads from file
function readLeads(): Lead[] {
  try {
    if (!existsSync(LEADS_FILE)) {
      return []
    }
    const data = readFileSync(LEADS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading leads:', error)
    return []
  }
}

// Helper function to write leads to file
function writeLeads(leads: Lead[]): void {
  try {
    writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2))
  } catch (error) {
    console.error('Error writing leads:', error)
    throw new Error('Failed to save lead')
  }
}

// Email transporter (configure with your email service)
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: NextRequest): Promise<NextResponse<APIResponse<Lead>>> {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = leadSchema.parse(body)

    // Create new lead
    const newLead: Lead = {
      id: Date.now().toString(),
      ...validatedData,
      createdAt: new Date().toISOString(),
      status: 'new',
    }

    // Read existing leads
    const leads = readLeads()

    // Add new lead
    leads.push(newLead)

    // Save to file
    writeLeads(leads)

    // Send notification email (optional)
    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.ADMIN_EMAIL || 'admin@pittsburgheverything.com',
          subject: `New Lead: ${validatedData.category} - ${validatedData.name}`,
          html: `
            <h2>New Lead Received</h2>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Phone:</strong> ${validatedData.phone || 'Not provided'}</p>
            <p><strong>Category:</strong> ${validatedData.category}</p>
            <p><strong>Business Interest:</strong> ${validatedData.businessInterest || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p>${validatedData.message}</p>
            <hr>
            <p><small>Received at: ${new Date().toLocaleString()}</small></p>
          `,
        })
      }
    } catch (emailError) {
      console.error('Email notification failed:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      data: newLead,
      message: 'Lead submitted successfully',
    })

  } catch (error) {
    console.error('Lead submission error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        message: error.errors[0].message,
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to submit lead',
    }, { status: 500 })
  }
}

export async function GET(): Promise<NextResponse<APIResponse<Lead[]>>> {
  try {
    const leads = readLeads()

    return NextResponse.json({
      success: true,
      data: leads,
      message: `${leads.length} leads found`,
    })

  } catch (error) {
    console.error('Error fetching leads:', error)

    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch leads',
    }, { status: 500 })
  }
}
