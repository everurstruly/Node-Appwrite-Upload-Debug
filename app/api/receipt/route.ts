import { NextRequest, NextResponse } from 'next/server';
import * as sdk from 'node-appwrite';

const bucketId = '681f777a002716b29bc4';

export async function POST(request: NextRequest) {
  const formdata = await request.formData();
  const transactionId = sdk.ID.unique();

  try {
    const client = new sdk.Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
      .setKey((formdata.get('token') as string) || '');

    const storage = new sdk.Storage(client);
    await storage.createFile(
      bucketId,
      transactionId,
      formdata.get('proof') as File,
      [
        sdk.Permission.read(sdk.Role.user(sdk.ID.unique(), 'verified')),
        sdk.Permission.read(sdk.Role.team('VENDOR')),
      ]
    );
  } catch (error) {
    console.log('error while uploading: ', error);
  }

  return NextResponse.json({ message: "I'm alive" });
}
