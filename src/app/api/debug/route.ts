// Debug endpoint to verify environment variables are available
import { NextResponse } from 'next/server';

export async function GET() {
    const envVars = {
        NEWSDATA_API_KEY: process.env.NEWSDATA_API_KEY ? 'SET (length: ' + process.env.NEWSDATA_API_KEY.length + ')' : 'NOT SET',
        POLYGON_API_KEY: process.env.POLYGON_API_KEY ? 'SET' : 'NOT SET',
        NODE_ENV: process.env.NODE_ENV,
    };

    return NextResponse.json({
        success: true,
        environment: envVars,
        timestamp: new Date().toISOString(),
    });
}
