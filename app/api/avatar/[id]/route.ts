import {NextRequest, NextResponse} from 'next/server';
import multiavatar from '@multiavatar/multiavatar/esm';

export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const {id} = await params; // Extract the identifier from the route parameters

    if (!id) {
        return NextResponse.json({error: 'Missing ID parameter'}, {status: 400});
    }

    const svgCode = multiavatar(id); // Generate the SVG code using the ID

    // Return the SVG as a response with the correct content type
    return new NextResponse(svgCode, {
        headers: {
            'Content-Type': 'image/svg+xml',
        },
    });
}