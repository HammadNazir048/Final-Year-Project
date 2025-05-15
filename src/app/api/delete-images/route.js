import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function DELETE() {
    const directoryPath = path.join(process.cwd(), 'backend', 'downloaded_images');

    try {
        if (fs.existsSync(directoryPath)) {
            const folders = fs.readdirSync(directoryPath);
            for (const folder of folders) {
                const folderPath = path.join(directoryPath, folder);
                fs.rmSync(folderPath, { recursive: true, force: true });
            }
        }

        return NextResponse.json({ message: 'All images deleted successfully' });
    } catch (error) {
        console.error('Error deleting images:', error);
        return new NextResponse('Failed to delete images', { status: 500 });
    }
}
