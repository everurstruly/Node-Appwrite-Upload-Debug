'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ReceiptUploadInput from './page-upload-input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import axios from 'axios';
import casual from 'casual-browserify';
import { Toaster, toast } from 'sonner';

export default function Home() {
  const [token, setToken] = useState('');
  const [amount, setAmount] = useState(casual.integer(100, 500));
  const [description, setDescription] = useState(casual.sentence);
  const [files, setFiles] = useState<File[]>([]);

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    const proof = files[0];

    evt.preventDefault();
    const toastId = toast.warning('Submitting');

    try {
      const { data } = await axios.post(
        '/api/receipt',
        {
          token,
          amount,
          description,
          proof,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setAmount(casual.integer(100, 500));
      setDescription(casual.sentence);
      setFiles([]);
      toast.success('Done', { id: toastId });
    } catch (error: any) {
      toast.error(`${error.name}: ${error.message}`, { id: toastId });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 p-8">
      <Toaster position="top-center" richColors />

      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <Card>
          <CardHeader className="pb-4 text-center border-b">
            <CardTitle className="text-lg mb-4">
              Node-Appwrite Upload Debug
            </CardTitle>

            <div className="flex gap-x-2">
              <Input
                id="access"
                type="access"
                placeholder="Access Token"
                className="w-full grow"
                required
                value={token}
                onChange={(evt) => {
                  setToken(evt.target.value);
                }}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Request</Button>
                </PopoverTrigger>

                <PopoverContent className="p-3 w-auto max-w-[38ch]">
                  <p className="text-xs font-light text-muted-foreground leading-[18px]">
                    Contact{' '}
                    <span className="font-light">oghenetefa@gmail.com</span>{' '}
                    <br />
                    <span className="font-light">
                      or Linkedin @everurstruly
                    </span>{' '}
                  </p>
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2"></div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    required
                    onChange={(evt) => {
                      setAmount(parseInt(evt.target.value));
                    }}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Description</Label>
                  <Input
                    id="description"
                    placeholder="Write a short description"
                    required
                    value={description}
                    onChange={(evt) => {
                      setDescription(evt.target.value);
                    }}
                  />
                </div>

                <ReceiptUploadInput
                  required
                  files={files}
                  setFiles={setFiles}
                />

                <Button size="lg" type="submit" className="w-full">
                  Submit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
